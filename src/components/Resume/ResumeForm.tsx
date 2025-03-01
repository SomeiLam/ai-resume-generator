import React, { useRef, useState } from 'react'
import { Input } from '@/src/components/ui/Input'
import { ProfileData } from '@/src/types/profile'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/Tabs'
import {
  Trash2,
  Plus,
  ChevronLeft,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  FolderGit2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/src/components/ui/Button'
import { Label, Textarea } from '../ui'

type ResumeFormProps = {
  resumeData: ProfileData
  setResumeData: React.Dispatch<React.SetStateAction<ProfileData>>
  toggleRight: () => void
  showRight: boolean
}

const tabOrder = [
  'personal',
  'summary',
  'experience',
  'education',
  'skills',
  'projects',
]

const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  setResumeData,
  toggleRight,
  showRight,
}) => {
  const [activeTab, setActiveTab] = useState('personal')
  const tabsListRef = useRef<HTMLDivElement>(null)
  // Helper to update any nested field in resumeData
  const updateBasics = (field: keyof ProfileData['basics'], value: any) => {
    setResumeData({
      ...resumeData,
      basics: {
        ...resumeData.basics,
        [field]: value,
      },
    })
  }

  const updateLocation = (
    field: keyof ProfileData['basics']['location'],
    value: any
  ) => {
    setResumeData({
      ...resumeData,
      basics: {
        ...resumeData.basics,
        location: {
          ...resumeData.basics.location,
          [field]: value,
        },
      },
    })
  }

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

  // Function to scroll tabs list
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsListRef.current) {
      const scrollAmount = 150 // Adjust as needed
      if (direction === 'left') {
        tabsListRef.current.scrollLeft -= scrollAmount
      } else {
        tabsListRef.current.scrollLeft += scrollAmount
      }
    }
  }

  return (
    <div className="h-full">
      <div className="flex flex-row justify-between items-start mb-4">
        <h2 className="text-xl font-semibold mb-4">Resume Editor</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleRight}
          className="shrink-0 -mt-2"
        >
          {showRight ? (
            <ArrowRight className="h-4 w-4" />
          ) : (
            <ArrowLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Editor Tabs with Slider */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full h-full"
      >
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollTabs('left')}
            className="shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div
            ref={tabsListRef}
            className="overflow-x-auto flex-grow scrollbar-hide h-full"
            style={{ scrollBehavior: 'smooth' }}
          >
            <TabsList className="flex w-max">
              <TabsTrigger value="personal" className="whitespace-nowrap">
                <User className="h-4 w-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="summary" className="whitespace-nowrap">
                <FileText className="h-4 w-4 mr-2" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="experience" className="whitespace-nowrap">
                <Briefcase className="h-4 w-4 mr-2" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="whitespace-nowrap">
                <GraduationCap className="h-4 w-4 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="skills" className="whitespace-nowrap">
                <Code className="h-4 w-4 mr-2" />
                Skills
              </TabsTrigger>
              <TabsTrigger value="projects" className="whitespace-nowrap">
                <FolderGit2 className="h-4 w-4 mr-2" />
                Projects
              </TabsTrigger>
            </TabsList>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scrollTabs('right')}
            className="shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[900px] pr-2">
          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-3">
              <h3 className="font-semibold border-b pb-2">Basic Information</h3>
              <div className="py-1">
                <Label htmlFor="name">Full Name </Label>
                <Input
                  name="name"
                  placeholder="Full Name"
                  value={resumeData.basics.name}
                  onChange={(e) => updateBasics('name', e.target.value)}
                />
              </div>

              <div className="py-1">
                <Label htmlFor="title">Title </Label>
                <Input
                  name="title"
                  placeholder="Title"
                  value={resumeData.basics.label}
                  onChange={(e) => updateBasics('label', e.target.value)}
                />
              </div>

              <div className="py-1">
                <Label htmlFor="profileImageUrl">Profile Image URL </Label>
                <Input
                  name="profileImageUrl"
                  placeholder="Profile Image URL"
                  value={resumeData.basics.image ?? ''}
                  onChange={(e) => updateBasics('image', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="email">Email </Label>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={resumeData.basics.email}
                  onChange={(e) => updateBasics('email', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="phone">Phone </Label>
                <Input
                  name="phone"
                  placeholder="Phone"
                  type="tel"
                  value={resumeData.basics.phone}
                  onChange={(e) => updateBasics('phone', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="personalWebsite">Personal Website </Label>
                <Input
                  name="personalWebsite"
                  placeholder="Personal Website"
                  value={resumeData.basics.url ?? ''}
                  onChange={(e) => updateBasics('url', e.target.value)}
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h3 className="font-semibold border-b pb-2">Location</h3>
              <div className="py-1">
                <Label htmlFor="address">Address </Label>
                <Input
                  name="address"
                  placeholder="Address"
                  value={resumeData.basics.location.address ?? ''}
                  onChange={(e) => updateLocation('address', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="city">City </Label>
                <Input
                  name="city"
                  placeholder="City"
                  value={resumeData.basics.location.city}
                  onChange={(e) => updateLocation('city', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="state">State/Region </Label>
                <Input
                  name="state"
                  placeholder="State/Region"
                  value={resumeData.basics.location.region ?? ''}
                  onChange={(e) => updateLocation('region', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="postalCode">Postal Code </Label>
                <Input
                  name="postalCode"
                  placeholder="Postal Code"
                  value={resumeData.basics.location.postalCode ?? ''}
                  onChange={(e) => updateLocation('postalCode', e.target.value)}
                />
              </div>
            </div>

            {/* Profiles */}
            <div className="space-y-3">
              <h3 className="font-semibold border-b pb-2">Profile</h3>
              <div className="py-1">
                <Label htmlFor="linkedin">LinkedIn </Label>
                <Input
                  name="linkedin"
                  placeholder="LinkedIn"
                  value={resumeData.basics.linkedin ?? ''}
                  onChange={(e) => updateBasics('linkedin', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="twitter">Twitter </Label>
                <Input
                  name="twitter"
                  placeholder="Twitter"
                  value={resumeData.basics.twitter}
                  onChange={(e) => updateBasics('twitter', e.target.value)}
                />
              </div>
              <div className="py-1">
                <Label htmlFor="github">Github </Label>
                <Input
                  name="github"
                  placeholder="Github"
                  value={resumeData.basics.github ?? ''}
                  onChange={(e) => updateBasics('github', e.target.value)}
                />
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <h3 className="font-semibold border-b pb-2">Languages</h3>
              {resumeData.basics.languages.map((lang, idx) => (
                <div key={idx} className="border p-3 rounded-md mb-2 relative">
                  <div className="grid gap-2">
                    <div className="py-1">
                      <Label htmlFor="language">Language </Label>
                      <Input
                        name="language"
                        placeholder="Language"
                        value={lang.language}
                        onChange={(e) => {
                          const updated = [...resumeData.basics.languages]
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
                          const updated = [...resumeData.basics.languages]
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
                      const updated = [...resumeData.basics.languages]
                      updated.splice(idx, 1)
                      updateBasics('languages', updated)
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
                  const newLang = { language: '', fluency: '' }
                  updateBasics('languages', [
                    ...resumeData.basics.languages,
                    newLang,
                  ])
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Language
              </Button>
            </div>

            {/* Next button */}
            <div className="flex justify-end mt-6">
              <Button onClick={goToNextTab}>
                Next: Summary
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="space-y-3">
              <h3 className="border-b pb-2 font-semibold">
                Professional Summary
              </h3>
              <Textarea
                placeholder="Write a compelling professional summary that highlights your key strengths and career goals"
                value={resumeData.basics.summary}
                onChange={(e) => updateBasics('summary', e.target.value)}
                className="min-h-[200px]"
              />
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2"
                  onClick={() => updateBasics('summary', '')}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPrevTab}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Personal
              </Button>
              <Button onClick={goToNextTab}>
                Next: Experience
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="space-y-3">
              <h3 className="border-b pb-2 font-semibold">Work Experience</h3>
              {resumeData.work.map((job, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Company {idx + 1}</h5>
                  <div className="border p-3 rounded-md mb-2 relative">
                    <div className="grid gap-2">
                      <div className="py-1">
                        <Label htmlFor="companyName">Company Name </Label>
                        <Input
                          name="companyName"
                          placeholder="Company Name"
                          value={job.name}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].name = e.target.value
                            setResumeData({ ...resumeData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="position">Position </Label>
                        <Input
                          name="position"
                          placeholder="Position"
                          value={job.position}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].position = e.target.value
                            setResumeData({ ...resumeData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="companyUrl">Company URL </Label>
                        <Input
                          name="companyUrl"
                          placeholder="Company URL"
                          value={job.url ?? ''}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].url = e.target.value
                            setResumeData({ ...resumeData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="startDate">Start Date (YYYY-MM) </Label>
                        <Input
                          name="startDate"
                          placeholder="Start Date (YYYY-MM)"
                          value={job.startDate}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].startDate = e.target.value
                            setResumeData({ ...resumeData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="endDate">
                          End Date (YYYY-MM or blank){' '}
                        </Label>
                        <Input
                          name="endDate"
                          placeholder="End Date (YYYY-MM or blank)"
                          value={job.endDate ?? ''}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].endDate = e.target.value
                            setResumeData({ ...resumeData, work: updated })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="summary">Summary </Label>
                        <Textarea
                          name="summary"
                          placeholder="Summary"
                          value={job.summary}
                          onChange={(e) => {
                            const updated = [...resumeData.work]
                            updated[idx].summary = e.target.value
                            setResumeData({ ...resumeData, work: updated })
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
                              value={highlight}
                              onChange={(e) => {
                                const updated = [...resumeData.work]
                                updated[idx].highlights[hIdx] = e.target.value
                                setResumeData({
                                  ...resumeData,
                                  work: updated,
                                })
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                const updated = [...resumeData.work]
                                updated[idx].highlights.splice(hIdx, 1)
                                setResumeData({
                                  ...resumeData,
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
                            const updated = [...resumeData.work]
                            updated[idx].highlights.push('')
                            setResumeData({
                              ...resumeData,
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
                        const updated = [...resumeData.work]
                        updated.splice(idx, 1)
                        setResumeData({ ...resumeData, work: updated })
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
                  setResumeData({
                    ...resumeData,
                    work: [...resumeData.work, newWork],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
              </Button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPrevTab}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Summary
              </Button>
              <Button onClick={goToNextTab}>
                Next: Education
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <div className="space-y-3">
              <h3 className="border-b pb-2 font-semibold">Education</h3>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Education {idx + 1}</h5>
                  <div
                    key={idx}
                    className="border p-3 rounded-md mb-2 relative"
                  >
                    <div className="grid gap-2">
                      <div className="py-1">
                        <Label htmlFor="institution">Institution </Label>
                        <Input
                          name="institution"
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].institution = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="institutionUrl">Institution URL </Label>
                        <Input
                          name="institutionUrl"
                          placeholder="Institution URL"
                          value={edu.url ?? ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].url = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="area">Degree major </Label>
                        <Input
                          name="area"
                          placeholder="Degree major"
                          value={edu.area}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].area = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="degreeType">
                          Degree Type (e.g. Bachelor){' '}
                        </Label>
                        <Input
                          name="degreeType"
                          placeholder="Degree Type (e.g. Bachelor)"
                          value={edu.studyType}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].studyType = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="startDate">Start Date (YYYY-MM) </Label>
                        <Input
                          name="startDate"
                          placeholder="Start Date (YYYY-MM)"
                          value={edu.startDate}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].startDate = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="endDate">End Date (YYYY-MM) </Label>
                        <Input
                          name="endDate"
                          placeholder="End Date (YYYY-MM)"
                          value={edu.endDate ?? ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].endDate = e.target.value
                            setResumeData({
                              ...resumeData,
                              education: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="score">GPA </Label>
                        <Input
                          name="score"
                          placeholder="Score"
                          value={edu.score ?? ''}
                          onChange={(e) => {
                            const updated = [...resumeData.education]
                            updated[idx].score = e.target.value
                            setResumeData({
                              ...resumeData,
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
                        const updated = [...resumeData.education]
                        updated.splice(idx, 1)
                        setResumeData({
                          ...resumeData,
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
                  setResumeData({
                    ...resumeData,
                    education: [...resumeData.education, newEdu],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPrevTab}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Experience
              </Button>
              <Button onClick={goToNextTab}>
                Next: Skills
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="space-y-3">
              <h3 className="border-b pb-2 font-semibold">Skills</h3>
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="border p-3 rounded-md mb-2 relative">
                  <div className="grid gap-2">
                    <div className="py-1">
                      <Label htmlFor="skillName">Skill Name </Label>
                      <Input
                        name="skillName"
                        placeholder="Skill Name"
                        value={skill.name}
                        onChange={(e) => {
                          const updated = [...resumeData.skills]
                          updated[idx].name = e.target.value
                          setResumeData({
                            ...resumeData,
                            skills: updated,
                          })
                        }}
                      />
                    </div>
                    <div className="py-1">
                      <Label htmlFor="skillLevel">
                        Skill Level (optional){' '}
                      </Label>
                      <Input
                        name="skillLevel"
                        placeholder="Skill Level (optional)"
                        value={skill.level ?? ''}
                        onChange={(e) => {
                          const updated = [...resumeData.skills]
                          updated[idx].level = e.target.value
                          setResumeData({
                            ...resumeData,
                            skills: updated,
                          })
                        }}
                      />
                    </div>
                    {/* Keywords */}
                    <div className="py-1">
                      <Label htmlFor="keywords">
                        Keywords (comma-separated){' '}
                      </Label>
                      <Textarea
                        name="keywords"
                        placeholder="e.g. React, TypeScript, CSS"
                        value={skill.keywords.join(', ')}
                        onChange={(e) => {
                          const updated = [...resumeData.skills]
                          updated[idx].keywords = e.target.value
                            .split(',')
                            .map((kw) => kw.trim())
                          setResumeData({
                            ...resumeData,
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
                      const updated = [...resumeData.skills]
                      updated.splice(idx, 1)
                      setResumeData({
                        ...resumeData,
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
                  setResumeData({
                    ...resumeData,
                    skills: [...resumeData.skills, newSkill],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPrevTab}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Education
              </Button>
              <Button onClick={goToNextTab}>
                Next: Projects
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-3">
              <h3 className="border-b pb-2 font-semibold">Projects</h3>
              {(resumeData.projects ?? []).map((project, idx) => (
                <div key={idx} className="py-2">
                  <h5 className="pb-2">Project {idx + 1}</h5>
                  <div
                    key={idx}
                    className="border p-3 rounded-md mb-2 relative"
                  >
                    <div className="grid gap-2">
                      <div className="py-1">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          name="projectName"
                          placeholder="Project Name"
                          value={project.name}
                          onChange={(e) => {
                            const updated = [...(resumeData.projects ?? [])]
                            updated[idx].name = e.target.value
                            setResumeData({
                              ...resumeData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="projectUrl">Project URL</Label>
                        <Input
                          name="projectUrl"
                          placeholder="Project URL"
                          value={project.url ?? ''}
                          onChange={(e) => {
                            const updated = [...(resumeData.projects ?? [])]
                            updated[idx].url = e.target.value
                            setResumeData({
                              ...resumeData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      <div className="py-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          name="description"
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...(resumeData.projects ?? [])]
                            updated[idx].description = e.target.value
                            setResumeData({
                              ...resumeData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                      {/* Highlights */}
                      <div>
                        <div className="py-1">
                          <Label htmlFor="description">Highlights</Label>
                          {project.highlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex gap-2 mt-2">
                              <Input
                                value={highlight}
                                onChange={(e) => {
                                  const updated = [
                                    ...(resumeData.projects ?? []),
                                  ]
                                  updated[idx].highlights[hIdx] = e.target.value
                                  setResumeData({
                                    ...resumeData,
                                    projects: updated,
                                  })
                                }}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                onClick={() => {
                                  const updated = [
                                    ...(resumeData.projects ?? []),
                                  ]
                                  updated[idx].highlights.splice(hIdx, 1)
                                  setResumeData({
                                    ...resumeData,
                                    projects: updated,
                                  })
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="my-2"
                          onClick={() => {
                            const updated = [...(resumeData.projects ?? [])]
                            updated[idx].highlights.push('')
                            setResumeData({
                              ...resumeData,
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
                        <Label htmlFor="projectKeywords">
                          Keywords (comma-separated)
                        </Label>
                        <Textarea
                          placeholder="e.g. TypeScript, React, Open Source"
                          value={project.keywords.join(', ')}
                          onChange={(e) => {
                            const updated = [...(resumeData.projects ?? [])]
                            updated[idx].keywords = e.target.value
                              .split(',')
                              .map((kw) => kw.trim())
                            setResumeData({
                              ...resumeData,
                              projects: updated,
                            })
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => {
                        const updated = [...(resumeData.projects ?? [])]
                        updated.splice(idx, 1)
                        setResumeData({
                          ...resumeData,
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
                  setResumeData({
                    ...resumeData,
                    projects: [...(resumeData.projects ?? []), newProject],
                  })
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={goToPrevTab}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous: Skills
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab('personal')}
              >
                Back to Start
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default ResumeForm
