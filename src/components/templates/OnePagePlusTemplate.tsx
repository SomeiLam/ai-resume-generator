import { ProfileData } from '@/src/types/profile'
import React from 'react'
import { formatYearMonth, removeProtocal } from '@/src/lib/utils'
import Image from 'next/image'

type ResumeProps = {
  data: ProfileData
}

const OnePagePlusTemplate: React.FC<ResumeProps> = ({ data }) => {
  return (
    <div className="bg-white text-gray-800 min-h-[297mm] w-full p-8 font-sans">
      {/* Header */}
      <header className="mb-3 flex flex-row justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-xl text-gray-900 mb-1">
            {data.basics.name}, {data.basics.label}
          </h1>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mb-1 divide-x divide-gray-300">
            {data.basics.email && (
              <a
                href={`mailto:${data.basics.email}`}
                className="text-blue-600 hover:underline"
              >
                {data.basics.email}
              </a>
            )}
            {data.basics.phone && (
              <span className="pl-2">{data.basics.phone}</span>
            )}
            {data.basics.location.city && (
              <span className="pl-2">{data.basics.location.city}</span>
            )}
            {data.basics.url && (
              <a
                href={data.basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-2 text-blue-600 hover:underline"
              >
                {data.basics.url.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {data.basics.linkedin && (
              <div className="flex flex-row items-center gap-1">
                LinkedIn:
                <a
                  href={data.basics.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {removeProtocal(data.basics.linkedin)}
                </a>
              </div>
            )}
            {data.basics.twitter && (
              <div className="flex flex-row items-center gap-1">
                Twitter:
                <a
                  href={data.basics.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {removeProtocal(data.basics.twitter)}
                </a>
              </div>
            )}
            {data.basics.github && (
              <div className="flex flex-row items-center gap-1">
                Github:
                <a
                  href={data.basics.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {removeProtocal(data.basics.github)}
                </a>
              </div>
            )}
          </div>
        </div>
        {/* Profile Image */}
        <section className="-mt-4 flex flex-col items-center">
          {data.basics.image && (
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={data.basics.image}
                alt={`${data.basics.name}'s profile`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </section>
      </header>

      {/* Summary */}
      {data.basics.summary && (
        <section className="mb-3 pt-2 border-t-2 border-dashed border-gray-300 grid grid-cols-7 gap-10">
          <h2 className="text-sm text-gray-900 mb-2 uppercase">Summary</h2>
          <p className="text-gray-700 whitespace-pre-line text-xs col-span-6">
            {data.basics.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-3 pt-2 border-t-2 border-dashed border-gray-300 grid grid-cols-7 gap-10">
          <h2 className="text-sm text-gray-900 mb-2 uppercase">Skills</h2>
          <div className="space-y-2 col-span-6">
            {data.skills.map((skillGroup, index) => (
              <div
                key={index}
                className="mb-2 flex flex-row items-center gap-2"
              >
                <h3 className="font-semibold text-gray-800 text-xs">
                  {skillGroup.name}:
                </h3>
                <p className="text-xs">{skillGroup.keywords.join(' / ')}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {data.work.length > 0 && (
        <section className="mb-3 pt-2 border-t-2 border-dashed border-gray-300 grid grid-cols-7 gap-10">
          <h2 className="text-sm text-gray-900 mb-2 uppercase">Experience</h2>
          <div className="space-y-4 col-span-6">
            {data.work.map((work, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="divide-x gap-2 divide-gray-300 flex flex-row">
                    <h3 className="font-semibold text-gray-900 text-xs">
                      {work.position}
                    </h3>
                    <div className="text-gray-700 text-xs pl-2">
                      {work.url ? (
                        <a
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
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
                    {work.endDate ? formatYearMonth(work.endDate) : 'Present'}
                  </div>
                </div>
                {work.summary && (
                  <p className="text-gray-700 mb-2 text-xs">{work.summary}</p>
                )}
                {work.highlights.length > 0 && (
                  <ul className="list-disc list-outside text-gray-700 pl-5 space-y-1 text-xs">
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
        <section className="mb-3 pt-2 border-t-2 border-dashed border-gray-300 grid grid-cols-7 gap-10">
          <h2 className="text-sm text-gray-900 mb-2 uppercase">Projects</h2>
          <div className="space-y-4 col-span-6">
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-900 text-xs">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <p className="text-gray-700 mb-2 text-xs">
                  {project.description}
                </p>
                {project.keywords.length > 0 && (
                  <div className="flex flex-row gap-2 mb-2">
                    <span className="text-gray-900 text-xs">Technology:</span>

                    <p className="text-xs">{project.keywords.join(' / ')}</p>
                  </div>
                )}
                {project.highlights.length > 0 && (
                  <ul className="list-disc list-outside text-gray-700 pl-5 space-y-1 text-xs">
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
        <section className="mb-3 pt-2 border-t-2 border-dashed border-gray-300 grid grid-cols-7 gap-10">
          <h2 className="text-sm text-gray-900 mb-2 uppercase">Education</h2>
          <div className="space-y-4 col-span-6">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs">
                      {edu.institution}
                    </h3>
                    <p className="text-gray-700 text-xs">
                      {edu.studyType} in {edu.area}
                    </p>
                    {edu.score && (
                      <p className="text-gray-600 text-xs">GPA: {edu.score}</p>
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
  )
}

export default OnePagePlusTemplate
