import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
});

export const useUIStore = defineStore('ui', {
  state: () => ({
    mostrarContenido: false
  }),
  actions: {
    toggleContenido() {
      this.mostrarContenido = !this.mostrarContenido;
    }
  }
});
