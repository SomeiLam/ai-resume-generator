'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/Tabs'
import { Download, ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { Card } from '@/src/components/ui/Card'
import Link from 'next/link'
import { Input } from '@/src/components/ui/Input'
import CoverLetterTab from '@/src/components/Resume/CoverLetterTab'
import ResumeForm from '@/src/components/Resume/ResumeForm'
import { ResumeData } from '@/src/types/profile'
import MacchiatoTemplate from '@/src/components/templates/MacchiatoTemplate'
import OnePagePlusTemplate from '@/src/components/templates/OnePagePlusTemplate'
import { sampleResumeData } from '@/src/mockData'
import RickOsborneTemplate from '@/src/components/templates/RickOsborneTemplate'

export default function Resume() {
  const [resumeName, setResumeName] = useState('My Resume')
  const [resumeData, setResumeData] = useState<ResumeData>(sampleResumeData)

  const [showRight, setShowRight] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  const toggleRight = () => setShowRight(!showRight)

  const resumeTemplates = [
    {
      id: 'macchiato',
      name: 'Macchiato',
      component: <MacchiatoTemplate data={resumeData} />,
    },
    {
      id: 'one-page-plus',
      name: 'One Page Plus',
      component: <OnePagePlusTemplate data={resumeData} />,
    },
    {
      id: 'rickosborne',
      name: 'RickOsborne',
      component: <RickOsborneTemplate data={resumeData} />,
    },
  ]
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    resumeTemplates[0].id
  )

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth

      // Calculate scale based on base width of 700px
      const newScale = containerWidth / 1170
      setScale(newScale)
    }

    // Run once on mount
    handleResize()

    // Also update on window resize
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="resume" className="space-y-4">
          <TabsList>
            <TabsTrigger value="resume">Resume Builder</TabsTrigger>
            <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
          </TabsList>

          {/* Resume Builder */}
          <TabsContent value="resume">
            <div className="space-y-6">
              {/* Template Selection */}
              <Card className="p-6">
                <div className="mb-6">
                  <label
                    htmlFor="resumeName"
                    className="block text-sm font-medium mb-2"
                  >
                    Resume Name
                  </label>
                  <Input
                    id="resumeName"
                    placeholder="e.g., Software Developer Resume"
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-4">Select Template</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {resumeTemplates.map((template) => {
                      // Define a fixed preview width (in pixels) and calculate scale factor
                      const previewWidth = 300
                      const baseWidth = 700
                      const scaleFactor = previewWidth / baseWidth
                      const previewHeight = Math.round(1000 * scaleFactor)

                      return (
                        <div
                          key={template.id}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedTemplate === template.id
                              ? 'border-primary ring-2 ring-primary ring-opacity-50'
                              : 'border-transparent hover:border-gray-200'
                          }`}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          {/* Scaled preview container */}
                          <div
                            className="relative overflow-hidden"
                            style={{
                              width: `${previewWidth}px`,
                              height: `${previewHeight}px`,
                            }}
                          >
                            <div
                              style={{
                                width: `${baseWidth}px`,
                                height: '1000px',
                                transform: `scale(${scaleFactor})`,
                                transformOrigin: 'top left',
                              }}
                            >
                              {
                                resumeTemplates.find(
                                  (t) => t.id === template.id
                                )?.component
                              }
                            </div>
                          </div>
                          <div className="p-2 text-center text-sm font-medium">
                            {template.name}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Card>

              {/* Resume Editor + Preview in Flex Layout */}
              <div
                ref={containerRef}
                className="grid md:grid-cols-6 gap-6 relative w-full"
              >
                {/* Left (Editor) */}
                <Card
                  className={`p-6 ${showRight ? 'md:col-span-2' : 'md:col-span-3'}`}
                >
                  <ResumeForm
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    toggleRight={toggleRight}
                    showRight={showRight}
                  />
                </Card>

                {/* Right (Preview) */}
                <Card
                  className={`p-6 ${showRight ? 'md:col-span-4' : 'md:col-span-3'}`}
                >
                  <h2 className="text-xl font-semibold mb-4">Preview</h2>
                  <div className="bg-white border rounded-lg overflow-auto">
                    <div
                      className="transform origin-top-left"
                      style={{
                        width: '700px',
                        height: '1000px',
                        transform: `scale(${scale})`,
                      }}
                    >
                      {
                        resumeTemplates.find((t) => t.id === selectedTemplate)
                          ?.component
                      }
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Cover Letter Tab */}
          <TabsContent value="cover-letter">
            <CoverLetterTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
