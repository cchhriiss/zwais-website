'use client'
import { useState } from 'react'

const services = [
  { title: "Chatbots & AI Integration", description: "Custom-trained bots for lead gen, support & automation." },
  { title: "Web Development", description: "Modern, responsive websites tailored to your brand." },
  { title: "Brand Strategy", description: "Data-driven strategies to elevate your business." }
]

export default function ServiceSlider() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0) // 1 = right, -1 = left
  const [animating, setAnimating] = useState(false)

  const changeSlide = (dir) => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)

    setTimeout(() => {
      setIndex((prev) => (prev + dir + services.length) % services.length)
      setAnimating(false)
    }, 500)
  }

  const nextIndex = (index + direction + services.length) % services.length

  return (
    <section className="relative w-screen overflow-hidden h-screen bg-white text-black flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">

        {/* Current Slide */}
        <div
          className="absolute w-full flex justify-center px-8 transition-transform duration-500"
          style={{
            transform: animating
              ? `translateX(${direction * 100}%)` // Outgoing goes in clicked direction
              : 'translateX(0%)'
          }}
        >
          <div className="max-w-2xl text-center">
            <h3 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
              {services[index].title}
            </h3>
            <p className="text-lg">{services[index].description}</p>
          </div>
        </div>

        {/* Incoming Slide */}
        {animating && (
          <div
            className="absolute w-full flex justify-center px-8 transition-transform duration-500"
            style={{
              transform: animating
                ? `translateX(${-direction * 100}%)` // Incoming starts from opposite side
                : 'translateX(0%)'
            }}
          >
            <div className="max-w-2xl text-center">
              <h3 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
                {services[nextIndex].title}
              </h3>
              <p className="text-lg">{services[nextIndex].description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Left Button */}
      <button
        onClick={() => changeSlide(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-black hover:text-gray-600 transition text-5xl z-10"
      >
        ‹
      </button>

      {/* Right Button */}
      <button
        onClick={() => changeSlide(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-black hover:text-gray-600 transition text-5xl z-10"
      >
        ›
      </button>
    </section>
  )
}