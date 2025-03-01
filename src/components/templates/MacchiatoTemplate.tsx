'use client'
import { ProfileData } from '@/src/types/profile'
import { Badge, Separator } from '../ui'
import {
  Earth,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import { formatYearMonth, removeProtocal } from '@/src/lib/utils'
import Image from 'next/image'

interface MacchiatoTemplateProps {
  data: ProfileData
}

const MacchiatoTemplate = ({ data }: MacchiatoTemplateProps) => {
  return (
    <div className="bg-white w-[700px] min-h-[297mm] p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-[#545454]">
          {data.basics.name}
        </h1>
        <p className="text-[#00a6ed]">{data.basics.label}</p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-3 space-y-8">
          <div className="flex flex-col items-start gap-2">
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
            <h5 className="text-gray-600">
              About
              <Separator className="bg-gray-500 w-[60px]" />
            </h5>
            <p className="text-gray-900 flex flex-row text-xs items-center gap-1">
              <MapPin size="14px" />
              <span className="break-words whitespace-normal w-[130px]">
                {data.basics.location.city}
              </span>
            </p>
            <a
              href={`mailto:${data.basics.email}`}
              className="flex flex-row text-xs items-center gap-1 text-[#00a6ed] hover:text-[#0086c3] "
            >
              <Mail size="14px" />
              <span className="break-words whitespace-normal w-[130px]">
                {data.basics.email}
              </span>
            </a>
            <p className="text-gray-900 flex flex-row text-xs items-center gap-1">
              <Phone size="14px" />
              {data.basics.phone}
            </p>
          </div>

          {(data.basics.twitter ||
            data.basics.linkedin ||
            data.basics.github) && (
            <div className="flex flex-col items-start gap-2">
              <h5 className=" text-gray-600">
                Profiles
                <Separator className="bg-gray-500 w-[60px]" />
              </h5>
              {data.basics.url && (
                <a
                  href={data.basics.url}
                  className="flex flex-row text-xs items-center gap-1 text-[#00a6ed] hover:text-[#0086c3] "
                >
                  <Earth size="14px" />
                  <span className="break-words whitespace-normal w-[130px]">
                    {removeProtocal(data.basics.url)}
                  </span>
                </a>
              )}
              {data.basics.twitter && (
                <a
                  href={data.basics.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row text-xs items-center gap-1 text-[#00a6ed] hover:text-[#0086c3]"
                >
                  <Twitter size="14px" />
                  <span className="break-words whitespace-normal w-[130px]">
                    {removeProtocal(data.basics.twitter)}
                  </span>
                </a>
              )}
              {data.basics.github && (
                <a
                  href={data.basics.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row text-xs items-center gap-1 text-[#00a6ed] hover:text-[#0086c3]"
                >
                  <Github size="14px" />
                  <span className="break-words whitespace-normal w-[130px]">
                    {removeProtocal(data.basics.github)}
                  </span>
                </a>
              )}
              {data.basics.linkedin && (
                <a
                  href={data.basics.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row text-sm items-center gap-1 text-[#00a6ed] hover:text-[#0086c3]"
                >
                  <Linkedin size="16px" />
                  <span className="break-words whitespace-normal w-[130px]">
                    {removeProtocal(data.basics.linkedin)}
                  </span>
                </a>
              )}
            </div>
          )}

          <div className="flex flex-col items-start gap-5">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="flex flex-col items-start gap-2">
                <h6 className="text-gray-600">
                  {skillGroup.name}
                  <Separator className="bg-gray-500 w-[60px]" />
                </h6>
                <div className="flex flex-wrap gap-1">
                  {skillGroup.keywords.map((keyword, i) => (
                    <Badge
                      key={i}
                      className="px-1 text-[10px] bg-[#e1ebfc] text-[#2b2b2b] font-normal hover:bg-[#4d4d4d] border-none"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start gap-2">
            <h6 className=" text-gray-600">
              Languages
              <Separator className="bg-gray-500 w-[60px]" />
            </h6>
            {data.basics.languages?.map((language, index) => (
              <div key={index} className="flex flex-row gap-1 items-center">
                <p className="text-gray-900 text-xs">{language.language}</p>
                <p className="text-gray-500 text-xs italic">
                  ({language.fluency})
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-9 space-y-8">
          {data.basics.summary && (
            <section className="space-y-2 flex flex-col items-start gap-1">
              <h5 className="border-gray-500 text-gray-600">
                Summary
                <Separator className="bg-gray-500 w-[60px]" />
              </h5>
              <p className="text-gray-900 text-xs whitespace-pre-line leading-relaxed">
                {data.basics.summary}
              </p>
            </section>
          )}

          <section className="space-y-2 flex flex-col items-start gap-1">
            <h5 className="text-gray-600">
              Experience
              <Separator className="bg-gray-500 w-[60px]" />
            </h5>
            <div className="flex flex-col gap-6 w-full">
              {data.work.map((work, index) => (
                <div key={index} className="space-y-2 w-full">
                  <div className="flex w-full justify-between items-start">
                    <div className="flex flex-row gap-1 items-center">
                      <h3 className="text-gray-700 text-sm">
                        {work.position} -{' '}
                      </h3>
                      <span className="text-[#00a6ed] text-sm">
                        {work.url ? (
                          <a
                            href={work.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#0086c3]"
                          >
                            {work.name}
                          </a>
                        ) : (
                          work.name
                        )}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {formatYearMonth(work.startDate)} -{' '}
                      {work.endDate ? formatYearMonth(work.endDate) : 'Present'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">{work.summary}</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    {work.highlights.map((highlight, i) => (
                      <li key={i} className="leading-relaxed text-xs">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {data.projects && data.projects.length > 0 && (
            <section className="space-y-2 flex flex-col items-start gap-1">
              <h5 className="text-gray-600">
                Projects
                <Separator className="bg-gray-500 w-[60px]" />
              </h5>
              <div className="flex flex-col gap-6 w-full">
                {data.projects.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-[#c5c5c5] text-sm">
                      {project.url ? (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00a6ed] hover:text-[#0086c3]"
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 my-2">
                      {project.keywords.map((keyword, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[10px] px-1 bg-[#e1ebfc] text-[#2b2b2b] font-normal hover:bg-[#4d4d4d] border-none"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <ul className="list-disc list-inside text-gray-600 text-xs space-y-1 ml-4">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="leading-relaxed">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="space-y-2 flex flex-col items-start gap-1">
            <h5 className="text-gray-600">
              Education
              <Separator className="bg-gray-500 w-[60px]" />
            </h5>
            <div className="flex flex-col gap-6 w-full">
              {data.education.map((edu, index) => (
                <div key={index} className="w-full">
                  <div className="flex w-full justify-between items-start">
                    <div className="flex flex-row gap-1 items-center">
                      <h3 className="text-gray-700 text-sm">
                        <span className="text-[#00a6ed] text-sm">
                          {edu.url ? (
                            <a
                              href={edu.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-[#0086c3]"
                            >
                              {edu.institution}
                            </a>
                          ) : (
                            edu.institution
                          )}
                        </span>
                      </h3>
                    </div>
                    <div className="text-gray-400 text-xs">
                      {formatYearMonth(edu.startDate)} -{' '}
                      {edu.endDate ? formatYearMonth(edu.endDate) : 'Present'}
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">
                    {edu.studyType} in {edu.area}{' '}
                    {edu.score && `- GPA: ${edu.score}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default MacchiatoTemplate
