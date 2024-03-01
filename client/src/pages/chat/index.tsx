import { ContainerLayouts } from "@/components/Layout/ContainerLayouts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateChat, useGetChatByIdUser } from "@/hooks/useChat";
import { useGetOneUser, useGetUser } from "@/hooks/useUser";
import type { Chat } from "@/types/chat.type";
import { User } from "@/types/user.type";
import { getMembersByIdNotEqual } from "@/utils/contact";
import { deleteCookie, getCookie } from "@/utils/cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Chat() {
  const [user, setUser] = useState<User>();
  const [chat, setChat] = useState<Chat[]>();
  const [userAll, setAllUsers] = useState();
  const { addChat, isLoading, isSuccess } = useCreateChat();

  const id = Number(getCookie("id"));

  {
    const { data } = useGetOneUser(id);

    useEffect(() => {
      if (data.user) {
        setUser(data.user);
      }
    }, [data]);
  }
  {
    const { data } = useGetChatByIdUser(id);

    useEffect(() => {
      if (data.chats) {
        setChat(data.chats);
      }
    }, [data]);
  }

  const resultMembers: number[] = getMembersByIdNotEqual(chat, id);

  {
    const { data } = useGetUser();

    useEffect(() => {
      if (data.users) {
        setAllUsers(data.users);
      }
    }, [data]);
  }

  const filterUsersById = (
    users: User[],
    idsToFilter: number[]
  ): { matching: User[]; nonMatching: User[] } => {
    const matchingUsers = users.filter((user) =>
      idsToFilter.includes(user.id as number)
    );
    const nonMatchingUsers = users.filter(
      (user) => !idsToFilter.includes(user.id as number)
    );

    return {
      matching: matchingUsers,
      nonMatching: nonMatchingUsers,
    };
  };
  const { matching, nonMatching } = userAll
    ? filterUsersById(userAll, resultMembers)
    : { matching: [], nonMatching: [] };

  const dataNonMatching = nonMatching.filter((item) => item.id !== id);

  const handleLogout = () => {
    deleteCookie();
    window.location.href = "/login";
  };

  const handleBadgeClick = async (userId: number) => {
    const randomId = Math.floor(Math.random() * 1000);

    const formDataWithId = {
      id: randomId,
      firstId: id,
      secondId: userId,
    };

    await addChat(formDataWithId);
  };

  const router = useRouter();

  return (
    <>
      <ContainerLayouts>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-between w-full gap-3 mb-14">
            <h1 className="text-2xl font-bold">
              Nge<span className="text-orange-500 ">Chat</span> {user?.name}
            </h1>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 p-4 rounded-md bg-slate-800">
            <h2 className="text-white ">Pengguna Aplikasi : </h2>
            {dataNonMatching &&
              dataNonMatching.map((user) => (
                <Badge
                  key={user.id}
                  variant="destructive"
                  className="p-2 m-1"
                  style={{ cursor: "pointer" }}
                  onClick={() => user.id && handleBadgeClick(user.id)}
                >
                  {user.name}
                </Badge>
              ))}
          </div>
        </div>
        <div className="flex h-screen ">
          <div className="w-full p-4 bg-secondary-dark">
            <Card>
              <CardHeader>
                <CardTitle className="mb-4 text-2xl font-bold text-black">
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  {matching.map((user) => (
                    <Card
                      key={user.id}
                      className="flex items-center pl-4 my-2"
                      onClick={() => router.push(`/chat/box/${user.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Avatar>
                        <AvatarImage
                          className="w-12 rounded-full"
                          src="https://github.com/shadcn.png"
                          alt="user"
                        />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                      <CardContent className="w-full pt-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-2xl font-bold">{user.name}</p>
                            {/* <p>hai kau dimana</p> */}
                          </div>
                          <div>
                            {/* <p className="text-secondary-dark">12/12/24</p>
                            <Badge variant="destructive">2</Badge> */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ContainerLayouts>
    </>
  );
}
