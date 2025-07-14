import Header from "@/components/header"
import Carousel from "@/components/carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Bienvenidos a Cuenca</h2>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Descubre la magia de nuestra ciudad patrimonio de la humanidad. Explora nuestras actividades, lugares
            emblemáticos y haz tus reservas.
          </p>
        </div>

        <Carousel />

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Actividades</h3>
            <p className="text-gray-600">
              Descubre eventos culturales, festivales y actividades que enriquecen la vida de nuestra ciudad.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Lugares</h3>
            <p className="text-gray-600">
              Explora los sitios históricos, museos y lugares de interés que hacen única a Cuenca.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reservas</h3>
            <p className="text-gray-600">
              Planifica tu visita y reserva tours, espacios públicos y servicios municipales.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
