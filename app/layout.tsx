import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Municipio de Cuenca - Ecuador",
  description: "Portal oficial del Municipio de Cuenca, Ecuador",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-yellow-50 to-red-50 min-h-screen">{children}</body>
    </html>
  )
}
