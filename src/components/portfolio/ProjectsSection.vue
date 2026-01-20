<script setup>
import { ref, computed } from 'vue'
import { projects } from '../../data/portfolio.js'

// cria um array de exibição que repete projetos para parecer infinito
const projectsDisplay = computed(() => {
    return [...projects, ...projects, ...projects]
})

const scrollContainer = ref(null)

const scrollProjects = (direction) => {
    if (!scrollContainer.value) return
    
    const scrollAmount = 650 
    const currentScroll = scrollContainer.value.scrollLeft
    const targetScroll = direction === 'next' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount

    scrollContainer.value.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    })
}
</script>

<template>
  <section id="projects" class="project-section">
    <div class="project-header">
        <h2 class="section-title">Projetos</h2>
        <div class="project-nav">
            <button 
                @click="scrollProjects('prev')" 
                class="nav-btn" 
                aria-label="Previous projects"
                aria-controls="projects-carousel"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button 
                @click="scrollProjects('next')" 
                class="nav-btn" 
                aria-label="Next projects"
                aria-controls="projects-carousel"
                type="button"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
    
    <div 
        id="projects-carousel"
        class="projects-horizontal-wrapper" 
        ref="scrollContainer"
        role="region" 
        aria-label="Projects Carousel"
    >
        <div class="projects-horizontal">
            <article 
                v-for="(project, index) in projectsDisplay" 
                :key="`${project.id}-${index}`" 
                class="project-card"
            >
                <div class="project-image">
                    <img :src="project.image" :alt="project.title" loading="lazy" />
                    <div class="project-overlay">
                        <div class="project-links">
                            <a :href="project.link" target="_blank" class="btn" :aria-label="`Live demo of ${project.title}`">Live Demo</a>
                            <a :href="project.repo" target="_blank" class="btn outline" :aria-label="`GitHub repository of ${project.title}`">GitHub</a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3>{{ project.title }}</h3>
                    <p>{{ project.description }}</p>
                    <div class="tags" role="list">
                        <span 
                            v-for="tag in project.tags" 
                            :key="tag" 
                            class="tag"
                            role="listitem"
                        >{{ tag }}</span>
                    </div>
                </div>
            </article>
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-section {
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 0;

    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10% 40px;

        .section-title {
            margin-bottom: 0;
        }

        .project-nav {
            display: flex;
            gap: 15px;

            .nav-btn {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: rgba(255, 255, 255, 0.7);
                width: 56px;
                height: 56px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
                
                svg {
                    transition: transform 0.3s ease;
                }

                &:hover {
                    background: rgba(0, 243, 255, 0.1);
                    border-color: #00f3ff;
                    color: #00f3ff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 20px rgba(0, 243, 255, 0.2);
                    
                    svg {
                        transform: scale(1.1);
                    }
                }
                
                &:active {
                    transform: translateY(0);
                }
            }
        }
    }
}

.projects-horizontal-wrapper {
    width: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding-bottom: 20px;
    
    /* esconde a barra de rolagem no chrome, safari e opera e etc */
    &::-webkit-scrollbar {
        display: none;
    }
    /* esconde barra de rolagem no ie, edge e firefox */
    -ms-overflow-style: none;  /* ie e edge */
    scrollbar-width: none;  /* firefox */
}

.projects-horizontal {
    display: flex;
    gap: 50px;
    padding: 0 10%;
    width: max-content;
    will-change: transform;
}

.project-card {
    flex-shrink: 0; 
    width: 600px;
    max-width: 90vw; /* limite responsivo */
    background: rgba(255, 255, 255, 0.03);
    border-radius: 30px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: border-color 0.3s;

    &:hover {
        border-color: rgba(0, 243, 255, 0.4);
    }

    .project-image {
        position: relative;
        height: 350px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }

        .project-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s;

            .project-links {
                display: flex;
                gap: 15px;
            }
        }
    }

    &:hover .project-image img {
        transform: scale(1.1);
    }

    &:hover .project-overlay {
        opacity: 1;
    }

    .project-info {
        padding: 30px;

        h3 {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }

        p {
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 20px;
            line-height: 1.5;
        }

        .tags {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;

            .tag {
                background: rgba(0, 243, 255, 0.1);
                color: #00f3ff;
                padding: 5px 12px;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: 600;
            }
        }
    }
}

/* estilos locais de botão (se nao globais) */
.btn {
    padding: 12px 25px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s;
    background: #00f3ff;
    color: black;
    cursor: pointer;

    &.outline {
        background: transparent;
        border: 2px solid white;
        color: white;

        &:hover {
            background: white;
            color: black;
        }
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
    }
}
</style>
