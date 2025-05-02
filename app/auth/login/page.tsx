import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"
import AuthLayout from "@/components/auth-layout"
import { loginUser } from "@/app/actions/auth"

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <Bot className="h-10 w-10 text-purple-500" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
      </div>

      <form action={loginUser} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/auth/forgot-password" className="text-sm text-purple-500 hover:text-purple-400">
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Sign In
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="text-purple-500 hover:text-purple-400">
          Sign up
        </Link>
      </div>
    </AuthLayout>
  )
}
