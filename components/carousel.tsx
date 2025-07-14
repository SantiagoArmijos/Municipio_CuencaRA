"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselItem {
  id: number
  title: string
  description: string
  image: string
  link: string
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    title: "Centro Histórico de Cuenca",
    description: "Descubre la arquitectura colonial y republicana de nuestra ciudad patrimonio",
    image: "/centro.jpg?height=400&width=800",
    link: "/places",
  },
  {
    id: 2,
    title: "Festivales y Tradiciones",
    description: "Vive las celebraciones más importantes de Cuenca durante todo el año",
    image: "/cultura.jpg?height=400&width=800",
    link: "/activities",
  },
  {
    id: 3,
    title: "Museos y Cultura",
    description: "Explora la rica historia y cultura de Cuenca en nuestros museos",
    image: "/fiestas-populares.jpg?height=400&width=800",
    link: "/places",
  },
  {
    id: 4,
    title: "Reserva tu Experiencia",
    description: "Planifica tu visita y reserva tours guiados por la ciudad",
    image: "/ultima.jpg?height=400&width=800",
    link: "/reservations",
  },
]

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      {carouselData.map((item, index) => (
        <Link
          key={item.id}
          href={item.link}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className="relative w-full h-full group cursor-pointer">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">{item.title}</h3>
              <p className="text-lg opacity-90 group-hover:opacity-100 transition-opacity">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-400 scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
