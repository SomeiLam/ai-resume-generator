import { ProfileData } from './types/profile'

export const sampleResumeData: ProfileData = {
  basics: {
    name: 'Jane Smith',
    label: 'Software Engineer',
    email: 'jane.smith@example.com',
    phone: '(123) 456-7890',
    url: 'https://janesmith.dev',
    image:
      'https://xymnfxiolhlgmobjmhsg.supabase.co/storage/v1/object/public/images/project-images/1f7d8ddf-fa21-4ae5-8d25-4d3993e1edd7-1740799455262.jpg',
    summary:
      'Jane Smith is a highly motivated and detail-oriented software engineer with over 7 years of professional experience in full-stack development. She has a proven track record of designing and implementing scalable web applications, and is passionate about continuous learning and leveraging the latest technologies to solve complex problems. Her expertise spans frontend, backend, and DevOps, and she is dedicated to writing clean, maintainable code that delivers high performance and robust security.',
    location: {
      city: 'New York',
      region: 'NY',
    },
    github: 'https://github.com/janesmith',
    twitter: 'https://twitter.com/janesmith',
    linkedin: 'https://linkedin.com/in/jane-smith',
    languages: [
      {
        language: 'English',
        fluency: 'Native',
      },
      {
        language: 'Spanish',
        fluency: 'Professional',
      },
    ],
  },
  work: [
    {
      name: 'ACME Corp',
      position: 'Software Engineer',
      startDate: '2021-01',
      summary:
        'Developing and maintaining microservices for internal platforms.',
      highlights: [
        'Reduced API response times by 40%',
        'Collaborated with cross-functional teams on new product features',
        'Implemented automated testing and CI/CD pipelines',
      ],
    },
    {
      name: 'Startup Labs',
      position: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2020-12',
      summary:
        'Built and optimized full-stack solutions for multiple client projects.',
      highlights: [
        'Designed and deployed RESTful APIs using Node.js',
        'Implemented front-end using React and TypeScript',
        'Improved user experience by streamlining UI components',
      ],
    },
    {
      name: 'Tech Innovations',
      position: 'Lead Developer',
      startDate: '2020-02',
      summary:
        'Leading a team in designing scalable architectures for cloud-based applications.',
      highlights: [
        'Managed a team of 8 developers',
        'Delivered projects under budget',
        'Integrated modern technologies such as GraphQL, Docker, and Kubernetes for improved performance',
      ],
    },
  ],
  education: [
    {
      institution: 'State University',
      area: 'Computer Science',
      studyType: 'Bachelor',
      startDate: '2014-09',
      endDate: '2018-06',
      score: '3.9',
    },
  ],
  skills: [
    {
      name: 'Frontend',
      keywords: [
        'React',
        'TypeScript',
        'HTML',
        'CSS',
        'JavaScript',
        'Redux',
        'TailwindCSS',
        'Sass',
      ],
    },
    {
      name: 'Backend',
      keywords: [
        'Node.js',
        'Express',
        'MongoDB',
        'REST APIs',
        'PostgreSQL',
        'GraphQL',
        'Python',
        'Django',
      ],
    },
    {
      name: 'DevOps',
      keywords: [
        'Docker',
        'Kubernetes',
        'AWS',
        'CI/CD',
        'Linux',
        'Jenkins',
        'Terraform',
      ],
    },
  ],
  projects: [
    {
      name: 'Personal Blog',
      description:
        'A blog built with Next.js and TypeScript, deployed on Vercel. It features dynamic routing, SEO optimization, and Markdown integration for content management.',
      highlights: [
        'Implemented dynamic routing with Next.js',
        'Used TypeScript for type safety',
        'Integrated Markdown for content management',
      ],
      keywords: ['Next.js', 'React', 'TypeScript'],
      url: 'https://github.com/janesmith/personal-blog',
    },
    {
      name: 'E-Commerce Platform',
      description:
        'An online marketplace built with the MERN stack that supports user authentication, product listing, and secure payment integration.',
      highlights: [
        'Implemented secure user authentication',
        'Integrated payment gateway for transactions',
        'Optimized product search functionality',
      ],
      keywords: ['MongoDB', 'Express', 'React', 'Node.js'],
      url: 'https://github.com/janesmith/ecommerce-platform',
    },
    {
      name: 'Data Analytics Dashboard',
      description:
        'A dashboard application for visualizing real-time data insights using D3.js and React, enabling users to interact with complex datasets.',
      highlights: [
        'Built interactive charts with D3.js',
        'Integrated real-time data updates',
        'Implemented responsive design for multiple devices',
      ],
      keywords: ['D3.js', 'React', 'Data Visualization'],
      url: 'https://github.com/janesmith/data-analytics-dashboard',
    },
  ],
}
