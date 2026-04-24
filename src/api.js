const BASE_URL = '/v1/api/student'

export const getStudents = () =>
  fetch(BASE_URL).then(r => r.json())

export const getStudent = (id) =>
  fetch(`${BASE_URL}/${id}`).then(r => r.json())

export const createStudent = (data) =>
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const updateStudent = (id, data) =>
  fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const deleteStudent = (id) =>
  fetch(`${BASE_URL}/delete/${id}`, { method: 'PATCH' }).then(r => r.json())

export const restoreStudent = (id) =>
  fetch(`${BASE_URL}/restore/${id}`, { method: 'PATCH' }).then(r => r.json())
