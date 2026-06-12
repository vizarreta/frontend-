<template>
  <div class="home-view">

    <!-- Hero -->
    <div class="hero-block">
      <div class="hero-icon-wrap">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>
      <h1 class="hero-title">Constancia de Matrícula de Laboratorio</h1>
      <p class="hero-desc">
        Ingresa tu Código Único de Identificación (C.U.I.) para consultar y
        descargar tus asignaturas de laboratorio registradas en el sistema EPIS.
      </p>
    </div>

    <!-- Tarjeta de búsqueda -->
    <section class="search-card" aria-label="Formulario de búsqueda por CUI">
      <form id="form-busqueda-cui" @submit.prevent="buscar">
        <label for="input-cui" class="search-label">Código C.U.I.</label>
        <div class="search-input-group" :class="{ 'search-input-group--error': inputError }">
          <span class="search-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <input
            id="input-cui"
            v-model="cui"
            type="text"
            class="search-input"
            placeholder="Ej: 20250100"
            autocomplete="off"
            maxlength="20"
            inputmode="numeric"
            @input="inputError = false"
          />
          <button
            id="btn-consultar"
            type="submit"
            class="search-btn"
            :disabled="!cui.trim()"
          >
            Consultar
          </button>
        </div>
        <p v-if="inputError" class="input-error-msg" role="alert">
          Por favor ingresa un C.U.I. válido.
        </p>
      </form>
    </section>

    <!-- Info cards -->
    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-icon info-card-icon--blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <p class="info-card-title">Datos del alumno</p>
          <p class="info-card-desc">Nombre, email y código de identificación único.</p>
        </div>
      </div>
      <div class="info-card">
        <div class="info-card-icon info-card-icon--green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        </div>
        <div>
          <p class="info-card-title">Asignaturas matriculadas</p>
          <p class="info-card-desc">Cursos, docente asignado, grupo y laboratorio.</p>
        </div>
      </div>
      <div class="info-card">
        <div class="info-card-icon info-card-icon--amber">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div>
          <p class="info-card-title">Emisión dinámica</p>
          <p class="info-card-desc">Fecha de emisión calculada automáticamente.</p>
        </div>
      </div>
    </div>

    <!-- Demo rápida -->
    <div class="demo-hint">
      <span class="demo-hint-label">Prueba rápida →</span>
      <button id="btn-demo" class="demo-btn" @click="usarDemo">
        CUI de ejemplo: <strong>20250100</strong>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router     = useRouter()
const cui        = ref('')
const inputError = ref(false)

function buscar() {
  const val = cui.value.trim()
  if (!val) { inputError.value = true; return }
  router.push({ name: 'constancia', params: { cui: val } })
}

function usarDemo() {
  cui.value = '20250100'
  buscar()
}
</script>

<style scoped>
.home-view { max-width: 680px; margin: 0 auto; }

/* --- HERO --- */
.hero-block {
  text-align: center;
  margin-bottom: 32px;
}
.hero-icon-wrap {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #e8f0fe, #c7d8f8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  color: #0b4c8c;
  box-shadow: 0 4px 16px rgba(11,76,140,0.14);
}
.hero-title {
  font-size: 1.55rem;
  font-weight: 700;
  color: #0b4c8c;
  line-height: 1.25;
  margin-bottom: 10px;
}
.hero-desc {
  font-size: 0.92rem;
  color: #666;
  line-height: 1.6;
  max-width: 520px;
  margin: 0 auto;
}

/* --- TARJETA BÚSQUEDA --- */
.search-card {
  background: #fff;
  border: 1px solid #d0d7e3;
  border-radius: 12px;
  padding: 28px 32px;
  box-shadow: 0 3px 16px rgba(11,76,140,0.09);
  margin-bottom: 24px;
}
.search-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}
.search-input-group {
  display: flex;
  align-items: center;
  border: 1.5px solid #c5d0e0;
  border-radius: 8px;
  overflow: hidden;
  background: #fafbfc;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input-group:focus-within {
  border-color: #0b4c8c;
  box-shadow: 0 0 0 3px rgba(11,76,140,0.10);
  background: #fff;
}
.search-input-group--error {
  border-color: #e74c3c !important;
  box-shadow: 0 0 0 3px rgba(231,76,60,0.10) !important;
}
.search-icon {
  padding: 0 12px;
  color: #aab2bf;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  color: #1a1a2e;
  padding: 12px 8px;
}
.search-input::placeholder { color: #b8c1cf; }
.search-btn {
  background: #0b4c8c;
  color: #fff;
  border: none;
  padding: 0 28px;
  height: 48px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  flex-shrink: 0;
}
.search-btn:hover:not(:disabled) { background: #0a3d74; }
.search-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.input-error-msg {
  font-size: 0.8rem;
  color: #e74c3c;
  margin-top: 6px;
  margin-bottom: 0;
}

/* --- INFO CARDS --- */
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}
.info-card {
  background: #fff;
  border: 1px solid #e4eaf3;
  border-radius: 10px;
  padding: 16px 14px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 1px 6px rgba(11,76,140,0.05);
}
.info-card-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.info-card-icon--blue  { background: #e8f0fe; color: #0b4c8c; }
.info-card-icon--green { background: #e6f4ea; color: #1e7e34; }
.info-card-icon--amber { background: #fff8e1; color: #e65c00; }
.info-card-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: #222;
  margin: 0 0 3px;
}
.info-card-desc {
  font-size: 0.76rem;
  color: #777;
  margin: 0;
  line-height: 1.45;
}

/* --- DEMO HINT --- */
.demo-hint {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}
.demo-hint-label {
  font-size: 0.82rem;
  color: #999;
}
.demo-btn {
  background: transparent;
  border: 1.5px dashed #0b4c8c;
  color: #0b4c8c;
  border-radius: 20px;
  padding: 5px 18px;
  font-size: 0.83rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.demo-btn:hover {
  background: #0b4c8c;
  color: #fff;
}

/* --- RESPONSIVE --- */
@media (max-width: 580px) {
  .info-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 1.2rem; }
  .search-card { padding: 20px 18px; }
  .search-btn { padding: 0 18px; }
}
</style>
