// lib/chat.ts
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export const createOrGetConversation = async (user1Id: string, user2Id: string) => {
  const convoRef = collection(db, "conversations");
  const q = query(
    convoRef,
    where("users", "array-contains", user1Id)
  );
  const snapshot = await getDocs(q);

  let convoId: string | null = null
  snapshot.forEach(docSnap => {
    const users = docSnap.data().users;
    if (users.includes(user2Id)) {
      convoId = docSnap.id;
    }
  });

  if (!convoId) {
    const newConvo = await addDoc(convoRef, {
      users: [user1Id, user2Id],
      updatedAt: serverTimestamp(),
      lastMessage: ""
    });
    convoId = newConvo.id;
  }

  return convoId;
};

export const sendMessage = async (conversationId: string, senderId: string, text: string) => {
  const messagesRef = collection(db, "conversations", conversationId, "messages");
  await addDoc(messagesRef, {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });

  await updateDoc(doc(db, "conversations", conversationId), {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });
};
