'use client'

import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link as PDFLink,
} from '@react-pdf/renderer'
import { ProfileData } from '@/src/types/profile'
import { formatYearMonth, removeProtocal } from '@/src/lib/utils'

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  nameRow: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  textRow: {
    fontSize: 9,
    color: '#555',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#555',
    marginVertical: 2,
  },
  contactItem: {
    marginRight: 8,
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    gap: 4,
  },
  socialItem: {
    marginRight: 8,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  section: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    borderTopStyle: 'dashed',
    flexDirection: 'row',
    // "gap-10" with two sub-Views: a small column for heading, a large column for content
  },
  sectionTitleColumn: {
    width: '20%',
    paddingRight: 8,
  },
  sectionContentColumn: {
    width: '80%',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
    color: '#333',
    lineHeight: 1.4,
  },
  listItem: {
    marginBottom: 2,
  },
  boldText: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 8,
    color: '#777',
  },
  highlightList: {
    marginTop: 2,
  },
  highlightItem: {
    marginVertical: 2,
  },
  projectTechnology: {
    marginVertical: 4,
  },
})

type OnePagePlusDocumentProps = {
  data: ProfileData
}

export default function OnePagePlusDocument({
  data,
}: OnePagePlusDocumentProps) {
  // Build array of social items, each item is a <Text> with label + clickable link
  const socialItems: React.ReactNode[] = []

  if (data.basics.linkedin) {
    socialItems.push(
      <Text key="linkedin">
        LinkedIn:{' '}
        <PDFLink src={data.basics.linkedin} style={{ color: '#00a6ed' }}>
          <Text>{removeProtocal(data.basics.linkedin)}</Text>
        </PDFLink>
      </Text>
    )
  }

  if (data.basics.twitter) {
    socialItems.push(
      <Text key="twitter">
        Twitter:{' '}
        <PDFLink src={data.basics.twitter} style={{ color: '#00a6ed' }}>
          <Text>{removeProtocal(data.basics.twitter)}</Text>
        </PDFLink>
      </Text>
    )
  }
  console.log(data.basics.image)
  if (data.basics.github) {
    socialItems.push(
      <Text key="github">
        Github:{' '}
        <PDFLink
          src={data.basics.github}
          style={{
            color: '#00a6ed',
            textDecoration: 'underline',
          }}
        >
          <Text>{removeProtocal(data.basics.github)}</Text>
        </PDFLink>
      </Text>
    )
  }

  // Interleave social items with " | "
  const socialLine = socialItems.reduce<React.ReactNode[]>((acc, item, idx) => {
    if (idx > 0) {
      acc.push(<Text key={`divider-${idx}`}>|</Text>)
    }
    acc.push(item)
    return acc
  }, [])

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            {/* Name / Label */}
            <Text style={styles.nameRow}>
              {data.basics.name}, {data.basics.label}
            </Text>

            {/* Contact Line */}
            <View style={styles.contactRow}>
              <Text style={styles.textRow}>
                {data.basics.email ? data.basics.email : ''}
                {data.basics.email && data.basics.phone ? '  |  ' : ''}
                {data.basics.phone ? data.basics.phone : ''}
                {data.basics.phone && data.basics.location.city ? '  |  ' : ''}
                {data.basics.location.city ? data.basics.location.city : ''}
                {data.basics.url ? '  |  ' : ''}
                {data.basics.url && (
                  <PDFLink
                    src={data.basics.url}
                    style={{ color: '#00a6ed', textDecoration: 'underline' }}
                  >
                    <Text>
                      {data.basics.url.replace(/^https?:\/\/(www\.)?/, '')}
                    </Text>
                  </PDFLink>
                )}
              </Text>
            </View>
            {/* Social Line */}
            {socialLine.length > 0 && (
              <View style={styles.socialRow}>{socialLine}</View>
            )}
          </View>
          {/* Profile Image */}
          {data.basics.image && (
            <Image style={styles.profileImage} src={data.basics.image} />
          )}
        </View>

        {/* SUMMARY */}
        {data.basics.summary && (
          <View style={styles.section}>
            <View style={styles.sectionTitleColumn}>
              <Text style={styles.sectionHeader}>Summary</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              <Text style={styles.text}>{data.basics.summary}</Text>
            </View>
          </View>
        )}

        {/* SKILLS */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleColumn}>
              <Text style={styles.sectionHeader}>Skills</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              {data.skills.map((skillGroup, index) => (
                <Text key={index} style={[styles.text]}>
                  <Text style={styles.boldText}>{skillGroup.name}:</Text>{' '}
                  {skillGroup.keywords.join(' / ')}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* EXPERIENCE */}
        {data.work.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleColumn}>
              <Text style={styles.sectionHeader}>Experience</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              {data.work.map((work, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  {/* Position & Company */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={[styles.text, styles.boldText]}>
                      {work.position}{' '}
                      <Text style={{ fontWeight: 'normal' }}>
                        | {work.name}
                      </Text>
                    </Text>
                    <Text style={styles.smallText}>
                      {formatYearMonth(work.startDate)} -{' '}
                      {work.endDate ? formatYearMonth(work.endDate) : 'Present'}
                    </Text>
                  </View>
                  {/* Summary */}
                  {work.summary && (
                    <Text style={[styles.text, styles.highlightList]}>
                      {work.summary}
                    </Text>
                  )}
                  {/* Highlights */}
                  {work.highlights.length > 0 && (
                    <View style={styles.highlightList}>
                      {work.highlights.map((highlight, i) => (
                        <Text key={i} style={styles.highlightItem}>
                          • {highlight}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PROJECTS */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleColumn}>
              <Text style={styles.sectionHeader}>Projects</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              {data.projects.map((project, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <Text style={[styles.text, styles.boldText]}>
                    {project.url ? (
                      <PDFLink
                        src={project.url}
                        style={{
                          color: '#00a6ed',
                        }}
                      >
                        <Text>{project.name}</Text>
                      </PDFLink>
                    ) : (
                      project.name
                    )}
                  </Text>
                  <Text style={styles.text}>{project.description}</Text>
                  {project.keywords.length > 0 && (
                    <Text style={[styles.text, styles.projectTechnology]}>
                      Technology: {project.keywords.join(' / ')}
                    </Text>
                  )}
                  {project.highlights.length > 0 && (
                    <View style={styles.highlightList}>
                      {project.highlights.map((highlight, i) => (
                        <Text key={i} style={styles.highlightItem}>
                          • {highlight}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleColumn}>
              <Text style={styles.sectionHeader}>Education</Text>
            </View>
            <View style={styles.sectionContentColumn}>
              {data.education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 8 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={[styles.text, styles.boldText]}>
                      {edu.institution}
                    </Text>
                    <Text style={styles.smallText}>
                      {formatYearMonth(edu.startDate)} -{' '}
                      {edu.endDate ? formatYearMonth(edu.endDate) : 'Present'}
                    </Text>
                  </View>
                  <Text style={styles.text}>
                    {edu.studyType} in {edu.area}
                  </Text>
                  {edu.score && (
                    <Text style={styles.text}>GPA: {edu.score}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  )
}
