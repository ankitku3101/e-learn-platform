import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Quiz from "@/models/quiz";
import Question from "@/models/question";
import QuestionAnswered from "@/models/question_answered";
import QuizSubmission from "@/models/quiz_submission";

// Define interface for the request body
interface SubmissionBody {
    studentId: string;
    answers: {
      mainQuestion: string; // Question ID
      choosenAnswer: string;
    }[];
  }
  
  // Define interface for the URL parameters
  interface Params {
    params: Promise<{ id: string }>;
  }
  
  // Database connection function
  const connectDB = async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("MongoDB connected successfully");
      }
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to database");
    }
  };
  
  export async function POST(req: NextRequest, { params }: Params) {
    try {
      // Ensure database connection is established
      await connectDB();
      
      // Check database connection status
      if (mongoose.connection.readyState !== 1) {
        return NextResponse.json(
          { success: false, message: "Database connection not established" },
          { status: 500 }
        );
      }
  
      // Check if the request body and required fields are present
      const body = await req.json() as SubmissionBody;
      
      if (!body.studentId || !body.answers || !Array.isArray(body.answers)) {
        return NextResponse.json(
          { success: false, message: "Invalid request body" },
          { status: 400 }
        );
      }
      const {id} = await params;
  
      // Validate if studentId and quizId are valid ObjectIds
      if (!mongoose.isValidObjectId(body.studentId) || !mongoose.isValidObjectId(id)) {
        return NextResponse.json(
          { success: false, message: "Invalid student ID or quiz ID" },
          { status: 400 }
        );
      }

  
      // Check if quiz exists and is active
      const quiz = await Quiz.findById(id);
      if (!quiz) {
        return NextResponse.json(
          { success: false, message: "Quiz not found" },
          { status: 404 }
        );
      }
  
      // Check if quiz is still active
      if (!quiz.isactive) {
        return NextResponse.json(
          { success: false, message: "Quiz is not active" },
          { status: 400 }
        );
      }
  
      // Check if quiz submission deadline has passed
      if (new Date(quiz.lastdate) < new Date()) {
        return NextResponse.json(
          { success: false, message: "Quiz submission deadline has passed" },
          { status: 400 }
        );
      }
  
      // Check if student has already submitted this quiz
      const existingSubmission = await QuizSubmission.findOne({
        belongsto: id,
        submittedby: body.studentId
      });
  
      if (existingSubmission) {
        return NextResponse.json(
          { success: false, message: "You have already submitted this quiz" },
          { status: 400 }
        );
      }
  
      // Get all question IDs from the answers
      const questionIds = body.answers.map(answer => answer.mainQuestion);
      
      // Validate if all question IDs are valid ObjectIds
      const invalidQuestionIds = questionIds.filter(id => !mongoose.isValidObjectId(id));
      if (invalidQuestionIds.length > 0) {
        return NextResponse.json(
          { success: false, message: "Invalid question IDs found in the answers" },
          { status: 400 }
        );
      }
  
      // Fetch all questions for this quiz to check answers
      const questions = await Question.find({
        _id: { $in: questionIds },
        belongsto: id
      });
  
      // Create a map for quick lookup of correct answers
      const questionMap = new Map();
      questions.forEach(question => {
        questionMap.set(question._id.toString(), question.correctOption);
      });
  
      // Process each answer
      let correctAnswers = 0;
      const questionAnsweredDocs: mongoose.Types.ObjectId[] = [];
  
      for (const answer of body.answers) {
        // Create questionAnswered document
        const questionAnswered = new QuestionAnswered({
          belongsto: id,
          mainQuestion: answer.mainQuestion,
          choosenOption: answer.choosenAnswer.toLowerCase().trim()
        });
  
        // Save the questionAnswered document
        await questionAnswered.save();
        questionAnsweredDocs.push(questionAnswered._id);
  
        // Check if the answer is correct
        const correctOption = questionMap.get(answer.mainQuestion);
        if (correctOption && correctOption === answer.choosenAnswer.toLowerCase().trim()) {
          correctAnswers++;
        }
      }
  
      // Calculate score (assuming maximum score is 10)
      const totalQuestions = questions.length;
      const score = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 10 : 0;
  
      // Create quizSubmission document
      const quizSubmission = new QuizSubmission({
        belongsto: id,
        submittedby: body.studentId,
        answers: questionAnsweredDocs,
        score: Math.min(10, Math.max(0, score)) // Ensure score is between 0 and 10
      });
  
      // Save the quizSubmission document
      await quizSubmission.save();
  
      // Update the quiz's submissions array
      await Quiz.findByIdAndUpdate(id, {
        $push: { submissions: quizSubmission._id }
      });
  
      // Return success response with the submission details
      return NextResponse.json({
        success: true,
        message: "Quiz submitted successfully",
        data: {
          submission: {
            id: quizSubmission._id,
            score: quizSubmission.score,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers
          }
        }
      }, { status: 201 });
  
    } catch (error) {
      console.error("Error submitting quiz:", error);
      return NextResponse.json(
        { success: false, message: "Failed to submit quiz", error: (error as Error).message },
        { status: 500 }
      );
    }
  }