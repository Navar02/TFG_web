<template>
    <div class="user-menu">
        <div class="menu-header">
            <span class="menu-title">MENÚ</span>
        </div>
        <div v-if="userData">
            <div class="user-info" @click="toggleDropdown">
                <span>{{ userData.alias }}</span>
                <button class="menu-toggle">
                    <svg-icon type="mdi" :path="dropdownIcon" :class="{ rotated: dropdownVisible }"></svg-icon>
                </button>
            </div>
            <div v-if="dropdownVisible" class="menu">
                <div class="menu-item" @click="navigateTo('/guides')">Ver guías previas</div>
                <div class="menu-item" @click="navigateTo('/stats')">Consultar estadísticas</div>
                <div class="menu-item" @click="logout">Cerrar Sesión</div>
            </div>
        </div>
        <div v-else>
            <div class="menu">
                <div class="menu-item" @click="navigateTo('/login')">Iniciar Sesión</div>
                <div class="menu-item" @click="navigateTo('/register')">Registrarse</div>
            </div>
        </div>
    </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronDown } from "@mdi/js";

export default {
    name: "UserMenu",
    components: {
        SvgIcon,
    },
    data() {
        return {
            userData: null,
            dropdownVisible: false,
            dropdownIcon: mdiChevronDown, // Ícono de flecha hacia abajo
        };
    },
    created() {
        const storedUserData = localStorage.getItem("user_data");
        if (storedUserData) {
            this.userData = JSON.parse(storedUserData);

            // Realizar fetch para verificar los datos del usuario
            fetch("http://localhost:8000/verify/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_data: this.userData }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Verification failed");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("User verified:", data);
                })
                .catch(() => {
                    // Si falla la verificación, eliminar user_data y redirigir
                    localStorage.removeItem("user_data");
                    if (this.$route.path === "/") {
                        window.location.reload();
                    } else {
                        this.$router.push("/");
                    }
                });
        }
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        navigateTo(route) {
            this.$router.push(route);
        },
        logout() {
            localStorage.removeItem("user_data");
            if (this.$route.path === "/") {
                window.location.reload();
            } else {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style scoped>
.user-menu {
    background-color: #4a5568;
    color: white;
    width: 250px;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    top: 10px;
    right: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menu-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.menu-title {
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    color: #cbd5e0;
}

.user-info {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2d3748;
    padding: 10px;
    border-radius: 5px;
}

.menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
}

svg-icon {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
}

svg-icon.rotated {
    transform: rotate(180deg);
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    animation: slide-in 0.3s ease-in-out;
}

.menu-item {
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #cbd5e0;
    text-align: center;
    transition: background-color 0.3s ease;
}

.menu-item:hover {
    background-color: #2d3748;
}

/* Animación para el despliegue */
@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>