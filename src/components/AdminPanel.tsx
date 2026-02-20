import { useState, useEffect } from 'react'
import apiService from '../services/api'

interface AdminPanelProps {
  onClose: () => void;
}

function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('members')
  const [data, setData] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' })

  const tables = ['members', 'events', 'contributions', 'roles', 'sub_groups', 'users']

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const promises = tables.map(table => apiService.fetchTableData(table))
      const results = await Promise.all(promises)
      const dataObj: Record<string, any[]> = {}
      tables.forEach((table, index) => {
        dataObj[table] = results[index]
      })
      setData(dataObj)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError('Failed to load data: ' + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (table: string, id: string | number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await apiService.deleteRecord(table, id)
        loadData() // Refresh data
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        alert('Failed to delete: ' + errorMessage)
      }
    }
  }

  const renderTable = (tableName: string, records: any[]) => {
    if (!records || records.length === 0) {
      return <p className="text-gray-500">No records found.</p>
    }

    let columns = Object.keys(records[0])

    // Hide sensitive columns
    if (tableName === 'users') {
      columns = columns.filter(col => col !== 'password')
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              {columns.map(col => (
                <th key={col} className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">
                  {col.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
              <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map(col => (
                  <td key={col} className="px-4 py-2 border-b text-sm text-gray-900">
                    {record[col]}
                  </td>
                ))}
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleDelete(tableName, record[Object.keys(record)[0]])}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        alert('User added successfully!')
        setNewUser({ username: '', password: '', role: 'user' })
        setShowAddUser(false)
        loadData() // Refresh data to show new user
      } else {
        alert('Failed to add user: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      alert('Error adding user: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <>
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New User</h2>

            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="username"
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                  type="submit"
                >
                  Add User
                </button>
                <button
                  className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                  type="button"
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-full max-w-6xl h-5/6 rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 p-4 border-r">
              <h2 className="text-lg font-semibold mb-4">Database Tables</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setShowAddUser(true)}
                    className="w-full text-left px-3 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                  >
                    Add New User
                  </button>
                </li>
                {tables.map(table => (
                  <li key={table}>
                    <button
                      onClick={() => setActiveTab(table)}
                      className={`w-full text-left px-3 py-2 rounded ${
                        activeTab === table
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {table.replace(/_/g, ' ').toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {activeTab.replace(/_/g, ' ').toUpperCase()}
                </h2>
                <p className="text-gray-600">
                  Total records: {data[activeTab]?.length || 0}
                </p>
              </div>

              {renderTable(activeTab, data[activeTab])}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanel
