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

export const ChatBox = () => {
  const id = Number(getCookie("id"));
  const [chat, setChat] = useState<ChatMessage>();
  const [message, setMessage] = useState<any>();
  const { addMessage } = useSendMessage();

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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // await addMessage(data)

    const dataSend = {
      text: data.text,
      chatId: chat?.id!,
      senderId: id,
    };
    form.reset();
    await addMessage(dataSend);
  };

  {
    const { data } = useGetChatByTwoUsers(id, userId);
    useEffect(() => {
      if (data && data.chats) {
        setChat(data.chats);
      }
    }, [data, userId]);
  }

  {
    const { data } = useGetMessageByIdChat(chat?.id!);
    useEffect(() => {
      if (data && data.chats) {
        setMessage(data.chats);
      }
    }, [data]);
  }

  if (chat && chat) {
    return (
      <>
        <ContainerLayouts>
          <div className="flex h-screen ">
            <div className="w-full p-4 bg-secondary-dark">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black text-2xl font-bold mb-4">
                    Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MessageCards messages={message} userId={id} />
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
                        <>
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
                        </>
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
  } else {
    return <div>Create Your Message</div>;
  }
};

export default ChatBox;
