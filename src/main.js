import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const app = createApp(App)

// Initialize Lenis
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

app.mount('#app')
