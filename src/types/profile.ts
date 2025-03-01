export interface ProfileData {
  basics: {
    name: string
    label: string
    image?: string
    email: string
    phone: string
    url?: string
    twitter?: string
    linkedin?: string
    github?: string
    summary: string
    location: {
      address?: string
      postalCode?: string
      city: string
      region?: string
    }
    languages: Array<{
      language: string
      fluency: string
    }>
  }
  work: Array<{
    name: string
    position: string
    url?: string
    startDate: string
    endDate?: string
    summary: string
    highlights: string[]
  }>
  education: Array<{
    institution: string
    url?: string
    area: string
    studyType: string
    startDate: string
    endDate?: string
    score?: string
    courses?: string[]
  }>
  skills: Array<{
    name: string
    level?: string
    keywords: string[]
  }>
  projects?: Array<{
    name: string
    description: string
    highlights: string[]
    keywords: string[]
    url?: string
  }>
}
