'use client'
import React from 'react'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui'
import { ThemeToggle } from './ThemeToggle'
import useAuthUser from '../hooks/useAuthUser'
import { signOut } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { auth } from '../lib/firebase'

const Appbar = () => {
  const user = useAuthUser()
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push('/')
        console.log('Signed out successfully')
      })
      .catch((error) => {
        console.error('Error signing out:', error)
      })
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h1 className="text-xl font-bold">AI Resume Builder</h1>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button
                  variant={pathname === '/dashboard' ? 'activeLink' : 'link'}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/resume">
                <Button
                  variant={pathname === '/resume' ? 'activeLink' : 'link'}
                >
                  Resume
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant={pathname === '/profile' ? 'activeLink' : 'link'}
                >
                  Profile
                </Button>
              </Link>
              <Button variant="link" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Appbar
