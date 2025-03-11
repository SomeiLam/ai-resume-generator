import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './providers'
import Appbar from '../components/Appbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Resume Builder',
  description:
    'Create professional resumes and cover letters with AI assistance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Suspense>
            <ScrollToTop />
            <Appbar />
            <main className="min-h-screen bg-background">{children}</main>
            <Footer />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
