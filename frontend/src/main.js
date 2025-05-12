import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'

loadFonts()

router.afterEach((to) => {
  document.title = to.meta.title || 'Plan Your Trip'
})

createApp(App).use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app')
