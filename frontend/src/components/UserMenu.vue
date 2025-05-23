<template>
    <div class="user-menu">
        <div class="menu-header">
            <span class="menu-title">MENÚ</span>
        </div>
        <div v-if="userData">
            <div class="user-info" @click="toggleDropdown">
                <button class="menu-toggle" :aria-expanded="dropdownVisible" aria-label="Abrir menú de usuario">
                    <svg-icon type="mdi" :path="dropdownIcon" :class="{ rotated: dropdownVisible }"></svg-icon>
                </button>
                <span class="user-alias">{{ userData.alias }}</span>
            </div>
            <div v-if="dropdownVisible" class="menu">
                <div class="menu-item" @click="navigateTo('/guides')">Ver guías previas</div>
                <div class="menu-item" @click="navigateTo('/stats')">Consultar estadísticas</div>
                <div 
                    class="menu-item" 
                    v-if="userData && userData.role === 'admin'" 
                    @click="navigateTo('/users')"
                >Consultar Lista de Usuarios</div>
                <div 
                    class="menu-item" 
                    v-if="userData && userData.role === 'admin'" 
                    @click="navigateTo('/platform-consumption')"
                >Consultar Consumos de la plataforma</div>
                <div class="menu-item logout" @click="logout">Cerrar Sesión</div>
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
    position: fixed;
    top: 10px;
    right: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 3000;
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
    display: flex;
    align-items: center;
    background: none;
    padding: 0;
    border-radius: 0;
    gap: 10px;
    cursor: pointer;
}

.menu-toggle {
    background: #2d3748;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 50%;
    padding: 10px;
    transition: background 0.2s, box-shadow 0.2s;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-toggle:hover, .menu-toggle:focus {
    background: #3b4252;
    box-shadow: 0 4px 12px rgba(0,0,0,0.18);
}

svg-icon {
    width: 28px;
    height: 28px;
    transition: transform 0.3s ease;
    display: block;
}

svg-icon.rotated {
    transform: rotate(180deg);
}

.user-alias {
    margin-left: 8px;
    color: #cbd5e0;
    font-weight: 600;
    font-size: 16px;
    cursor: default;
    user-select: text;
    pointer-events: none;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    animation: slide-in 0.3s ease-in-out;
}

.menu-item {
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    color: #cbd5e0;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    background-color: #3b4252;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    user-select: none;
    outline: none;
}

.menu-item:hover, .menu-item:focus {
    background-color: #2d3748;
    color: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}

.menu-item.logout {
    background-color: #b71c1c;
    color: #fff;
    font-weight: bold;
    margin-top: 10px;
    transition: background-color 0.3s, color 0.3s;
}

.menu-item.logout:hover, .menu-item.logout:focus {
    background-color: #a31515;
    color: #fff;
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