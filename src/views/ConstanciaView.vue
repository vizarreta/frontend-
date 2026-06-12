<template>
  <div class="container my-5 max-w-4xl mx-auto font-sans text-neutral-800">
    
    <div v-if="loading" class="text-center my-5 py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Consultando el Sistema de Matrícula...</p>
    </div>

    <div v-else-if="error || courses.length === 0" class="alert alert-danger text-center shadow-sm mt-5">
      {{ error || 'No se encontraron registros de matrícula para el CUI ingresado.' }}
      <br><br>
      <router-link to="/" class="btn btn-outline-danger btn-sm">Volver al inicio</router-link>
    </div>

    <div v-else class="bg-white p-5 border rounded shadow-sm minimal-certificate mt-4">
      
      <div class="text-center mb-4">
        <h2 class="title-institutional fw-bold text-uppercase mb-1">
          Constancia de Matrícula de Laboratorio
        </h2>
        <h5 class="subtitle-institutional mb-2">
          Escuela Profesional de Ingeniería de Sistemas EPIS
        </h5>
        <p class="text-secondary small">
          Emitido el: {{ formatFecha(courses[0]?.created) }}
        </p>
        <hr class="header-divider my-4" />
      </div>

      <div class="section-header-band d-flex align-items-center mb-3">
        <span class="blue-indicator-bar"></span>
        <h6 class="text-uppercase fw-bold m-0 ps-3">Datos del Alumno</h6>
      </div>
      
      <div class="row mb-5 px-3 layout-data-student">
        <div class="col-12 mb-2 d-flex">
          <span class="fw-bold label-width">C.U.I.:</span>
          <span>{{ studentInfo.cui }}</span>
        </div>
        <div class="col-12 mb-2 d-flex">
          <span class="fw-bold label-width">Nombre completo:</span>
          <span class="text-uppercase">{{ studentInfo.full_name }}</span>
        </div>
        <div class="col-12 mb-2 d-flex">
          <span class="fw-bold label-width">Email:</span>
          <span class="text-lowercase text-muted">{{ studentInfo.email }}</span>
        </div>
      </div>

      <div class="section-header-band d-flex align-items-center mb-3">
        <span class="blue-indicator-bar"></span>
        <h6 class="text-uppercase fw-bold m-0 ps-3">Asignaturas Matriculadas</h6>
      </div>

      <div class="table-responsive px-1 mb-4">
        <table class="table table-bordered align-middle table-custom-style">
          <thead>
            <tr>
              <th scope="col" class="text-center width-n">N°</th>
              <th scope="col" class="width-code">Código</th>
              <th scope="col">Curso</th>
              <th scope="col" class="width-year">Año</th>
              <th scope="col" class="text-center width-group">Grupo</th>
              <th scope="col" class="width-lab">Laboratorio</th>
              <th scope="col">Docente</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in courses" :key="item.id">
              <td class="text-center fw-normal">{{ index + 1 }}</td>
              <td>{{ item.workload.course.code }}</td>
              <td>
                <span class="fw-bold d-block text-uppercase">{{ item.workload.course.name }}</span>
                <span class="text-muted small">({{ item.workload.course.acronym }})</span>
              </td>
              <td>{{ item.workload.course.year_display }}</td>
              <td class="text-center">{{ item.workload.group }}</td>
              <td>{{ item.workload.laboratory || 'N/A' }}</td>
              <td class="text-uppercase text-secondary small-text-docente">
                {{ item.workload.teacher.full_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-1 mt-4">
        <p class="fw-bold mb-4">
          Total de cursos matriculados: <span class="fw-normal">{{ courses.length }}</span>
        </p>
        
        <div class="text-center pt-3 border-top mt-5">
          <p class="text-muted fst-italic footer-disclaimer">
            Documento generado digitalmente por el Sistema de Matrícula de Laboratorio EPIS.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// En producción (Netlify) usa el proxy /api/ para evitar CORS.
// En desarrollo local usa la URL directa del backend.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/'

const route = useRoute()
const cui = route.params.cui

const loading = ref(true)
const error = ref('')
const courses = ref([])
const studentInfo = reactive({ cui: '', full_name: '', email: '' })

function formatFecha(isoString) {
  const d = isoString ? new Date(isoString) : new Date()
  if (isNaN(d.getTime())) return new Date().toLocaleDateString('es-PE')
  return d.toLocaleDateString('es-PE', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

async function fetchMatricula() {
  if (!cui) return

  loading.value = true
  error.value = ''
  
  try {
    const response = await axios.get(`${API_BASE}enrollment-certificate/`, {
      params: { cui: cui }
    })

    const data = response.data
    const results = Array.isArray(data) ? data : (data.results ?? [])

    if (results.length === 0) {
      error.value = 'No se encontraron registros de matrícula para el C.U.I. ingresado.'
      return
    }

    courses.value = results

    const first = results[0]
    studentInfo.cui = cui
    studentInfo.full_name = first?.student?.full_name ?? '—'
    studentInfo.email = first?.student?.email ?? '—'

  } catch (err) {
    if (err.response) {
      if (err.response.status === 404) {
        error.value = 'No se encontraron registros para el C.U.I. ingresado.'
      } else {
        error.value = `Error del servidor: ${err.response.status}`
      }
    } else {
      error.value = 'Ocurrió un error de conexión.'
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMatricula()
})
</script>

<style scoped>
/* Colores Institucionales Básicos basados en tu paleta */
.title-institutional {
  color: #0b4c8c;
  font-size: 1.6rem;
  letter-spacing: 0.5px;
}
.subtitle-institutional {
  color: #333333;
  font-size: 1.15rem;
}
.header-divider {
  border-top: 1.5px solid #b0b0b0;
  opacity: 0.7;
}

/* Indicador lateral azul y banda gris */
.section-header-band {
  background-color: #f2f2f2;
  padding: 8px 0;
  position: relative;
}
.blue-indicator-bar {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #0b4c8c;
}

/* Alineaciones y anchos fijos de etiquetas */
.label-width {
  width: 160px;
  display: inline-block;
}
.table-custom-style th {
  background-color: #fafafa !important;
  color: #444444;
  font-weight: 600;
  font-size: 0.9rem;
}
.table-custom-style td {
  font-size: 0.9rem;
  color: #222222;
}

/* Ajustes de columnas */
.width-n { width: 45px; }
.width-code { width: 90px; }
.width-year { width: 85px; }
.width-group { width: 65px; }
.width-lab { width: 100px; }
.small-text-docente { font-size: 0.85rem; }

.footer-disclaimer {
  font-size: 0.8rem;
  color: #8c8c8c !important;
}

.max-w-4xl {
  max-width: 56rem;
}
</style>
