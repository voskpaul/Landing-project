import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"
import AuthLayout from "@/components/auth-layout"
import { registerUser } from "@/app/actions/auth"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <Bot className="h-10 w-10 text-purple-500" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
      </div>

      <form action={registerUser} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required />
          </div>
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="Create a password" required minLength={8} />
          <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Create Account
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-purple-500 hover:text-purple-400">
          Sign in
        </Link>
      </div>
    </AuthLayout>
  )
}
