"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import DataTable from "@/components/data-table"

const columns = [
  { key: "nombre", label: "Lugar" },
  { key: "latitud", label: "Latitud" },
  { key: "longitud", label: "Longitud" },
  { key: "informacion", label: "Información" },
]

type LugarAPI = {
  idLugar: string
  nombre: string
  latitud: string
  longitud: string
  informacion: string
  ruta_imagen?: string
}

export default function PlacesPage() {
  const [data, setData] = useState<Omit<LugarAPI, "ruta_imagen">[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch("http://3.96.126.236:3000/api/listar_todos_Lugares")
        const lugares: LugarAPI[] = await res.json()

        // Solo extraemos los campos que nos interesan (sin ruta_imagen)
        const filtered = lugares.map(({ ruta_imagen, ...rest }) => rest)

        setData(filtered)
      } catch (err) {
        console.error("Error al cargar lugares:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlaces()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Lugares de Interés</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Explora los sitios más emblemáticos y representativos de nuestra ciudad patrimonio
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          <DataTable
            title="Directorio de Lugares Turísticos"
            columns={columns}
            data={data}
            emptyMessage="No hay lugares registrados en este momento"
          />
        )}
      </main>
    </div>
  )
}
