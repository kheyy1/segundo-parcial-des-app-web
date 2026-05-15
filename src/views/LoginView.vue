<!-- LoginView.vue — Vista de inicio de sesión -->
<template>
  <div class="login-fullpage">

    <!-- Panel izquierdo decorativo -->
    <div class="login-panel-left d-none d-lg-flex">
      <div class="login-panel-content">
        <div class="panel-logo">☕</div>
        <h2>Café Aroma</h2>
        <p>El sabor que despierta tu día</p>
        <div class="panel-divider"></div>
        <ul class="panel-features">
          <li><i class="bi bi-check-circle-fill me-2"></i>Gestión de productos</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Inventario en tiempo real</li>
          <li><i class="bi bi-check-circle-fill me-2"></i>Panel administrativo</li>
        </ul>
      </div>
      <div class="panel-circles">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
    </div>

    <!-- Panel derecho: formulario -->
    <div class="login-panel-right">
      <div class="login-form-wrap">

        <!-- Logo móvil (solo visible en pantallas pequeñas) -->
        <div class="text-center mb-4 d-lg-none">
          <span style="font-size:3rem;">☕</span>
          <h2 class="fw-bold mt-1" style="color:var(--cafe-primary);">Café Aroma</h2>
        </div>

        <h3 class="fw-bold mb-1" style="color:var(--cafe-primary);">Iniciar sesión</h3>
        <p class="mb-4" style="color:var(--cafe-text-soft); font-size:0.95rem;">
          Ingresa tus credenciales para acceder al panel
        </p>

        <!-- Alerta de error -->
        <div v-if="errorMsg" class="alert alert-danger d-flex align-items-center py-2 mb-3" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i>
          <span>{{ errorMsg }}</span>
        </div>

        <!-- Campo usuario -->
        <div class="mb-3">
          <label class="form-label fw-semibold" style="color:var(--cafe-secondary); font-size:0.85rem;">
            <i class="bi bi-person me-1"></i>Usuario
          </label>
          <input
            v-model="username"
            type="text"
            class="form-control form-control-lg login-input"
            placeholder="admin"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Campo contraseña -->
        <div class="mb-4">
          <label class="form-label fw-semibold" style="color:var(--cafe-secondary); font-size:0.85rem;">
            <i class="bi bi-lock me-1"></i>Contraseña
          </label>
          <input
            v-model="password"
            type="password"
            class="form-control form-control-lg login-input"
            placeholder="••••••••"
            @keyup.enter="handleLogin"
          />
        </div>

        <!-- Botón -->
        <button
          class="btn btn-cafe w-100 py-3 fw-bold"
          style="font-size:1rem; letter-spacing:0.05em;"
          @click="handleLogin"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="bi bi-box-arrow-in-right me-2"></i>
          {{ loading ? 'Verificando...' : 'Entrar' }}
        </button>

        <!-- Divider -->
        <div class="d-flex align-items-center my-4">
          <div class="flex-grow-1" style="height:1px; background:var(--cafe-border);"></div>
          <span class="mx-3 small" style="color:var(--cafe-text-soft);">credenciales de prueba</span>
          <div class="flex-grow-1" style="height:1px; background:var(--cafe-border);"></div>
        </div>

        <!-- Hint -->
        <div class="login-hint-box">
          <div class="d-flex justify-content-center gap-4">
            <div class="text-center">
              <p class="mb-0 small" style="color:var(--cafe-text-soft);">Usuario</p>
              <strong style="color:var(--cafe-primary);">admin</strong>
            </div>
            <div style="width:1px; background:var(--cafe-border);"></div>
            <div class="text-center">
              <p class="mb-0 small" style="color:var(--cafe-text-soft);">Contraseña</p>
              <strong style="color:var(--cafe-primary);">cafe123</strong>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router   = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading  = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  loading.value  = true
  try {
    const res      = await fetch('/data/usuarios.json')
    const usuarios = await res.json()
    const usuario  = usuarios.find(
      u => u.usuario === username.value && u.password === password.value
    )
    if (usuario) {
      localStorage.setItem('loggedIn', 'true')
      localStorage.setItem('usuarioActivo', usuario.nombre)
      router.push('/dashboard')
    } else {
      errorMsg.value = 'Usuario o contraseña incorrectos.'
    }
  } catch {
    errorMsg.value = 'Error al cargar los datos. Usa un servidor local.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ── Layout de dos paneles ─────────────────────────────── */
.login-fullpage {
  display: flex;
  min-height: 100vh;
}

/* ── Panel izquierdo ───────────────────────────────────── */
.login-panel-left {
  width: 45%;
  background: var(--cafe-primary);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-panel-content {
  position: relative;
  z-index: 2;
  color: #f5e6d0;
  padding: 3rem;
  text-align: center;
}

.panel-logo {
  font-size: 5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}

.login-panel-content h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--cafe-accent);
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.login-panel-content p {
  font-style: italic;
  opacity: 0.75;
  font-size: 1rem;
  margin-bottom: 0;
}

.panel-divider {
  width: 60px;
  height: 3px;
  background: var(--cafe-accent);
  margin: 1.5rem auto;
  border-radius: 2px;
}

.panel-features {
  list-style: none;
  padding: 0;
  text-align: left;
  display: inline-block;
}

.panel-features li {
  padding: 0.4rem 0;
  color: #e8c99a;
  font-size: 0.95rem;
}

/* Círculos decorativos de fondo */
.panel-circles { position: absolute; inset: 0; z-index: 1; }

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(212, 169, 106, 0.08);
}

.circle-1 { width: 350px; height: 350px; top: -80px;  right: -80px; }
.circle-2 { width: 250px; height: 250px; bottom: -60px; left: -60px; }
.circle-3 { width: 150px; height: 150px; bottom: 120px; right: 40px; background: rgba(212,169,106,0.05); }

/* ── Panel derecho ─────────────────────────────────────── */
.login-panel-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--cafe-bg);
  padding: 2rem;
}

.login-form-wrap {
  width: 100%;
  max-width: 420px;
}

/* ── Inputs ────────────────────────────────────────────── */
.login-input {
  border: 1.5px solid var(--cafe-border);
  border-radius: 12px;
  background: var(--cafe-surface);
  color: var(--cafe-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.login-input:focus {
  border-color: var(--cafe-accent);
  box-shadow: 0 0 0 3px rgba(212, 169, 106, 0.2);
}

/* ── Hint box ──────────────────────────────────────────── */
.login-hint-box {
  background: var(--cafe-surface);
  border: 1px solid var(--cafe-border);
  border-radius: 12px;
  padding: 0.85rem 1.5rem;
}
</style>