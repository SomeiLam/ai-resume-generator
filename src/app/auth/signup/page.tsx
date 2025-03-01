'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  AuthProvider,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth, googleProvider } from '../../../lib/firebase'
import Link from 'next/link'
import { FirebaseError } from 'firebase/app'
import { Button, Card, Input, Label } from '@/src/components/ui'

const SignUpPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      setIsLoading(true)
      setError('')
      await createUserWithEmailAndPassword(auth, email, password)
      // Optionally update the user's display name here with updateProfile
      router.push('/dashboard')
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase Error Code:', error.code)
        console.error('Firebase Error Message:', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signUpWithProvider = async (provider: AuthProvider) => {
    try {
      setIsLoading(true)
      setError('')
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error signing up with provider:', error)
      setError('Failed to sign up with Google. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
              <p className="text-muted-foreground mb-4">
                Sign up to access AI Resume Builder and unlock powerful resume
                creation tools, personalized templates, and more.
              </p>
            </div>

            {error && (
              <div className="mb-4 text-center text-red-500 text-sm">
                {error}
              </div>
            )}

            {/* Sign-Up Form */}
            <div className="mb-6 space-y-4">
              <div className="py-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="py-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="py-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="py-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button
                variant="default"
                className="w-full"
                onClick={signUpWithEmail}
                disabled={
                  isLoading ||
                  !fullName ||
                  !email ||
                  !password ||
                  !confirmPassword
                }
              >
                {isLoading ? 'Creating Account...' : 'Sign Up with Email'}
              </Button>
            </div>

            {/* Divider */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-background px-2 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            {/* Google Sign-Up */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signUpWithProvider(googleProvider)}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
