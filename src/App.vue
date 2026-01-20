<script setup>
import { ref, watch, nextTick } from 'vue'
import TheIntro from './components/TheIntro.vue'
import ThePortfolio from './components/ThePortfolio.vue'
import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

const portfolioUnlocked = ref(false)

const handleUnlock = () => {
  portfolioUnlocked.value = true
  
  setTimeout(() => {
    const portfolioLayer = document.querySelector('.portfolio-layer')
    
    if (portfolioLayer) {
      portfolioLayer.style.visibility = 'visible'
      portfolioLayer.style.pointerEvents = 'auto'
      
      gsap.fromTo(portfolioLayer, 
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => {
            setTimeout(() => {
              ScrollTrigger.refresh()
            }, 100)
          }
        }
      )
    }
  }, 100)
}
</script>

<template>
  <main>
    <!-- Portfólio é sempre a base, mas começa invisível -->
    <div class="portfolio-layer" :class="{ 'unlocked': portfolioUnlocked }">
      <ThePortfolio />
    </div>

    <!-- Intro/Marca é sempre a "capa" por cima -->
    <TheIntro @unlock="handleUnlock" />
  </main>
</template>

<style scoped>
.portfolio-layer {
  position: relative;
  z-index: 1; /* Começa atrás da intro */
  background-color: transparent; 
  min-height: 100vh;
  opacity: 0; /* Começa invisível */
  visibility: hidden; /* Também esconde da acessibilidade */
  pointer-events: none; /* Previne interação quando escondido */
}

.portfolio-layer.unlocked {
  visibility: visible; /* Torna visível para o fade-in */
  pointer-events: auto; /* Habilita interação */
  z-index: 200; /* Acima de intro-root (z-index: 100) para o portfólio aparecer */
}
</style>
