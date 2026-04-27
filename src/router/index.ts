import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import TranslatorTool from '../tools/translator/TranslatorTool.vue'
import TypeChart from '../pages/TypeChart.vue'
import PetEncyclopedia from '../pages/PetEncyclopedia.vue'
import EggHatching from '../pages/EggHatching.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/translator', component: TranslatorTool },
  { path: '/type-chart', component: TypeChart },
  { path: '/pet-encyclopedia', component: PetEncyclopedia },
  { path: '/egg-hatching', component: EggHatching },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
