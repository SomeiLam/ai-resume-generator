'use client'
import { User as UserType } from 'firebase/auth'

import React, { useEffect, useState, useRef } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/Tabs'
import {
  Button,
  Card,
  Input,
  Label,
  Spinner,
  Textarea,
} from '@/src/components/ui'
import { ProfileData } from '@/src/types/profile' // ProfileData is same as profileData now
import {
  ArrowUp,
  ImageIcon,
  Plus,
  Save,
  Trash2,
  Upload,
  User,
} from 'lucide-react'
import { uploadImageToFirebase } from '@/src/lib/firebaseStorage'
import { useRouter } from 'next/navigation'
import { fetchProfile, saveProfile } from '@/src/lib/firebaseFirestore'
import useAuthUser from '@/src/hooks/useAuthUser'
import Image from 'next/image'
// import { getLinkedInAuthUrl } from '@/src/hooks/useLinkedInProfile'
// A default profile (empty or with initial values) based on your type
const defaultProfile: ProfileData = {
  basics: {
    name: '',
    label: '',
    image: '',
    email: '',
    phone: '',
    url: '',
    twitter: '',
    linkedin: '',
    github: '',
    summary: '',
    location: {
      address: '',
      postalCode: '',
      city: '',
      region: '',
    },
    languages: [],
  },
  work: [],
  education: [],
  skills: [],
  projects: [],
}

const tabOrder = ['personal', 'experience', 'education', 'skills', 'projects']

