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
import { useRegister } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

export default function Register() {
  // use react query
  const { register, isLoading, isSuccess } = useRegister();

  const FormSchema = z.object({
    name: z.string(),
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const randomId = Math.floor(Math.random() * 1000);

    const formDataWithId = {
      ...data,
      id: randomId,
    };
    await register(formDataWithId);
  };

  return (
    <>
      <ContainerLayouts>
        <div className="flex items-center justify-center h-screen mx-auto bg-primary-color-teal">
          <Card className="rounded-sm md:w-1/4">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-button-color-teal">
                Register
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="sr-only">Name</FormLabel>
                          <FormControl>
                            <Input
                              className="text-center border-button-color-teal"
                              placeholder="Masukan nama"
                              type="text"
                              {...field}
                              // onChange={(val) => {
                              //   console.log(val);

                              // }}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="sr-only">Username</FormLabel>
                          <FormControl>
                            <Input
                              className="text-center border-button-color-teal"
                              placeholder="Masukan Username"
                              type="text"
                              {...field}
                              // onChange={(val) => {
                              //   console.log(val);

                              // }}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel className="sr-only">Password</FormLabel>
                          <FormControl>
                            <Input
                              className="text-center border-button-color-teal"
                              placeholder="Masukan Password"
                              type="password"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                  <div className="flex items-center justify-center">
                    <Button className="w-2/4 bg-zinc-950">Masuk</Button>
                  </div>
                </form>
              </Form>
              <div className="flex justify-center items-center">
                <p className="text-sm pt-2 text-center text-button-color-teal">
                  <Link href="/login">Kembali ke login</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContainerLayouts>
    </>
  );
}
