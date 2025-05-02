"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// This is a mock authentication service
// In a real application, you would use a proper authentication service
// like NextAuth.js, Auth.js, or a custom solution with a database

type User = {
  id: string
  email: string
  firstName: string
  lastName: string
}

// Mock user database
const USERS: Record<string, User> = {
  "user1@example.com": {
    id: "user1",
    email: "user1@example.com",
    firstName: "John",
    lastName: "Doe",
  },
}

// Mock authentication functions
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would validate credentials against a database
  // For demo purposes, we'll accept any email that exists in our mock database
  // and any password
  if (USERS[email]) {
    // Set a cookie to simulate authentication
    cookies().set("auth-token", `token-${email}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to dashboard
    redirect("/dashboard")
  }

  // For demo purposes, we'll just redirect to login with an error
  // In a real app, you would return an error and handle it in the form
  redirect("/auth/login?error=invalid-credentials")
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const password = formData.get("password") as string

  // Simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would validate the input and create a new user in the database
  // For demo purposes, we'll just simulate a successful registration
  // and set a cookie to simulate authentication
  cookies().set("auth-token", `token-${email}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  // Redirect to dashboard
  redirect("/dashboard")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  // Simulate server latency
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would send a password reset email
  // For demo purposes, we'll just redirect to a success page
  redirect("/auth/reset-success")
}

export async function logoutUser() {
  // Clear the authentication cookie
  cookies().delete("auth-token")

  // Redirect to home page
  redirect("/")
}

export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get("auth-token")?.value

  if (!token) {
    return null
  }

  // In a real app, you would validate the token and fetch the user from the database
  // For demo purposes, we'll extract the email from the token and return the user if it exists
  const email = token.replace("token-", "")
  return USERS[email] || null
}
