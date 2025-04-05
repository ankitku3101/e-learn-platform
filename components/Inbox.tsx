"use client";
import { useSession } from "next-auth/react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function Inbox({ onSelect }: { onSelect: (id: string) => void }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "conversations"),
      where("users", "array-contains", userId),
      orderBy("updatedAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setConversations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [userId]);

  return (
    <div>
      <h2 className="font-bold mb-2">Inbox</h2>
      <ul>
        {conversations.map((convo) => (
          <li key={convo.id} className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => onSelect(convo.users.find((u: string) => u !== userId))}>
            <div className="text-sm">{convo.lastMessage}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
