<template>
    <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
        <div class="header">
            <div class="logo">
                <img :src="logo" alt="logo de la web" />
            </div>
            <button class="menu-toggle" @click="ToggleMenu">
                <svg-icon type="mdi" :path="path" :class="{ rotated: is_expanded }"></svg-icon>
            </button>
        </div>

        <div v-if="is_expanded">
            <h3>Menú</h3>
            <div class="menu">
                <router-link to="/" class="button">
                    <span class="material-icons">Inicio</span>
                </router-link>
                <router-link to="/about" class="button">
                    <span class="material-icons">Acerca de la web</span>
                </router-link>
                <router-link to="/planner" class="button">
                    <span class="material-icons">Planificador de Guías Turísticas</span>
                </router-link>
            </div>
        </div>
    </aside>
</template>

<script>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDoubleRight } from '@mdi/js';
import logo from './LogoWeb.png';

export default {
    name: 'SideBarMenu',
    components: {
        SvgIcon,
    },
    setup() {
        const is_expanded = ref(localStorage.getItem('is_expanded') === 'true');
        const path = mdiChevronDoubleRight;

        const ToggleMenu = () => {
            is_expanded.value = !is_expanded.value;
            localStorage.setItem('is_expanded', is_expanded.value);
        };

        return {
            is_expanded,
            path,
            ToggleMenu,
            logo,
        };
    },
};
</script>

<style scoped>
aside {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #5a6a7a;
    /* Color oscuro */
    color: #ecf0f1;
    /* Color claro */
    overflow: hidden;
    transition: width 0.5s ease-in-out, height 0.5s ease-in-out;
    /* Transición suave para el despliegue */
    z-index: 1000;
    /* Asegurarse de que esté sobre otros elementos */
    width: fit-content;
    /* Ajustar el ancho al contenido del logo y el botón */
    height: auto;
    /* Ajustar la altura automáticamente */
    border: 1px solid #34495e;
    /* Borde gris oscuro */
    border-bottom-right-radius: 2rem;
    /* Borde redondeado */
}

.is-expanded {
    width: auto;
    /* Ajustar el ancho al contenido */
    height: auto;
    /* Ajustar la altura automáticamente */
    border-bottom-right-radius: 2rem;
    /* Borde redondeado al desplegar */
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Espaciado entre logo y flecha */
    padding: 0.5rem 1rem;
}

.logo img {
    width: 5rem;
    height: auto;
    /* Ajustar tamaño del logo */
}

.menu-toggle {
    background: none;
    border: none;
    cursor: pointer;
    color: #ecf0f1;
    font-size: 2rem;
    /* Aumentar tamaño del botón */
}

.menu-toggle:hover {
    color: #3498db;
}

svg-icon {
    width: 6rem;
    /* Aumentar tamaño del ícono */
    height: 6rem;
    transition: transform 0.3s ease;
    /* Transición suave para la rotación */
}

.rotated {
    transform: rotate(180deg);
    /* Rotación de 180 grados */
}

h3 {
    color: #95a5a6;
    font-size: 1rem;
    margin-bottom: 1rem;
    text-align: center;
    text-transform: uppercase;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    animation: slide-in 0.5s ease-in-out;
    /* Animación para el despliegue */
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateX(-20%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.button {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    color: #ecf0f1;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
    background-color: #34495e;
    color: #3498db;
}

.button .material-icons {
    font-size: 1.5rem;
    margin-right: 1rem;
}

.text {
    font-size: 1rem;
}

.is-expanded .text {
    font-size: 1.2rem;
    /* Ajustar tamaño de texto al desplegar */
}

@media (max-width: 768px) {
    .is-expanded {
        width: 50vw;
        /* En pantallas pequeñas, usar 50% del ancho */
    }

    .button .material-icons {
        font-size: 1.2rem;
    }

    .text {
        font-size: 0.9rem;
    }
}
</style>