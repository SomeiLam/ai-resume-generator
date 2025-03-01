import React from 'react'
import { Card, Button } from '../ui'

const CoverLetterTab = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <textarea
          className="w-full h-64 p-4 border rounded-lg resize-none"
          placeholder="Paste the job description here..."
        ></textarea>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="w-full">
            Reset
          </Button>
          <Button className="w-full">Generate</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Cover Letter</h2>
        <div className="aspect-[1/1.4] bg-white border rounded-lg p-6">
          {/* Generated cover letter will appear here */}
        </div>
      </Card>
    </div>
  )
}

export default CoverLetterTab
