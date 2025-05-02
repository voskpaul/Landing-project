import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import AuthLayout from "@/components/auth-layout"

export default function ResetSuccessPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex justify-center mb-2">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Check your email</h1>
        <p className="text-muted-foreground">
          We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the
          instructions to reset your password.
        </p>

        <Button asChild className="mt-4 w-full bg-purple-600 hover:bg-purple-700">
          <Link href="/auth/login">Back to login</Link>
        </Button>
      </div>
    </AuthLayout>
  )
}
