<script setup>
import { technologies } from '../../data/portfolio.js'
</script>

<template>
  <section id="tech" class="section tech-section">
    <h2 class="section-title">Tecnologias</h2>
    <div class="tech-grid" role="list">
        <div 
          v-for="tech in technologies" 
          :key="tech.name" 
          class="tech-card"
          tabindex="0"
          role="listitem"
          :aria-label="`Tecnologia: ${tech.name}`"
        >
            <span class="tech-icon" aria-hidden="true">{{ tech.icon }}</span>
            <span class="tech-name">{{ tech.name }}</span>
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); /* otimizado para cards */
    gap: 20px;
    max-width: 1000px;
    width: 100%;
}

.tech-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    backdrop-filter: blur(5px);
    cursor: default;

    &:hover, &:focus {
        background: rgba(0, 243, 255, 0.05);
        border-color: #00f3ff;
        transform: translateY(-10px);
        outline: none;
        
        .tech-icon {
            transform: scale(1.2) rotate(5deg);
        }
    }

    .tech-icon {
        font-size: 2.5rem;
        transition: transform 0.3s;
    }

    .tech-name {
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
    }
}
</style>
