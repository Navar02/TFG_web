<template>
  <div class="table-container">
    <!-- Overlay y PopUp de confirmación -->
    <div v-if="showPopup" class="overlay">
      <div class="popup">
        <p>Seguro que quieres desactivar al usuario <b>{{ userToDisable?.alias }}</b>?</p>
        <div class="popup-actions">
          <button class="yes" @click="confirmDisable">Sí</button>
          <button class="no" @click="cancelDisable">No</button>
        </div>
      </div>
    </div>
    <!-- Mensaje de resultado -->
    <transition name="fade">
      <div v-if="showMessage" class="result-message">{{ resultMessage }}</div>
    </transition>
    <div class="outer-rectangle">
      <h2 style="text-align:center; margin-bottom: 2.6em;">Usuarios Activos</h2>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Alias</th>
            <th>Último acceso</th>
            <th>Tokens consumidos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.email">
            <td>{{ user.email }}</td>
            <td>{{ user.alias }}</td>
            <td>{{ user.last_login }}</td>
            <td>{{ user.stats?.tokens_totales ?? '0' }}</td>
            <td>
              <button @click="showDisablePopup(user)">Desactivar Cuenta</button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" style="text-align:center;">No hay usuarios</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const showPopup = ref(false)
const userToDisable = ref(null)
const showMessage = ref(false)
const resultMessage = ref('')

async function fetchUsers() {
  const userData = JSON.parse(localStorage.getItem('user_data'))
  if (!userData) return

  const response = await fetch('http://localhost:8000/getAllActiveUsers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_data: userData })
  })
  if (response.ok) {
    users.value = await response.json()
  } else {
    users.value = []
  }
}

onMounted(fetchUsers)

function showDisablePopup(user) {
  userToDisable.value = user
  showPopup.value = true
}

function cancelDisable() {
  showPopup.value = false
  userToDisable.value = null
}

async function confirmDisable() {
  showPopup.value = false
  const userData = JSON.parse(localStorage.getItem('user_data'))
  if (!userData || !userToDisable.value) return

  // Petición para desactivar usuario
  const response = await fetch('http://localhost:8000/disableUser/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_data: userData, email: userToDisable.value.email })
  })
  let msg = 'Error al desactivar usuario'
  if (response.ok) {
    const data = await response.json()
    msg = data.message || 'Usuario desactivado correctamente'
    await fetchUsers()
  }
  resultMessage.value = msg
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 3000)
}
</script>

<style scoped>
.table-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.outer-rectangle {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2.6em auto;
  padding: 3.25em 2.6em 2.6em 2.6em;
  border-radius: 2.6vw;
  background: #fafbfc;
  box-shadow: 0 5.2px 31.2px rgba(0,0,0,0.10);
  max-width: 90vw;
  width: 78vw;
  min-width: 455px;
}

.custom-table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 65vw;
  background: #fff;
  border-radius: 1.95vw;
  overflow: hidden;
  box-shadow: 0 2.6px 15.6px rgba(0,0,0,0.08);
  font-size: 1.3vw;
}

.custom-table th, .custom-table td {
  padding: 1.3vw 2vw;
  text-align: left;
}

.custom-table th {
  background: #f5f5f5;
}

.custom-table tr:first-child th:first-child {
  border-top-left-radius: 1.95vw;
}
.custom-table tr:first-child th:last-child {
  border-top-right-radius: 1.95vw;
}
.custom-table tr:last-child td:first-child {
  border-bottom-left-radius: 1.95vw;
}
.custom-table tr:last-child td:last-child {
  border-bottom-right-radius: 1.95vw;
}

.custom-table button {
  border: none;
  border-radius: 2.6vw;
  padding: 0.65vw 2.6vw;
  background: #e3e8f0;
  color: #b71c1c;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-size: 1.3vw;
}

.custom-table button:hover {
  background: #b71c1c;
  color: #fff;
}

/* Overlay y popup */
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.35);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background: #fff;
  border-radius: 2.5vw;
  padding: 4vw 6vw;
  box-shadow: 0 7px 40px rgba(0,0,0,0.18);
  min-width: 38vw;
  max-width: 98vw;
  text-align: center;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 3vw;
  font-size: 2vw;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 2.6vw;
}

.popup-actions button {
  border: none;
  border-radius: 1.3vw;
  padding: 0.91vw 2.6vw;
  font-size: 1.3vw;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.popup-actions .yes {
  background: #b71c1c;
  color: #fff;
}

.popup-actions .no {
  background: #e3e8f0;
  color: #444;
}

.result-message {
  position: fixed;
  top: 13vh;
  left: 50%;
  transform: translateX(-50%);
  background: #1976d2;
  color: #fff;
  padding: 1.3vw 2.6vw;
  border-radius: 1.3vw;
  font-size: 1.43vw;
  z-index: 2000;
  opacity: 1;
  pointer-events: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>