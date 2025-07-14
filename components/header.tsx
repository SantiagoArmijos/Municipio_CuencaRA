"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const navItems = [
    { href: "/activities", label: "Actividades", icon: "🎭" },
    { href: "/places", label: "Lugares", icon: "🏛️" },
    { href: "/reservations", label: "Reservas", icon: "📅" },
  ]

  return (
    <header className="bg-gradient-to-r from-red-700 via-red-600 to-yellow-600 shadow-2xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and City Image */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <Image
                src="/logo.png?height=80&width=120"
                alt="Cuenca - Patrimonio de la Humanidad"
                width={120}
                height={80}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">Municipio de Cuenca</h1>
              <p className="text-yellow-200 text-sm">Patrimonio de la Humanidad</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-white text-red-700 shadow-lg"
                    : "text-white hover:bg-white/20 hover:shadow-md"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
