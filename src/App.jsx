import { useState, useEffect } from 'react'
import { getStudents, createStudent, updateStudent, deleteStudent, restoreStudent } from './api'
import StudentForm from './StudentForm'

export default function App() {
  const [students, setStudents] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [alert, setAlert] = useState(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getStudents().then(setStudents).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const showAlert = (msg, type = 'success') => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 3000)
  }

  const handleSave = async (data) => {
    try {
      if (editing) {
        await updateStudent(editing.id, data)
        showAlert('Estudiante actualizado correctamente.')
      } else {
        await createStudent(data)
        showAlert('Estudiante registrado correctamente.')
      }
      setShowForm(false)
      setEditing(null)
      load()
    } catch {
      showAlert('Ocurrió un error al guardar.', 'error')
    }
  }

  const handleEdit = (s) => { setEditing(s); setShowForm(true) }
  const handleClose = () => { setShowForm(false); setEditing(null) }

  const handleDelete = async (id) => {
    await deleteStudent(id)
    showAlert('Estudiante desactivado.')
    load()
  }

  const handleRestore = async (id) => {
    await restoreStudent(id)
    showAlert('Estudiante restaurado.')
    load()
  }

  const activos = students.filter(s => s.status === 'A').length
  const inactivos = students.filter(s => s.status === 'I').length

  return (
    <div>
      <nav className="navbar">
        <div>
          <div className="navbar-brand">Sistema de Gestión de Estudiantes</div>
          <div className="navbar-sub">Microservicio Spring Boot + PostgreSQL</div>
        </div>
        <button className="navbar-btn" onClick={() => { setEditing(null); setShowForm(true) }}>
          + Registrar Estudiante
        </button>
      </nav>

      <main className="main">
        {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

        <div className="stats">
          <div className="stat-card blue">
            <div><div className="stat-num">{students.length}</div><div className="stat-lbl">Total Estudiantes</div></div>
          </div>
          <div className="stat-card green">
            <div><div className="stat-num">{activos}</div><div className="stat-lbl">Activos</div></div>
          </div>
          <div className="stat-card red">
            <div><div className="stat-num">{inactivos}</div><div className="stat-lbl">Inactivos</div></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Lista de Estudiantes</h2>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{students.length} registros</span>
          </div>
          {loading ? (
            <div className="empty">Cargando datos...</div>
          ) : students.length === 0 ? (
            <div className="empty">No hay estudiantes registrados. Haz clic en "Registrar Estudiante" para comenzar.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>ID</th><th>Nombre</th><th>Apellido</th><th>Documento</th>
                    <th>Email</th><th>Grado</th><th>Sección</th><th>Registro</th>
                    <th>Estado</th><th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id}>
                      <td className="id-cell">{s.id}</td>
                      <td>{s.firstName}</td>
                      <td>{s.lastName}</td>
                      <td>{s.documentType} {s.documentNumber}</td>
                      <td>{s.email}</td>
                      <td>{s.grade}</td>
                      <td>{s.section}</td>
                      <td>{s.registerDate}</td>
                      <td>
                        <span className={`badge ${s.status === 'A' ? 'badge-active' : 'badge-inactive'}`}>
                          <span className="badge-dot" />
                          {s.status === 'A' ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          {s.status === 'A' ? (
                            <>
                              <button className="btn-icon btn-icon-edit" title="Editar" onClick={() => handleEdit(s)}>
                                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                              </button>
                              <button className="btn-icon btn-icon-danger" title="Desactivar" onClick={() => handleDelete(s.id)}>
                                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                  <path d="M10 11v6"/><path d="M14 11v6"/>
                                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                </svg>
                              </button>
                            </>
                          ) : (
                            <button className="btn-icon btn-icon-restore" title="Restaurar" onClick={() => handleRestore(s.id)}>
                              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <polyline points="1 4 1 10 7 10"/>
                                <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <StudentForm onSave={handleSave} editing={editing} onClose={handleClose} />
      )}
    </div>
  )
}
