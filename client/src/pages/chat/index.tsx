import { ContainerLayouts } from "@/components/Layout/ContainerLayouts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetOneUser } from "@/hooks/useUser";
import { User } from "@/types/user.type";
import { deleteCookie, getCookie } from "@/utils/cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Chat() {
  const [user, setUser] = useState<User>();

  const FormSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const id = Number(getCookie("id"));
  console.log(id);

  const { data } = useGetOneUser(id);

  useEffect(() => {
    if (data.user) {
      setUser(data.user);
    }
  }, [data]);

  console.log(user);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  const handleLogout = () => {
    deleteCookie();
    window.location.href = "/login";
  };

  return (
    <>
      <ContainerLayouts>
        <div className="flex justify-center items-center gap-3">
          <h1>chat app {user?.name}</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </ContainerLayouts>
    </>
  );
}
