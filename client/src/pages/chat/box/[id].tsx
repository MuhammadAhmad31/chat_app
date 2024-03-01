import { ContainerLayouts } from "@/components/Layout/ContainerLayouts";
import { MessageCards } from "@/components/messageCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetChatByTwoUsers } from "@/hooks/useChat";
import { useGetMessageByIdChat, useSendMessage } from "@/hooks/useMessage";
import { ChatMessage } from "@/types/message.type";
import { getCookie } from "@/utils/cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { io, Socket } from "socket.io-client";
import { useGetOneUser } from "@/hooks/useUser";
import Link from "next/link";
const socket: Socket = io("http://localhost:8000");

export const ChatBox = () => {
  const id = Number(getCookie("id"));
  const [chat, setChat] = useState<ChatMessage | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const { addMessage } = useSendMessage();
  const [user, setUser] = useState<any>();

  const router = useRouter();
  const userId = Number(router.query.id);

  const FormSchema = z.object({
    text: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });
  {
    const { data } = useGetOneUser(id);

    useEffect(() => {
      if (data.user) {
        setUser(data.user);
      }
    }, [data]);
  }

  const { data: chatData } = useGetChatByTwoUsers(id, userId);

  useEffect(() => {
    if (chatData && chatData.chats) {
      setChat(chatData.chats);
    }
  }, [chatData, userId]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const dataSend = {
      text: data.text,
      chatId: chat?.id!,
      senderId: id,
    };
    form.reset();
    await addMessage(dataSend);

    socket.emit("message", dataSend);
  };

  const { data: messageData, refetch: refetchMessages } = useGetMessageByIdChat(
    chat?.id || 0,
    socket
  );

  useEffect(() => {
    if (messageData && messageData.chats) {
      setMessages(messageData.chats);
    }
  }, [messageData, chat?.id]);

  useEffect(() => {
    const handleReceiveMessage = async () => {
      await refetchMessages();

      // alert("Ada pesan baru, data diperbarui!");
    };

    socket.on("receive", handleReceiveMessage);

    return () => {
      socket.off("receive", handleReceiveMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, refetchMessages]);

  return (
    <>
      <ContainerLayouts>
        <div className="flex h-screen ">
          <div className="w-full p-4 bg-secondary-dark">
            <Card>
              <CardHeader>
                <Link href="/chat">Kembali</Link>
                <CardTitle className="mb-4 text-2xl font-bold">
                  Message to{" "}
                  <span className="text-teal-400 ">{user?.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <MessageCards messages={messages} userId={id} />
              </CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-12/12"
                >
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">Pesan</FormLabel>
                        <FormControl>
                          <Input
                            className="text-center border-button-color-teal"
                            placeholder="Masukan Pesan"
                            type="text"
                            {...field}
                            required
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-center">
                    <Button className="w-2/4 bg-zinc-950">Kirim</Button>
                  </div>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </ContainerLayouts>
    </>
  );
};

export default ChatBox;
