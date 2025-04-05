# Unilearn – A College-Oriented E-Learning Platform

**Unilearn** is a full-stack web-based e-learning platform built to simplify and enhance the academic experience for colleges. It bridges communication gaps, streamlines course handling, and brings together students, faculty, and admins on a unified digital platform.

---

## 🌐 Live Demo

**🔗 [Visit Unilearn](https://unilearn-one.vercel.app)**

credeentials for student - ankit123@gmail.com (username) /pw - ankit123
credentials for faculty - syed123@gmail.com (username) /pw - syed123

you can create your own credentials by visting - /admin/create-user

---

## 🎯 Key Objectives

- Enable smooth communication between students and faculty.
- Centralize lecture delivery, assignment submissions, and quizzes.
- Provide real-time academic performance tracking.
- Create a scalable solution that adapts to various institutions.

---

## 👤 User Roles

| Role    | Capabilities |
|---------|--------------|
| **Admin**   | Manage user accounts, oversee system activity, post announcements, generate reports. |
| **Faculty** | Create courses, upload content, assign quizzes/assignments, and track student performance. |
| **Student** | Enroll in courses, access content, submit work, take quizzes, and view feedback. |

> Note: Self-registration is disabled. Admin provides login credentials for each user.

---

## 🧱 Tech Stack

| Layer         | Tech Used                          |
|---------------|------------------------------------|
| Frontend      | React.js, Next.js, Tailwind CSS    |
| Backend       | Next.js API Routes, TypeScript     |
| Authentication| NextAuth.js                        |
| Database      | MongoDB                            |
| Chat System   | Firebase Realtime Database         |
| Hosting       | Vercel                             |

---

## 🧩 Core Features

### Admin Panel
- **User Management** – Add and manage student/faculty accounts.
- **Course Management** – Create, edit, and delete courses.
- **Reports** – View student progress and faculty activity logs.
- **Monitoring** – Track platform usage and manage system settings.
- **Announcements** – Broadcast important notices across the platform.

### Faculty Dashboard
- **Course Control** – Upload lectures in the form of videos, PDFs, or notes.
- **Assignments & Quizzes** – Create tests with deadlines and auto-grading support.
- **Performance Tracking** – Monitor student progress and offer feedback.
- **Reminders & Alerts** – Send important notifications to students.

### Student Dashboard
- **Login & Auth** – Secure login using admin-provided credentials.
- **Course Enrollment** – Browse and join available courses.
- **Lecture Access** – Watch recorded/live lectures and access learning materials.
- **Assignment Submission** – Upload and track submissions before deadlines.
- **Quiz Participation** – Attempt online quizzes and view instant results.
- **Progress Review** – Track grades, analytics, and faculty feedback.
- **Reminders** – Get push notifications for upcoming tasks or announcements.

---

## 💡 Bonus Features

| Feature                    | Description |
|----------------------------|-------------|
| AI-based Recommendations   | Suggests courses based on interests and history. |
| Gamification & Leaderboard | Badges and rankings to boost engagement. |
| Offline Access             | Download course materials for offline study. |
| Student-Faculty Chat       | Realtime chat using Firebase integration. |
| Plagiarism Detection       | Validate originality in submitted assignments. |

---

## 🚀 Future Scope

- Live class support using video conferencing APIs.
- Analytics dashboards with data visualizations.
- Academic calendar and event scheduler.
- Student forums for collaborative discussions.
- Alumni dashboards and placement assistance.

---

## 🛠️ System Architecture

```yaml
architecture:
  frontend:
    framework: Next.js + Tailwind CSS
    auth: NextAuth.js
    hosting: Vercel
  backend:
    api: Next.js API Routes
    language: TypeScript
  database:
    primary: MongoDB
    chat: Firebase Realtime Database
  user-flow:
    - Admin creates user accounts
    - Faculty uploads course content and tracks students
    - Students access materials and submit work

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/ankitku3101/e-learn-platform.git
cd e-learn-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

FIREBASE_API_KEY=your_firebase_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=your_firebase_database_url
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📁 Folder Structure

```
.
├── components/       # Reusable UI components
├── pages/            # Next.js routes
│   └── api/          # Backend APIs
├── db/               # Database schema & config
├── lib/              # Helper functions
├── firebase.js       # Firebase chat config
├── public/           # Static assets
└── .env.local        # Environment variables
```

---

## 🔗 Deployment

This project is deployed on **Vercel**.  
Live URL 👉 **[https://unilearn-one.vercel.app](https://unilearn-one.vercel.app)**

---
