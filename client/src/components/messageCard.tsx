import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessage } from "@/types/message.type";

const MessageCard = ({
  message,
  isCurrentUser,
}: {
  message: ChatMessage;
  isCurrentUser: boolean;
}) => {
  return (
    <div
      className={`w-full flex flex-col ${
        isCurrentUser ? "items-end" : "items-start"
      }`}
    >
      <Card
        className="w-96 pl-4 my-2"
        onClick={() => console.log(isCurrentUser)}
      >
        <CardContent className="pt-3 w-full">
          <p className="font-bold">{message.text}</p>
          <p className="text-secondary-dark">
            {new Date(message.created_at).toLocaleString("id-ID", {
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export const MessageCards = ({
  messages,
  userId,
}: {
  messages: ChatMessage[];
  userId: number;
}) => {
  return (
    <>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          message={message}
          isCurrentUser={message.senderId === userId}
        />
      ))}
    </>
  );
};
