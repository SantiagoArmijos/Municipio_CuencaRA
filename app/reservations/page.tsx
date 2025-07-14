"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import DataTable from "@/components/data-table"

type ReservaAPI = {
  idReserva: string
  idActividad: string
  estadoReserva: string
  nombreTurista: string
  correoTurista: string
  cantidadPersonas: number
  fechaReserva: string
  actividad?: string
}

type ActividadAPI = {
  idActividad: string
  nombre: string
}

export default function ReservationsPage() {
  const [data, setData] = useState<ReservaAPI[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReserva, setSelectedReserva] = useState<ReservaAPI | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchReservas = async () => {
    const [resReservas, resActividades] = await Promise.all([
      fetch("http://3.96.126.236:3000/api/listar_todas_reservas"),
      fetch("http://3.96.126.236:3000/api/listarTodasLasActividades"),
    ])
    const reservas: ReservaAPI[] = await resReservas.json()
    const actividades: ActividadAPI[] = await resActividades.json()

    const actividadMap = new Map(actividades.map((a) => [a.idActividad, a.nombre]))

    const merged = reservas.map((r) => ({
      ...r,
      actividad: actividadMap.get(r.idActividad) || "Desconocida",
      fechaReserva: new Date(r.fechaReserva).toLocaleString(),
    }))

    setData(merged)
  }

  useEffect(() => {
    fetchReservas().finally(() => setLoading(false))
  }, [])

  const handleOpenModal = async (idReserva: string) => {
    try {
      const res = await fetch(`http://3.96.126.236:3000/api/obtenerReserva/${idReserva}`)
      const detalle: ReservaAPI = await res.json()
      detalle.fechaReserva = new Date(detalle.fechaReserva).toLocaleString()
      setSelectedReserva(detalle)
      setModalOpen(true)
    } catch (error) {
      console.error("Error al obtener detalles de la reserva:", error)
    }
  }

  const handleConfirmarPago = async (idReserva: string) => {
    try {
      await fetch(`http://3.96.126.236:3000/api/confirmarReserva/${idReserva}`, {
        method: "PUT",
      })
      alert("Reserva confirmada con éxito.")
      await fetchReservas()
    } catch (error) {
      console.error("Error al confirmar pago:", error)
      alert("Error al confirmar la reserva.")
    }
  }

  const columns = [
    { key: "actividad", label: "Actividad" },
    { key: "nombreTurista", label: "Nombre Turista" },
    { key: "correoTurista", label: "Correo Turista" },
    { key: "cantidadPersonas", label: "Cantidad Personas" },
    { key: "fechaReserva", label: "Fecha de Reserva" },
    { key: "estadoReserva", label: "Estado" },
    {
      key: "acciones",
      label: "Info",
      render: (row: ReservaAPI) => (
        <button
          onClick={() => handleOpenModal(row.idReserva)}
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
          title="Ver detalles"
        >
          ℹ️
        </button>
      ),
    },
    {
      key: "confirmar",
      label: "Confirmar Pago",
      render: (row: ReservaAPI) => (
        <button
          onClick={() => handleConfirmarPago(row.idReserva)}
          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          title="Confirmar pago"
        >
          ✅
        </button>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Reservas y Servicios
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Planifica tu visita y revisa las reservas realizadas en Cuenca
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Cargando reservas...</p>
        ) : (
          <DataTable
            title="Listado de Reservas"
            columns={columns}
            data={data}
            emptyMessage="No hay reservas disponibles en este momento"
          />
        )}

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Cómo hacer una reserva?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {["Selecciona", "Contacta", "Confirma"].map((etapa, i) => (
              <div className="text-center" key={etapa}>
                <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {i + 1}
                </div>
                <h4 className="font-semibold mb-2">{etapa}</h4>
                <p className="text-gray-600">
                  {
                    [
                      "Elige el servicio que deseas reservar de la tabla anterior",
                      "Llama al (07) 2831-900 o visita nuestras oficinas",
                      "Realiza el pago y recibe tu confirmación de reserva",
                    ][i]
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* MODAL de información */}
      {modalOpen && selectedReserva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detalles de la Reserva</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-red-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="space-y-2 text-gray-700">
              <p><strong>ID Reserva:</strong> {selectedReserva.idReserva}</p>
              <p><strong>ID Actividad:</strong> {selectedReserva.idActividad}</p>
              <p><strong>Nombre:</strong> {selectedReserva.nombreTurista}</p>
              <p><strong>Correo:</strong> {selectedReserva.correoTurista}</p>
              <p><strong>Personas:</strong> {selectedReserva.cantidadPersonas}</p>
              <p><strong>Fecha:</strong> {selectedReserva.fechaReserva}</p>
              <p><strong>Estado:</strong> {selectedReserva.estadoReserva}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