const Profile: React.FC = () => {
  const user = useAuthUser() // This should return an object with user.uid, etc.
  const [error, setError] = useState('')
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  // Function to navigate to the next tab
  const goToNextTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  // Function to navigate to the previous tab
  const goToPrevTab = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  useEffect(() => {
    // Early return if user is null or undefined
    if (!user) return

    // Define an async function that takes user as a parameter
    async function loadProfile(currentUser: UserType) {
      try {
        const data = await fetchProfile(currentUser.uid)
        if (data) {
          setProfileData(data as ProfileData)
        } else {
          setProfileData({
            ...defaultProfile,
            basics: {
              ...defaultProfile.basics,
              email: currentUser.email ?? '',
            },
          })
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    // Call the function with the current user
    loadProfile(user)
  }, [user])

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return
    const file = e.target.files[0]
    setUploading(true)
    try {
      // Upload new image to Firebase Storage
      const uploadedUrl = await uploadImageToFirebase(file, user.uid)
      // Update the profile's image URL in state
      setProfileData((prev) => ({
        ...prev,
        basics: {
          ...prev.basics,
          image: uploadedUrl,
        },
      }))
    } catch (error) {
      console.error('Image upload failed', error)
      setError('Image upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // Helper functions to update nested fields
  const updateBasics = (field: keyof ProfileData['basics'], value: any) => {
    setProfileData((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        [field]: value,
      },
    }))
  }

  const updateLocation = (
    field: keyof ProfileData['basics']['location'],
    value: any
  ) => {
    setProfileData((prev) => ({
      ...prev,
      basics: {
        ...prev.basics,
        location: {
          ...prev.basics.location,
          [field]: value,
        },
      },
    }))
  }

  // Save profile function
  const handleSaveProfile = async () => {
    if (!user) return
    try {
      setLoading(true)
      await saveProfile(user.uid, profileData)
      // Optionally, show a success message or route to dashboard
      router.push('/resume')
    } catch (err) {
      console.error('Error saving profile:', err)
      setError('Failed to save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // const handleLinkedInLogin = () => {
  //   const authUrl = getLinkedInAuthUrl()
  //   // Redirect the user to LinkedIn's authorization URL
  //   window.location.href = authUrl
  // }

  if (loading) return <Spinner />
  console.log('user', user)
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-row justify-between items-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-gray-600">Complete your professional profile</p>
          </div>
          <div className="flex flex-row gap-2">
            {/* <Button onClick={handleLinkedInLogin}>LinkedIn</Button> */}
            <Button onClick={handleSaveProfile} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        {/* Tabs Container */}
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Tabs List */}
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>

            {/* BASICS TAB */}
            <TabsContent value="personal">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT COLUMN */}
                <div className="space-y-4">
                  {/* Profile Image + Upload */}
                  <div className="flex flex-row justify-evenly gap-2">
                    {/* Preview image if available */}

                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                      {profileData.basics.image ? (
                        <Image
                          src={profileData.basics.image}
                          alt={`${profileData.basics.name}'s profile`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <User className="w-32 h-32 text-gray-300" />
                      )}
                    </div>

                    <div className="min-w-52 border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <p className="text-xs mb-2">Upload Image</p>

                      {/* Hidden file input */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageUpload}
                      />

                      {/* Button to trigger file input */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4" />
                        {uploading ? 'Uploading...' : 'Choose File'}
                      </Button>

                      {error && (
                        <p className="mt-2 text-xs text-red-500">{error}</p>
                      )}
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={profileData.basics.name}
                      onChange={(e) => updateBasics('name', e.target.value)}
                    />
                  </div>

                  {/* Professional Title */}
                  <div>
                    <Label
                      htmlFor="title"
                      className="block mb-1 text-sm font-medium"
                    >
                      Professional Title
                    </Label>
                    <Input
                      name="title"
                      placeholder="Title"
                      value={profileData.basics.label}
                      onChange={(e) => updateBasics('label', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={profileData.basics.email}
                      onChange={(e) => updateBasics('email', e.target.value)}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label
                      htmlFor="phone"
                      className="block mb-1 text-sm font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      name="phone"
                      placeholder="Phone"
                      type="tel"
                      value={profileData.basics.phone}
                      onChange={(e) => updateBasics('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-4">
                  {/* Personal Website */}
                  <div>
                    <Label
                      htmlFor="website"
                      className="block mb-1 text-sm font-medium"
                    >
                      Personal Website
                    </Label>
                    <Input
                      name="personalWebsite"
                      placeholder="Personal Website"
                      value={profileData.basics.url ?? ''}
                      onChange={(e) => updateBasics('url', e.target.value)}
                    />
                  </div>

                  {/* Socials (Twitter, LinkedIn, GitHub) */}
                  <div>
                    <Label
                      htmlFor="linkedin"
                      className="block mb-1 text-sm font-medium"
                    >
                      LinkedIn
                    </Label>
                    <Input
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={profileData.basics.linkedin ?? ''}
                      onChange={(e) => updateBasics('linkedin', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="twitter"
                      className="block mb-1 text-sm font-medium"
                    >
                      Twitter
                    </Label>
                    <Input
                      name="twitter"
                      placeholder="https://twitter.com/username"
                      value={profileData.basics.twitter}
                      onChange={(e) => updateBasics('twitter', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="github"
                      className="block mb-1 text-sm font-medium"
                    >
                      GitHub
                    </Label>
                    <Input
                      name="github"
                      placeholder="https://github.com/username"
                      value={profileData.basics.github ?? ''}
                      onChange={(e) => updateBasics('github', e.target.value)}
                    />
                  </div>

                  {/* Professional Summary */}
                  <div>
                    <Label
                      htmlFor="summary"
                      className="block mb-1 text-sm font-medium"
                    >
                      Professional Summary
                    </Label>
                    <Textarea
                      id="summary"
                      placeholder="A brief overview of your experience..."
                      rows={7}
                      onChange={(e) => updateBasics('summary', e.target.value)}
                      value={profileData.basics.summary}
                    />
                  </div>
                </div>
              </div>

              {/* Location & Language (Extra row) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <Label
                    htmlFor="address"
                    className="block mb-1 text-sm font-medium"
                  >
                    Address
                  </Label>
                  <Input
                    name="address"
                    placeholder="Address"
                    value={profileData.basics.location.address ?? ''}
                    onChange={(e) => updateLocation('address', e.target.value)}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="postalCode"
                    className="block mb-1 text-sm font-medium"
                  >
                    Postal Code
                  </Label>
                  <Input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={profileData.basics.location.postalCode ?? ''}
                    onChange={(e) =>
                      updateLocation('postalCode', e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="city"
                    className="block mb-1 text-sm font-medium"
                  >
                    City
                  </Label>
                  <Input
                    name="city"
                    placeholder="City"
                    value={profileData.basics.location.city}
                    onChange={(e) => updateLocation('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="state"
                    className="block mb-1 text-sm font-medium"
                  >
                    State/Region
                  </Label>
                  <Input
                    name="state"
                    placeholder="State/Region"
                    value={profileData.basics.location.region ?? ''}
                    onChange={(e) => updateLocation('region', e.target.value)}
                  />
                </div>
              </div>

              {/* Language (inline example) */}
              <div className="flex flex-col gap-2 mt-4">
                <h3 className="font-semibold text-sm">Languages</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {profileData.basics.languages.map((lang, idx) => (
                    <div
                      key={idx}
                      className="border p-3 rounded-md mb-2 relative"
                    >
                      <div className="flex flex-row gap-4">
                        <div className="py-1">
                          <Label htmlFor="language">Language </Label>
                          <Input
                            name="language"
                            placeholder="Language"
                            value={lang.language}
                            onChange={(e) => {
                              const updated = [...profileData.basics.languages]
                              updated[idx].language = e.target.value
                              updateBasics('languages', updated)
                            }}
                          />
                        </div>
                        <div className="py-1">
                          <Label htmlFor="fluency">Fluency </Label>
                          <Input
                            name="fluency"
                            placeholder="Fluency"
                            value={lang.fluency}
                            onChange={(e) => {
                              const updated = [...profileData.basics.languages]
                              updated[idx].fluency = e.target.value
                              updateBasics('languages', updated)
                            }}
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-red-500"
                        onClick={() => {
                          const updated = [...profileData.basics.languages]
                          updated.splice(idx, 1)
                          updateBasics('languages', updated)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newLang = { language: '', fluency: '' }
                      updateBasics('languages', [
                        ...profileData.basics.languages,
                        newLang,
                      ])
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Language
                  </Button>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-4">
                <Label
                  htmlFor="additionalInfo"
                  className="mb-1 text-sm font-medium"
                >
                  Additional Information
                </Label>
                <Input
                  id="additionalInfo"
                  placeholder="The footer of the resume"
                  onChange={(e) =>
                    updateBasics('additionalInformation', e.target.value)
                  }
                  value={profileData.basics.additionalInformation}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button variant="outline">Previous</Button>
                <Button onClick={goToNextTab}>Next</Button>
              </div>
            </TabsContent>

            {/* WORK TAB */}
            <TabsContent value="experience">
              {profileData.work.map((job, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Company {idx + 1}</h5>
                  <div className="border p-3 rounded-md mb-2 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="py-1">
                        <Label>Company Name</Label>
                        <Input
                          placeholder="Company Name"
                          value={job.name}
                          onChange={(e) => {
                            const updated = [...profileData.work]
                            updated[idx].name = e.target.value
                            setProfileData({ ...profileData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Position</Label>
                        <Input
                          placeholder="Position"
                          value={job.position}
                          onChange={(e) => {
                            const updated = [...profileData.work]
                            updated[idx].position = e.target.value
                            setProfileData({ ...profileData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Company URL</Label>
                        <Input
                          placeholder="Company URL"
                          value={job.url ?? ''}
                          onChange={(e) => {
                            const updated = [...profileData.work]
                            updated[idx].url = e.target.value
                            setProfileData({ ...profileData, work: updated })
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        <div className="py-1">
                          <Label>Start Date (YYYY-MM)</Label>
                          <Input
                            placeholder="Start Date (YYYY-MM)"
                            value={job.startDate}
                            onChange={(e) => {
                              const updated = [...profileData.work]
                              updated[idx].startDate = e.target.value
                              setProfileData({ ...profileData, work: updated })
                            }}
                          />
                        </div>
                        <div className="py-1">
                          <Label>End Date (YYYY-MM or blank)</Label>
                          <Input
                            placeholder="End Date (YYYY-MM or blank)"
                            value={job.endDate ?? ''}
                            onChange={(e) => {
                              const updated = [...profileData.work]
                              updated[idx].endDate = e.target.value
                              setProfileData({ ...profileData, work: updated })
                            }}
                          />
                        </div>
                      </div>
                      <div className="py-1">
                        <Label>Summary</Label>
                        <Textarea
                          rows={7}
                          placeholder="e.g. Developing and maintaining microservices for internal platforms."
                          value={job.summary}
                          onChange={(e) => {
                            const updated = [...profileData.work]
                            updated[idx].summary = e.target.value
                            setProfileData({ ...profileData, work: updated })
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold">
                          Highlights
                        </label>
                        {job.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex gap-2 mt-2">
                            <Input
                              placeholder="e.g. Designed and deployed RESTful APIs using Node.js"
                              value={highlight}
                              onChange={(e) => {
                                const updated = [...profileData.work]
                                updated[idx].highlights[hIdx] = e.target.value
                                setProfileData({
                                  ...profileData,
                                  work: updated,
                                })
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const updated = [...profileData.work]
                                updated[idx].highlights.splice(hIdx, 1)
                                setProfileData({
                                  ...profileData,
                                  work: updated,
                                })
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            const updated = [...profileData.work]
                            updated[idx].highlights.push('')
                            setProfileData({
                              ...profileData,
                              work: updated,
                            })
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Highlight
                        </Button>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => {
                        const updated = [...profileData.work]
                        updated.splice(idx, 1)
                        setProfileData({ ...profileData, work: updated })
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newWork = {
                    name: '',
                    position: '',
                    url: '',
                    startDate: '',
                    endDate: '',
                    summary: '',
                    highlights: [''],
                  }
                  setProfileData({
                    ...profileData,
                    work: [...profileData.work, newWork],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
              </Button>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={goToPrevTab}>
                  Previous
                </Button>
                <Button onClick={goToNextTab}>Next</Button>
              </div>
            </TabsContent>

            {/* EDUCATION TAB */}
            <TabsContent value="education">
              {profileData.education.map((edu, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Education {idx + 1}</h5>
                  <div className="border p-3 rounded-md mb-2 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="py-1">
                        <Label>Institution</Label>
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].institution = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Institution URL</Label>
                        <Input
                          placeholder="Institution URL"
                          value={edu.url ?? ''}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].url = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Degree major</Label>
                        <Input
                          placeholder="Degree major"
                          value={edu.area}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].area = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Degree Type (e.g. Bachelor)</Label>
                        <Input
                          placeholder="Degree Type (e.g. Bachelor)"
                          value={edu.studyType}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].studyType = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Start Date (YYYY-MM)</Label>
                        <Input
                          placeholder="Start Date (YYYY-MM)"
                          value={edu.startDate}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].startDate = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>End Date (YYYY-MM)</Label>
                        <Input
                          placeholder="End Date (YYYY-MM)"
                          value={edu.endDate ?? ''}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].endDate = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>GPA</Label>
                        <Input
                          placeholder="Score"
                          value={edu.score ?? ''}
                          onChange={(e) => {
                            const updated = [...profileData.education]
                            updated[idx].score = e.target.value
                            setProfileData({
                              ...profileData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => {
                        const updated = [...profileData.education]
                        updated.splice(idx, 1)
                        setProfileData({
                          ...profileData,
                          education: updated,
                        })
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newEdu = {
                    institution: '',
                    url: '',
                    area: '',
                    studyType: '',
                    startDate: '',
                    endDate: '',
                    score: '',
                    courses: [],
                  }
                  setProfileData({
                    ...profileData,
                    education: [...profileData.education, newEdu],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={goToPrevTab}>
                  Previous
                </Button>
                <Button onClick={goToNextTab}>Next</Button>
              </div>
            </TabsContent>

            {/* SKILLS TAB */}
            <TabsContent value="skills">
              {profileData.skills.map((skill, idx) => (
                <div key={idx} className="border p-3 rounded-md mb-2 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="py-1">
                      <Label>Skill Name</Label>
                      <Input
                        placeholder="e.g. Backend"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...profileData.skills]
                          updated[idx].name = e.target.value
                          setProfileData({
                            ...profileData,
                            skills: updated,
                          })
                        }}
                      />
                    </div>
                    <div className="py-1">
                      <Label>Skill Level (optional)</Label>
                      <Input
                        placeholder="e.g. Professtional (optional)"
                        value={skill.level ?? ''}
                        onChange={(e) => {
                          const updated = [...profileData.skills]
                          updated[idx].level = e.target.value
                          setProfileData({
                            ...profileData,
                            skills: updated,
                          })
                        }}
                      />
                    </div>
                    {/* Keywords */}
                    <div className="py-1">
                      <Label>Keywords (comma-separated)</Label>
                      <Textarea
                        placeholder="e.g. React, TypeScript, CSS"
                        value={skill.keywords.join(', ')}
                        onChange={(e) => {
                          const updated = [...profileData.skills]
                          updated[idx].keywords = e.target.value
                            .split(',')
                            .map((kw) => kw.trim())
                          setProfileData({
                            ...profileData,
                            skills: updated,
                          })
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => {
                      const updated = [...profileData.skills]
                      updated.splice(idx, 1)
                      setProfileData({
                        ...profileData,
                        skills: updated,
                      })
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newSkill = {
                    name: '',
                    level: '',
                    keywords: [],
                  }
                  setProfileData({
                    ...profileData,
                    skills: [...profileData.skills, newSkill],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={goToPrevTab}>
                  Previous
                </Button>
                <Button onClick={goToNextTab}>Next</Button>
              </div>
            </TabsContent>

            {/* PROJECTS TAB */}
            <TabsContent value="projects">
              {(profileData.projects ?? []).map((project, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Project {idx + 1}</h5>
                  <div className="border p-3 rounded-md mb-2 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="py-1">
                        <Label>Project Name</Label>
                        <Input
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => {
                            const updated = [...(profileData.projects ?? [])]
                            updated[idx].name = e.target.value
                            setProfileData({
                              ...profileData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Project URL</Label>
                        <Input
                          placeholder="Project URL"
                          value={project.url ?? ''}
                          onChange={(e) => {
                            const updated = [...(profileData.projects ?? [])]
                            updated[idx].url = e.target.value
                            setProfileData({
                              ...profileData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label>Description</Label>
                        <Textarea
                          rows={4}
                          placeholder="e.g. A blog built with Next.js and TypeScript, deployed on Vercel. It features dynamic routing, SEO optimization, and Markdown integration for content management."
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...(profileData.projects ?? [])]
                            updated[idx].description = e.target.value
                            setProfileData({
                              ...profileData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      {/* Highlights */}
                      <div>
                        <div className="py-1">
                          <Label>Highlights</Label>
                          <div className="flex flex-col gap-2">
                            {project.highlights.map((highlight, hIdx) => (
                              <div key={hIdx} className="flex gap-2">
                                <Input
                                  value={highlight}
                                  onChange={(e) => {
                                    const updated = [
                                      ...(profileData.projects ?? []),
                                    ]
                                    updated[idx].highlights[hIdx] =
                                      e.target.value
                                    setProfileData({
                                      ...profileData,
                                      projects: updated,
                                    })
                                  }}
                                  placeholder="e.g. Implemented secure user authentication"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  onClick={() => {
                                    const updated = [
                                      ...(profileData.projects ?? []),
                                    ]
                                    updated[idx].highlights.splice(hIdx, 1)
                                    setProfileData({
                                      ...profileData,
                                      projects: updated,
                                    })
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="my-2"
                          onClick={() => {
                            const updated = [...(profileData.projects ?? [])]
                            updated[idx].highlights.push('')
                            setProfileData({
                              ...profileData,
                              projects: updated,
                            })
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Highlight
                        </Button>
                      </div>
                      {/* Keywords */}
                      <div className="py-1">
                        <Label>Keywords (comma-separated)</Label>
                        <Textarea
                          placeholder="e.g. TypeScript, React, Open Source"
                          value={project.keywords.join(', ')}
                          onChange={(e) => {
                            const updated = [...(profileData.projects ?? [])]
                            updated[idx].keywords = e.target.value
                              .split(',')
                              .map((kw) => kw.trim())
                              .filter((kw) => kw.length > 0)
                            setProfileData({
                              ...profileData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                    </div>
                    {/* Arrow Up Button */}
                    <button
                      type="button"
                      className="absolute top-2 right-12 text-blue-500"
                      onClick={() => {
                        // Only allow move up if this is not the first project
                        if (idx > 0) {
                          const updated = [...(profileData.projects ?? [])]
                          // Swap the current project with the previous one
                          const temp = updated[idx - 1]
                          updated[idx - 1] = updated[idx]
                          updated[idx] = temp
                          setProfileData({
                            ...profileData,
                            projects: updated,
                          })
                        }
                      }}
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => {
                        const updated = [...(profileData.projects ?? [])]
                        updated.splice(idx, 1)
                        setProfileData({
                          ...profileData,
                          projects: updated,
                        })
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newProject = {
                    name: '',
                    description: '',
                    highlights: [''],
                    keywords: [],
                    url: '',
                  }
                  setProfileData({
                    ...profileData,
                    projects: [...(profileData.projects ?? []), newProject],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={goToPrevTab}>
                  Previous
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default Profile
