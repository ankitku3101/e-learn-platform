// app/chat/page.tsx
"use client";
import ChatBox from "@/components/Chatbox";
import Inbox from "@/components/Inbox";
import { useState } from "react";

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className="flex gap-4 p-4">
      <Inbox onSelect={(id) => setSelectedUser(id)} />
      {selectedUser && <ChatBox recipientId={selectedUser} />}
    </div>
  );
}
