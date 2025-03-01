'use client'
import { ProfileData } from '@/src/types/profile'
import { Badge } from '../ui'
import {
  Linkedin,
  Github,
  Twitter,
  Globe,
  Phone,
  MapPin,
  Mail,
} from 'lucide-react'
import { formatYearMonth } from '@/src/lib/utils'
import Image from 'next/image'

interface RickOsborneTemplateProps {
  data: ProfileData
}

const RickOsborneTemplate = ({ data }: RickOsborneTemplateProps) => {
  return (
    <div className="bg-white text-gray-800 min-h-[297mm] w-full p-6 font-sans">
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="col-span-2">
          {/* Header */}
          <header className="mb-4">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">
                {data.basics.name}
              </h1>
              <p className="text-sm text-gray-600">{data.basics.label}</p>
            </div>
          </header>

          {/* Summary */}
          {data.basics.summary && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Summary
              </h2>
              <p className="text-xs text-gray-700 whitespace-pre-line">
                {data.basics.summary}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {data.work.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Experience
              </h2>
              <div className="space-y-3">
                {data.work.map((work, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-900">
                          {work.position}
                        </h3>
                        <div className="text-xs text-gray-700">
                          {work.url ? (
                            <a
                              href={work.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline"
                            >
                              {work.name}
                            </a>
                          ) : (
                            work.name
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">
                        {formatYearMonth(work.startDate)} -{' '}
                        {work.endDate
                          ? formatYearMonth(work.endDate)
                          : 'Present'}
                      </div>
                    </div>
                    {work.summary && (
                      <p className="text-xs text-gray-700 mb-1">
                        {work.summary}
                      </p>
                    )}
                    {work.highlights.length > 0 && (
                      <ul className="list-disc list-outside text-xs text-gray-700 pl-4 space-y-0.5">
                        {work.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project, index) => (
                  <div key={index} className="mb-3">
                    <h3 className="text-xs font-semibold text-gray-900">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:underline"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="text-xs text-gray-700 mb-1">
                      {project.description}
                    </p>
                    {project.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-1">
                        {project.keywords.map((keyword, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="border-gray-300 text-gray-700 text-xs px-1 py-0 h-auto"
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {project.highlights.length > 0 && (
                      <ul className="list-disc list-outside text-xs text-gray-700 pl-4 space-y-0.5">
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-1 uppercase">
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-900">
                          {edu.institution}
                        </h3>
                        <p className="text-xs text-gray-700">
                          {edu.studyType} in {edu.area}
                        </p>
                        {edu.score && (
                          <p className="text-xs text-gray-600">
                            GPA: {edu.score}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 whitespace-nowrap">
                        {formatYearMonth(edu.startDate)} -{' '}
                        {edu.endDate ? formatYearMonth(edu.endDate) : 'Present'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (1/3) */}
        <div className="col-span-1">
          {/* Profile Image */}
          <section className="mb-6 flex flex-col items-center">
            {data.basics.image && (
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={data.basics.image}
                  alt={`${data.basics.name}'s profile`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
          </section>
          {/* Contact Information */}
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase">
              Contact
            </h2>
            <div className="space-y-2 text-xs">
              {data.basics.location.city && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1 text-gray-600" />
                  <span>{data.basics.location.city}</span>
                </div>
              )}
              {data.basics.email && (
                <div className="flex items-center">
                  <Mail className="w-3 h-3 mr-1 text-gray-600" />
                  <a
                    href={`mailto:${data.basics.email}`}
                    className="text-blue-700 hover:underline"
                  >
                    {data.basics.email}
                  </a>
                </div>
              )}
              {data.basics.phone && (
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1 text-gray-600" />
                  <span>{data.basics.phone}</span>
                </div>
              )}
              {data.basics.url && (
                <div className="flex items-center">
                  <Globe className="w-3 h-3 mr-1 text-gray-600" />
                  <a
                    href={data.basics.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    {data.basics.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Profiles */}
          {(data.basics.twitter ||
            data.basics.linkedin ||
            data.basics.github) && (
            <section className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase">
                Profiles
              </h2>
              <div className="space-y-2 text-xs">
                {data.basics.linkedin && (
                  <div className="flex items-center">
                    <Linkedin className="w-3 h-3 mr-1 text-gray-600" />
                    <a
                      href={data.basics.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {data.basics.twitter && (
                  <div className="flex items-center">
                    <Twitter className="w-3 h-3 mr-1 text-gray-600" />
                    <a
                      href={data.basics.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Twitter
                    </a>
                  </div>
                )}
                {data.basics.github && (
                  <div className="flex items-center">
                    <Github className="w-3 h-3 mr-1 text-gray-600" />
                    <a
                      href={data.basics.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      Github
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <section className="mb-4">
              <h2 className="text-sm font-bold text-gray-900 mb-2 uppercase">
                Skills
              </h2>
              <div className="space-y-3">
                {data.skills.map((skillGroup, index) => (
                  <div key={index} className="mb-2">
                    <h3 className="text-xs font-semibold text-gray-800">
                      {skillGroup.name}:
                    </h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {skillGroup.keywords.map((keyword, i) => (
                        <Badge
                          key={i}
                          className="bg-gray-100 text-gray-800 hover:bg-gray-200 font-normal text-xs px-1 py-0 h-auto"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default RickOsborneTemplate
