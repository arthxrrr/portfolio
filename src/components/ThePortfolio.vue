<script setup>
import { onMounted } from 'vue'
import NavBar from './portfolio/NavBar.vue'
import AboutSection from './portfolio/AboutSection.vue'
import TechSection from './portfolio/TechSection.vue'
import ProjectsSection from './portfolio/ProjectsSection.vue'
import FooterSection from './portfolio/FooterSection.vue'

</script>

<template>
  <div class="portfolio-content">
    
    <!-- nav -->
    <NavBar />

    <!-- sobre -->
    <AboutSection />

    <!-- tecnologias -->
    <TechSection />

    <!-- projetos -->
    <ProjectsSection />

    <!-- contato -->
    <FooterSection />

  </div>
</template>

<style scoped lang="scss">
.portfolio-content {
    background-color: transparent;
    color: white;
    font-family: 'Inter', sans-serif;
}
</style>
