import { useState, useEffect } from 'react'

function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    "https://picsum.photos/1200/800?random=1",
    "https://picsum.photos/1200/800?random=2",
    "https://picsum.photos/1200/800?random=3"
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[600px] overflow-hidden">
      <div className="relative w-full h-full">
        <img src={slides[currentSlide]} alt={`CSA Image ${currentSlide + 1}`} className="w-full h-full object-cover transition-opacity duration-500" />
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-gradient-to-b from-black/70 via-black/50 to-black/70 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-xl tracking-tight">St Thomas Aquinas - CSA</h1>
        <p className="text-xl md:text-2xl italic font-light max-w-3xl leading-relaxed">"To one who has faith, no explanation is necessary. To one without faith, no explanation is possible."</p>
      </div>
    </section>
  )
}

export default ImageSlider
