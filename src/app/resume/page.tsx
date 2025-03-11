'use client'

import { useEffect, useRef, useState } from 'react'
import { User as UserType } from 'firebase/auth'
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
import { ProfileData } from '@/src/types/profile'
import MacchiatoTemplate from '@/src/components/templates/MacchiatoTemplate'
import OnePagePlusTemplate from '@/src/components/templates/OnePagePlusTemplate'
import { sampleResumeData } from '@/src/mockData'
import RickOsborneTemplate from '@/src/components/templates/RickOsborneTemplate'
import useAuthUser from '@/src/hooks/useAuthUser'
import { fetchProfile } from '@/src/lib/firebaseFirestore'
import { Spinner } from '@/src/components/ui'
import { useSearchParams } from 'next/navigation'
import { PDFDownloadLink } from '@react-pdf/renderer'
import OnePagePlusDocument from '@/src/components/Resume/OnePagePlusDocument'
import { getBase64FromUrl } from '@/src/lib/utils'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '@/src/lib/firebase'

export default function Resume() {
  const user = useAuthUser()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resumeName, setResumeName] = useState('My Resume')
  const [resumeData, setResumeData] = useState<ProfileData>(sampleResumeData)

  const [showRight, setShowRight] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const printRef = useRef<HTMLDivElement>(null)

  const toggleRight = () => setShowRight(!showRight)

  const resumeTemplates = [
    {
      id: 'macchiato',
      name: 'Macchiato',
      component: <MacchiatoTemplate data={resumeData} />,
      sampleComponent: <MacchiatoTemplate data={resumeData} disableLinks />,
    },
    {
      id: 'one-page-plus',
      name: 'One Page Plus',
      component: <OnePagePlusTemplate data={resumeData} />,
      sampleComponent: <OnePagePlusTemplate data={resumeData} disableLinks />,
    },
    {
      id: 'rickosborne',
      name: 'RickOsborne',
      component: <RickOsborneTemplate data={resumeData} />,
      sampleComponent: <RickOsborneTemplate data={resumeData} disableLinks />,
    },
  ]

  const searchParams = useSearchParams()
  const templateId = searchParams.get('templateId')
  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    templateId || resumeTemplates[0].id
  )

  useEffect(() => {
    // Early return if user is null or undefined
    if (!user) return

    // Define an async function that takes user as a parameter
    async function loadProfile(currentUser: UserType) {
      try {
        const data = await fetchProfile(currentUser.uid)
        if (data) {
          setResumeData(data as ProfileData)
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    // Call the function with the current user
    loadProfile(user)
  }, [user])

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

  if (loading) return <Spinner />

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
            {selectedTemplate === 'one-page-plus' && (
              <Button>
                <Download className="mr-2 h-4 w-4" />
                <PDFDownloadLink
                  document={<OnePagePlusDocument data={resumeData} />}
                  fileName="profile.pdf"
                >
                  {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
                </PDFDownloadLink>
              </Button>
            )}
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
                              : 'border-transparent ring-1 hover:ring-2'
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
                                )?.sampleComponent
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
                      ref={printRef}
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
