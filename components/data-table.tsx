interface TableColumn {
  key: string
  label: string
  render?: (row: TableData) => React.ReactNode // 👈 Soporte para render personalizado
}

interface TableData {
  [key: string]: string | number | React.ReactNode
}

interface DataTableProps {
  title: string
  columns: TableColumn[]
  data: TableData[]
  emptyMessage?: string
}

export default function DataTable({
  title,
  columns,
  data,
  emptyMessage = "No hay datos disponibles",
}: DataTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-yellow-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-yellow-100 to-red-100">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-yellow-50 hover:to-red-50 transition-colors duration-200"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500 text-lg">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
