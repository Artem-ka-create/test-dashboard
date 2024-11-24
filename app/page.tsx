
import React from 'react'
import Feed from './components/Feed'

const Home = () => {
  return (
    <section className="w-full flex justify-center items-center flex-col">

      <h1 className='text-center'>
        Discover and Share
        <br className='max-md:hidden' />
        <span >AI prompts</span>
      </h1>
      <p className='desc'> Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Optio iste possimus, quas sit molestias incidunt eaque repellendus culpa natus
      </p>

      <image src='wave.svg' />
      <Feed />
    </section>
  )
}



export default Home
