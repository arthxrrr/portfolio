<script setup>
import { navLinks } from '../../data/portfolio.js'

defineProps({
  logoText: {
    type: String,
    default: 'ARTHUR HENRIQUE'
  }
})
</script>

<template>
  <nav class="glass-nav" aria-label="Main Navigation">
    <!-- logo --> 
    <div class="nav-brand">
      <span class="brand-text">{{ logoText }}</span>
    </div>
    
    <div class="links">
      <a 
        v-for="link in navLinks" 
        :key="link.href" 
        :href="link.href"
        class="nav-link"
      >
        {{ link.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped lang="scss">
/* navegação */
.glass-nav {
    position: fixed;
    top: 20px;
    left: 20px;
    right: 20px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    padding: 10px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-brand {
        display: flex;
        align-items: center;
        
        .brand-text {
            font-family: 'Syncopate', sans-serif;
            font-size: 1.1rem;
            font-weight: 700;
            letter-spacing: 2px;
            color: #00f3ff;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
            transition: all 0.3s ease;
            cursor: pointer;
            
            &:hover {
                color: #ffffff;
                text-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
            }
        }
    }

    .links {
        display: flex;
        gap: 25px;
        
        .nav-link {
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 0;
                height: 2px;
                background: #00f3ff;
                transition: width 0.3s ease;
            }

            &:hover {
                color: #00f3ff;
                text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
                
                &::after {
                    width: 100%;
                }
            }
        }
    }
}

/* ajustes responsivos para mobile */
@media (max-width: 768px) {
    .glass-nav {
        padding: 15px 20px;
        
        .nav-brand .brand-text {
            font-size: 0.9rem;
        }

        .links {
            display: none; 
        }
    }
}
</style>
