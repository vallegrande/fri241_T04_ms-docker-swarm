import { useState, useEffect } from 'react'

const empty = {
  firstName: '', lastName: '', documentType: 'DNI',
  documentNumber: '', email: '', grade: '', section: ''
}

const steps = ['Datos Personales', 'Documento', 'Académico']

export default function StudentForm({ onSave, editing, onClose }) {
  const [form, setForm] = useState(empty)
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(editing ? { ...editing } : empty)
    setStep(0)
    setErrors({})
  }, [editing])

  const handle = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validateStep = () => {
    const e = {}
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'El nombre es obligatorio'
      if (!form.lastName.trim()) e.lastName = 'El apellido es obligatorio'
      if (!form.email.trim()) e.email = 'El correo es obligatorio'
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Correo inválido'
    }
    if (step === 1) {
      if (!form.documentNumber.trim()) e.documentNumber = 'El número de documento es obligatorio'
    }
    if (step === 2) {
      if (!form.grade.trim()) e.grade = 'El grado es obligatorio'
      if (!form.section.trim()) e.section = 'La sección es obligatoria'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = (e) => {
    e.preventDefault()
    if (validateStep()) setStep(s => s + 1)
  }

  const prev = (e) => {
    e.preventDefault()
    setStep(s => s - 1)
  }

  const submit = (e) => {
    e.preventDefault()
    if (validateStep()) onSave(form)
  }

  const progress = Math.round(((step + 1) / steps.length) * 100)

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>{editing ? 'Editar Estudiante' : 'Registrar Nuevo Estudiante'}</h2>
          <p>{editing ? 'Modifica los datos del estudiante' : 'Completa todos los datos para registrar al estudiante'}</p>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <>
              <div key={i} className={`step ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                <div className="step-circle">{i < step ? '✓' : i + 1}</div>
                <div className="step-label">{s}</div>
              </div>
              {i < steps.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
            </>
          ))}
        </div>

        <div style={{ padding: '12px 28px 0' }}>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <div className="progress-label">
            <span>Paso {step + 1} de {steps.length}</span>
            <span>{progress}% completado</span>
          </div>
        </div>

        <form onSubmit={submit}>
          {step === 0 && (
            <div className="form-step">
              <h3>Información Personal</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombres completos *</label>
                  <input name="firstName" placeholder="Ej. Juan Alberto" value={form.firstName} onChange={handle} />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Apellidos completos *</label>
                  <input name="lastName" placeholder="Ej. Pérez Rodríguez" value={form.lastName} onChange={handle} />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row single">
                <div className="form-group">
                  <label>Correo electrónico *</label>
                  <input name="email" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={handle} />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="form-step">
              <h3>Documento de Identidad</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Tipo de documento *</label>
                  <select name="documentType" value={form.documentType} onChange={handle}>
                    <option value="DNI">DNI - Documento Nacional</option>
                    <option value="CE">CE - Carné de Extranjería</option>
                    <option value="PAS">PAS - Pasaporte</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de documento *</label>
                  <input name="documentNumber" placeholder="Ingrese el número" value={form.documentNumber} onChange={handle} />
                  {errors.documentNumber && <span className="field-error">{errors.documentNumber}</span>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h3>Información Académica</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Grado *</label>
                  <input name="grade" placeholder="Ej. 10" value={form.grade} onChange={handle} />
                  {errors.grade && <span className="field-error">{errors.grade}</span>}
                </div>
                <div className="form-group">
                  <label>Sección *</label>
                  <input name="section" placeholder="Ej. A" value={form.section} onChange={handle} />
                  {errors.section && <span className="field-error">{errors.section}</span>}
                </div>
              </div>
            </div>
          )}

          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={step === 0 ? onClose : prev}>
              {step === 0 ? 'Cancelar' : 'Anterior'}
            </button>
            {step < steps.length - 1
              ? <button type="button" className="btn-next" onClick={next}>Siguiente paso</button>
              : <button type="submit" className="btn-submit">{editing ? 'Guardar cambios' : 'Registrar estudiante'}</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}
