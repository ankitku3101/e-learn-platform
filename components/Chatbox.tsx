"use client";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendMessage, createOrGetConversation } from "@/lib/chat";
import { useSession } from "next-auth/react";

type ChatBoxProps = {
  recipientId: string;
};

export default function ChatBox({ recipientId }: ChatBoxProps) {
  const { data: session } = useSession();
  const senderId = session?.user?.id!;
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    if (!senderId || !recipientId) return;

    const setupChat = async () => {
      const convoId = await createOrGetConversation(senderId, recipientId);
      setConversationId(convoId);

      const q = query(
        collection(db, "conversations", convoId, "messages"),
        orderBy("timestamp", "asc")
      );

      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });
    };

    setupChat();
  }, [recipientId, senderId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(conversationId, senderId, input);
    setInput("");
  };

  return (
    <div className="p-4 border rounded w-full max-w-md">
      <div className="mb-4 h-64 overflow-y-scroll">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.senderId === senderId ? "text-right" : "text-left"}`}>
            <span className="inline-block bg-gray-200 rounded px-3 py-1">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="border rounded px-2 py-1 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-1 rounded">Send</button>
      </div>
    </div>
  );
}
