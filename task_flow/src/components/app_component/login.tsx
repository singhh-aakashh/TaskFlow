"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signIn } from "../../../auth"
import { signInUser } from "@/actions/signup"
import { useRouter } from "next/navigation"

export const formLoginSchema = z.object({
    email: z.string().email(),
    password:z.string().min(4,{
        message:"Password must have 4 characters"
    })
  })

export function LoginComponent() {
  const router = useRouter()
    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })

    async  function onSubmit(values: z.infer<typeof formLoginSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        const resp =  await signInUser(values)
        if(resp){
          router.push("/dashboard")
        }
      }

  return (
    <Card className="w-[350px] border-none">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-medium">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit" className="w-full">Submit</Button>
      
      </form>
    </Form>
      </CardContent>
     
    </Card>
  )
}
