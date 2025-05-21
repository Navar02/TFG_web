<template>
    <div v-if="visible" class="popup-overlay">
        <div class="popup-content">
            <div class="popup-header">
                <button class="download-btn" @click="descargarPDF">Descargar</button>
                <button class="close-btn" @click="hidePopup">&times;</button>
            </div>
            <h2 class="popup-title">
                Guía Turística de {{ mensaje.location }} - {{ mensaje.travelPlan?.duracion_viaje }} días
            </h2>
            <div class="popup-section">
                <strong>Fechas:</strong> {{ mensaje.startDate }} - {{ mensaje.endDate }}
            </div>
            <div class="popup-section">
                <strong>Gustos:</strong>
                <span v-for="(cat, idx) in mensaje.categories" :key="cat">
                    {{ cat }}<span v-if="idx < mensaje.categories.length - 1">, </span>
                </span>
            </div>
            <div class="popup-section">
                <strong>Estimación de ahorro:</strong>
                <ul>
                    <li>Energía ahorrada: {{ mensaje.travelPlan?.estimacion_ahorro?.energia_ahorrada }}</li>
                    <li>Horas estimadas ahorradas: {{ mensaje.travelPlan?.estimacion_ahorro?.horas_estimadas_ahorradas
                        }}</li>
                </ul>
            </div>
            <div class="popup-section">
                <strong>Plan de visita:</strong>
                <div v-for="dia in mensaje.travelPlan?.plan_visita" :key="dia.dia" class="day-section">
                    <div class="day-title">Día {{ dia.dia }}</div>
                    <div v-for="lugar in dia.lugares" :key="lugar.nombre" class="place-section">
                        <div class="place-name">{{ lugar.nombre }}</div>
                        <div class="place-desc">{{ lugar.descripcion }}</div>
                        <div class="place-activities">
                            <span v-for="actividad in lugar.actividades" :key="actividad">- {{ actividad }}<br /></span>
                        </div>
                        <div class="place-duration"><em>Duración: {{ lugar.duracion_visita }}</em></div>
                    </div>
                </div>
            </div>
            <div class="popup-section" style="margin-top: 1.5em;">
                <strong>Mapa:</strong>
                <l-map v-if="center" :zoom="zoom" :center="center"
                    style="height: 300px; width: 100%; border-radius: 12px; margin-top: 10px;">
                    <l-tile-layer :url="url" :attribution="attribution" />
                    <l-marker v-for="place in allPlaces" :key="place.nombre"
                        :lat-lng="[place.coordenadas.latitud, place.coordenadas.longitud]">
                        <l-popup>{{ place.nombre }}</l-popup>
                    </l-marker>
                </l-map>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref, defineProps } from 'vue'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
    visible: Boolean,
    mensaje: { type: Object, default: () => ({}) }
})

function hidePopup() {
    // Solo oculta el popup en el cliente
    window.location.reload()
}

async function descargarPDF() {
    try {
        const StringMSG = JSON.stringify(props.mensaje)
        const plan_visita = { plan_visita: JSON.parse(StringMSG) }
        console.log("plan:", plan_visita)
        const response = await fetch('http://localhost:8000/generate_pdf/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: StringMSG,
        })

        if (!response.ok) {
            throw new Error('Error al generar el PDF')
        }

        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);

        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'plan_de_viaje.pdf'; // Nombre del archivo PDF
        document.body.appendChild(link); // Agregar el enlace al DOM
        link.click(); // Simular un clic para iniciar la descarga
        document.body.removeChild(link); // Eliminar el enlace del DOM
        URL.revokeObjectURL(pdfUrl); // Liberar la URL del blob
    } catch (error) {
        console.log('Error al descargar el PDF:', error)
        alert(error.message)
    }
}

const zoom = ref(10)
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const allPlaces = computed(() => {
    if (!props.mensaje?.travelPlan?.plan_visita) return []
    return props.mensaje.travelPlan.plan_visita.flatMap(dia => dia.lugares)
})

const center = computed(() => {
    const first = allPlaces.value[0]
    return first ? [first.coordenadas.latitud, first.coordenadas.longitud] : [42.46272, -2.44797]
})

// Mostrar en consola al cargar
watch(() => props.mensaje, (nuevo) => {
    if (props.visible) {
        console.log('mensaje', nuevo)
    }
}, { immediate: true })
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.popup-content {
    background: #fff;
    border-radius: 20px;
    padding: 2em 2em 2em 2em;
    min-width: 320px;
    max-width: 98vw;
    width: 700px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
    text-align: left;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.popup-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 0.5em;
}

.download-btn {
    margin-right: auto;
    background: #1976d2;
    color: #fff;
    border: none;
    border-radius: 18px;
    padding: 8px 18px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
}

.download-btn:hover {
    background: #1251a3;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 2rem;
    color: #888;
    cursor: pointer;
    transition: color 0.2s;
    z-index: 10;
    margin-left: 10px;
}

.close-btn:hover {
    color: #1976d2;
}

.popup-title {
    text-align: center;
    font-size: 1.3em;
    font-weight: bold;
    margin-bottom: 1em;
}

.popup-section {
    margin-bottom: 1.2em;
}

.day-section {
    margin-bottom: 1em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #eee;
}

.day-title {
    font-weight: bold;
    margin-bottom: 0.5em;
    color: #1976d2;
}

.place-section {
    margin-bottom: 0.5em;
    padding-left: 1em;
}

.place-name {
    font-weight: bold;
    color: #333;
}

.place-desc {
    font-size: 0.97em;
    color: #555;
    margin-bottom: 0.2em;
}

.place-activities {
    font-size: 0.95em;
    color: #444;
    margin-bottom: 0.2em;
}

.place-duration {
    font-size: 0.93em;
    color: #888;
}
</style>