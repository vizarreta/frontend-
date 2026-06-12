<template>
  <div class="page-wrapper">

    <!-- ====== HEADER INSTITUCIONAL ====== -->
    <header class="inst-header">
      <div class="inst-header-inner">
        <RouterLink to="/" class="inst-logo-block" id="logo-link">
          <div class="inst-logo-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div>
            <p class="inst-univ">Universidad Nacional del Altiplano – Puno</p>
            <p class="inst-faculty">Facultad de Ingeniería Estadística e Informática</p>
          </div>
        </RouterLink>
        <div class="inst-header-right">
          <span class="inst-badge">EPIS · Sistema de Matrícula</span>
        </div>
      </div>
    </header>

    <!-- ====== CONTENIDO DINÁMICO POR RUTA ====== -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- ====== FOOTER ====== -->
    <footer class="page-footer">
      <span>© {{ year }} EPIS – Universidad Nacional del Altiplano, Puno</span>
    </footer>

  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
const year = new Date().getFullYear()
</script>

<style scoped>
/* ============================================================
   LAYOUT GENERAL
   ============================================================ */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* ============================================================
   HEADER INSTITUCIONAL
   ============================================================ */
.inst-header {
  background: #0b4c8c;
  color: #fff;
  box-shadow: 0 2px 14px rgba(11,76,140,0.30);
  position: sticky;
  top: 0;
  z-index: 100;
}
.inst-header-inner {
  max-width: 980px;
  margin: 0 auto;
  padding: 13px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.inst-logo-block {
  display: flex;
  align-items: center;
  gap: 13px;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s;
}
.inst-logo-block:hover { opacity: 0.85; }
.inst-logo-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255,255,255,0.14);
  border: 1.5px solid rgba(255,255,255,0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.inst-univ {
  font-size: 0.78rem;
  font-weight: 500;
  opacity: 0.88;
  margin: 0;
  line-height: 1.4;
}
.inst-faculty {
  font-size: 0.71rem;
  opacity: 0.62;
  margin: 0;
  line-height: 1.4;
}
.inst-header-right { flex-shrink: 0; }
.inst-badge {
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.24);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* ============================================================
   CONTENIDO PRINCIPAL
   ============================================================ */
.main-content {
  flex: 1;
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
  padding: 32px 20px;
}

/* ============================================================
   FOOTER
   ============================================================ */
.page-footer {
  background: #083a6e;
  color: rgba(255,255,255,0.6);
  text-align: center;
  padding: 14px 20px;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
}

/* ============================================================
   TRANSICIÓN ENTRE VISTAS
   ============================================================ */
.fade-enter-active,
.fade-leave-active { transition: opacity 0.22s ease, transform 0.22s ease; }
.fade-enter-from   { opacity: 0; transform: translateY(10px); }
.fade-leave-to     { opacity: 0; transform: translateY(-6px); }

/* ============================================================
   RESPONSIVE
   ============================================================ */
@media (max-width: 640px) {
  .inst-header-inner { padding: 11px 16px; }
  .main-content { padding: 20px 12px; }
}
</style>
