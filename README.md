# AI Resume Generator

## **Description:**

AI Resume Generator is an innovative web application that leverages AI technology to generate personalized cover letters based on your resume and job descriptions. Users can choose from multiple resume templates to customize the look of their resume, manage all their job applications (including resumes, cover letters, and job descriptions), and receive AI-powered feedback on the match between their resume and job requirements, along with suggestions for interview preparation and skill improvements.

## Overview

The AI Resume Generator streamlines the job application process by automating cover letter creation and providing actionable insights. Using cutting-edge AI, the app generates cover letters by combining your resume content with a given job description. It also evaluates how well your resume fits the job, scores the match, and offers personalized recommendations to enhance your skills and prepare for interviews.

## Features

- **AI-Powered Cover Letter Generation:**  
  Automatically generate a compelling cover letter using your resume content and a job description.

- **Customizable Resume Templates:**  
  Select from a variety of resume templates to quickly change the design and format of your resume.

- **Job Application Management:**  
  Organize all your job applications in one place, saving resumes, cover letters, and job descriptions for easy tracking.

- **Match Analysis & Interview Preparation:**  
  Receive AI-powered suggestions on whether your resume is a good fit for a job, along with a compatibility score and tailored interview preparation tips.

- **Profile Settings:**  
  Easily update your profile information (including uploading a profile image via Firebase Storage) and manage your professional details.

## Architecture

The application is built with:

- **Next.js** for server-side rendering and routing.
- **React** for building dynamic user interfaces.
- **Tailwind CSS** for rapid, responsive UI development.
- **Firebase:**
  - **Authentication:** for secure sign-in/sign-up.
  - **Firestore:** for data storage (profiles, resumes, job applications).
  - **Firebase Storage:** for managing profile image uploads.
- **AI Integration:** Custom AI services (e.g., via Google Gemini API) to generate cover letters and provide resume-job matching insights.

## Installation

#### 1. **Clone the Repository:**

```bash
git clone https://github.com/yourusername/ai-resume-generator.git
cd ai-resume-generator
```

#### 2. **Install Dependencies:**

```bash
npm install
# or
yarn install
```

#### 3. **Configure Environment Variables:**

Create a `.env.local` file in the root directory and add your Firebase and AI service configurations:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
AI_API_KEY=your_ai_service_key
```

#### 4. **Run the Development Server:**

```bash
npm run dev
# or
yarn dev
```

#### 5. **Open the App:**

Navigate to http://localhost:3000 in your browser.

## Usage

#### 1. **Sign In / Sign Up:**

New users are directed to the profile page upon account creation, where they can enter their professional information. Existing users can sign in using email/password or Google authentication.

#### 2. **Profile & Resume Editing:**

Update your profile and resume content through a user-friendly, tabbed interface. Change the resume template with a single click to instantly alter the design.

#### 3. **Cover Letter Generation:**

Provide your resume and a job description to generate a personalized cover letter using AI.

#### 4. **Job Application Management:**

Organize your job applications in one place, with each application including your resume, cover letter, and job description. Receive an AI-driven fit score and interview preparation suggestions.
