import FeatureAssistants from '@/components/dashboard/FeatureAssistants'
import Feedback from '@/components/dashboard/Feedback'
import History from '@/components/dashboard/History'
import React from 'react'

function page() {
  return (
    <div className='bg-gradient-to-br from-blue-900 to-indigo-900 min-h-screen'>
      <FeatureAssistants />
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        <Feedback />
        <History />
      </div>
    </div>
  )
}

export default page
