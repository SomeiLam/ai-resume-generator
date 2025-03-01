'use client'
import { PenLine, Download, Share2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import './globals.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create Professional Resumes with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate tailored resumes and cover letters that stand out using
              advanced AI. Get personalized suggestions and real-time previews.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg">
                  Get Started
                  <PenLine className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-lg border bg-card">
              <PenLine className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Writing</h3>
              <p className="text-muted-foreground">
                Generate professional content tailored to your experience and
                target job.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Download className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
              <p className="text-muted-foreground">
                Download your resume as PDF or share it directly with
                recruiters.
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <Share2 className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Smart Templates</h3>
              <p className="text-muted-foreground">
                Choose from multiple professional templates with real-time
                preview.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Templates
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((template) => (
              <div
                key={template}
                className="bg-card rounded-lg overflow-hidden shadow-lg"
              >
                <div className="aspect-[3/4] bg-accent"></div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Template {template}</h3>
                  <Button variant="outline" className="w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
