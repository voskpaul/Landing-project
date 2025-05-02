import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot } from "lucide-react"
import AuthLayout from "@/components/auth-layout"
import { resetPassword } from "@/app/actions/auth"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center mb-2">
          <Bot className="h-10 w-10 text-purple-500" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link</p>
      </div>

      <form action={resetPassword} className="space-y-4">
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
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
          Send Reset Link
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-purple-500 hover:text-purple-400">
          Back to login
        </Link>
      </div>
    </AuthLayout>
  )
}
