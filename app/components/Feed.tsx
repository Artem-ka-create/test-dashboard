import Image from 'next/image'
import React from 'react'

const Feed = () => {
  return (
    <div className="relative">
      <Image
        className="relative"
        src={"wave.svg"}
        alt="wave"
        height={1000}
        width={1000}
      />

      {/* Nested image */}
      <Image
        className="absolute top-20 left-1/2 transform -translate-x-1/2" // Adjust these values for positioning
        src={"telekom.svg"}
        alt="Tlogo"
        height={140}
        width={140}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-center">
        <h1 style={{
          fontSize: "70px !important",}} className="text-8xl font-bold bg-gradient-to-r from-[#e20074] to-[#ff5e99] text-transparent bg-clip-text">
          LLM Penetration Testing Tool
        </h1>
      </div>
    </div>
  )
}

export default Feed