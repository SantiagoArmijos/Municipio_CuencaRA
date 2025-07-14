"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import DataTable from "@/components/data-table"

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "fechaInicio", label: "Fecha de Inicio" },
  { key: "fechaFin", label: "Fecha de Fin" },
  { key: "lugarNombre", label: "Lugar" },
  { key: "cupoDisponible", label: "Cupo Disponible" },
  { key: "precio", label: "Precio ($)" },
]

type ActividadAPI = {
  idActividad: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  idLugar: string
  cupoDisponible: number
  precio: number
}

type Lugar = {
  idLugar: string
  nombre: string
  latitud: string
  longitud: string
  informacion: string
  ruta_imagen: string
}

type ActividadConLugar = {
  idActividad: string
  nombre: string
  descripcion: string
  fechaInicio: string
  fechaFin: string
  lugarNombre: string
  cupoDisponible: number
  precio: number
}

export default function ActivitiesPage() {
  const [data, setData] = useState<ActividadConLugar[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    idLugar: "",
    cupoDisponible: "",
    precio: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("http://3.96.126.236:3000/api/insertarActividad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cupoDisponible: parseInt(formData.cupoDisponible),
          precio: parseFloat(formData.precio),
        }),
      })

      if (!res.ok) throw new Error("Error al insertar actividad")

      setModalOpen(false)
      setFormData({
        nombre: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        idLugar: "",
        cupoDisponible: "",
        precio: "",
      })

      await fetchAndSetData()
    } catch (error) {
      console.error("Error:", error)
      alert("No se pudo guardar la actividad.")
    }
  }

  const fetchAndSetData = async () => {
    setLoading(true)
    try {
      const [actividadesRes, lugaresRes] = await Promise.all([
        fetch("http://3.96.126.236:3000/api/listarTodasLasActividades"),
        fetch("http://3.96.126.236:3000/api/listar_todos_Lugares"),
      ])
      const actividades: ActividadAPI[] = await actividadesRes.json()
      const lugares: Lugar[] = await lugaresRes.json()
      const mapaLugares = new Map(lugares.map((l) => [l.idLugar, l.nombre]))
      const actividadesTransformadas: ActividadConLugar[] = actividades.map((a) => ({
        idActividad: a.idActividad,
        nombre: a.nombre,
        descripcion: a.descripcion,
        fechaInicio: a.fechaInicio,
        fechaFin: a.fechaFin,
        lugarNombre: mapaLugares.get(a.idLugar) || "Lugar desconocido",
        cupoDisponible: a.cupoDisponible,
        precio: a.precio,
      }))
      setData(actividadesTransformadas)
    } catch (err) {
      console.error("Error al cargar actividades:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAndSetData()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Actividades
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl">
            Consulta las actividades registradas por el Municipio de Cuenca
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded"
          >
            Añadir Actividad
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          <DataTable
            title="Listado de Actividades"
            columns={columns}
            data={data}
            emptyMessage="No hay actividades disponibles"
          />
        )}
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Nueva Actividad</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-red-600 font-bold text-xl"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Inicio</label>
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha Fin</label>
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Lugar</label>
                <select
                  name="idLugar"
                  value={formData.idLugar}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="">Seleccione un lugar</option>
                  <option value="3badfdf9-2849-4ac2-84bb-40006c950456">
                    Centro Histórico de Cuenca
                  </option>
                  <option value="3ece762d-0027-4347-8f46-0b550deab9f9">
                    Mirador de Turi
                  </option>
                  <option value="1e46d15b-6020-44cb-8d4c-50a813373706">
                    Parque Nacional Cajas
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Cupo Disponible</label>
                  <input
                    type="number"
                    name="cupoDisponible"
                    value={formData.cupoDisponible}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Precio ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
