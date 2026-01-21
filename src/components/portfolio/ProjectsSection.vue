<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { projects } from '../../data/portfolio.js'

const baseUrl = import.meta.env.BASE_URL

const scrollContainer = ref(null)
const scrollProgress = ref(0)
const showPrevBtn = ref(false)
const showNextBtn = ref(true)

// Resolve o caminho da imagem baseado no BASE_URL do Vite
const resolveImagePath = (path) => {
    return `${baseUrl}${path}`
}

// Atualiza o progresso do scroll e a visibilidade dos botões de navegação
const updateScrollMetadata = () => {
    if (!scrollContainer.value) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
    const maxScroll = scrollWidth - clientWidth
    
    // Calcula a porcentagem de progresso (0 a 100)
    scrollProgress.value = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    
    // Controle de visibilidade com um pequeno "buffer" de 10px para evitar oscilações
    showPrevBtn.value = scrollLeft > 10
    showNextBtn.value = scrollLeft < maxScroll - 10
}

// Lógica de scroll suave acionada pelos botões
const scrollProjects = (direction) => {
    if (!scrollContainer.value) return
    
    // Cálculo dinâmico do deslocamento: largura do card + espaçamento (gap)
    const cardElement = scrollContainer.value.querySelector('.project-card-refined')
    const scrollAmount = cardElement ? cardElement.offsetWidth + 40 : 660
    
    const targetScroll = direction === 'next' 
        ? scrollContainer.value.scrollLeft + scrollAmount 
        : scrollContainer.value.scrollLeft - scrollAmount

    scrollContainer.value.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
    })
}

onMounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.addEventListener('scroll', updateScrollMetadata)
        updateScrollMetadata()
    }
})

onUnmounted(() => {
    if (scrollContainer.value) {
        scrollContainer.value.removeEventListener('scroll', updateScrollMetadata)
    }
})
</script>

<template>
  <section id="projects" class="project-section">
    <div class="section-top">
        <h2 class="section-title">Projetos</h2>
    </div>

    <div class="slider-container">
        <!-- Controles de Navegação Dinâmicos -->
        <transition name="fade">
            <button 
                v-show="showPrevBtn" 
                @click="scrollProjects('prev')" 
                class="nav-btn prev" 
                aria-label="Ver projeto anterior"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M15 18L9 12L15 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </transition>
        
        <transition name="fade">
            <button 
                v-show="showNextBtn" 
                @click="scrollProjects('next')" 
                class="nav-btn next" 
                aria-label="Ver próximo projeto"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M9 18L15 12L9 6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </transition>

        <!-- Container de Scroll Horizontal -->
        <div class="scroll-wrapper" ref="scrollContainer">
            <div class="projects-track">
                <article 
                    v-for="(project, index) in projects" 
                    :key="project.id" 
                    class="project-card-refined"
                >
                    <div class="card-inner">
                        <div class="project-media">
                            <img :src="resolveImagePath(project.image)" :alt="project.title" loading="lazy" />
                            <div class="media-overlay">
                                <div class="action-buttons">
                                    <a :href="project.link" target="_blank" class="main-btn">Visitar Site</a>
                                    <a :href="project.repo" target="_blank" class="sub-btn">Repositório</a>
                                </div>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="info-header">
                                <span class="index-tag">PROJETO {{ index + 1 }}</span>
                                <h3>{{ project.title }}</h3>
                            </div>
                            <p class="description-text">{{ project.description }}</p>
                            <div class="tech-tags">
                                <span v-for="tag in project.tags" :key="tag" class="tech-tag">{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </article>
                <div class="scroll-spacer"></div>
            </div>
        </div>
    </div>

    <!-- Barra de Progresso Inferior -->
    <div class="section-bottom">
        <div class="progress-bar-wrap">
            <div class="progress-fill" :style="{ width: `${scrollProgress}%` }"></div>
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.project-section {
    min-height: 100vh;
    padding: 100px 0;
    background: #000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.section-top {
    padding: 0 5%;
    margin-bottom: 40px;

    .section-title {
        font-size: clamp(2.5rem, 6vw, 4rem);
        font-weight: 800;
        letter-spacing: -2px;
        color: #fff;
    }
}

.slider-container {
    position: relative;
    width: 100%;
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(10px);
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
        background: #fff;
        color: #000;
        border-color: #fff;
        transform: translateY(-50%) scale(1.1);
    }

    &:focus-visible {
        outline: 2px solid #00f3ff;
        outline-offset: 4px;
    }

    &.prev { left: 2%; }
    &.next { right: 2%; }
}

/* Animações de Fade para os Botões */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-50%) scale(0.8);
}

.scroll-wrapper {
    width: 100%;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 20px 0;
    cursor: grab;
    
    &::-webkit-scrollbar { display: none; }
    scrollbar-width: none;

    &:active {
        cursor: grabbing;
    }
}

.projects-track {
    display: flex;
    gap: 40px;
    padding: 0 10%;
    width: max-content;
}

.project-card-refined {
    width: 620px;
    max-width: 85vw;
    flex-shrink: 0;

    .card-inner {
        background: #0a0a0a;
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 28px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition: border-color 0.3s, transform 0.3s;
        height: 100%; // Mantém altura consistente entre cards

        &:hover {
            border-color: rgba(0, 243, 255, 0.2);
            transform: translateY(-5px);
        }
    }
}

.project-media {
    position: relative;
    height: 320px;
    flex-shrink: 0;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    .media-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(4px);
    }

    .action-buttons {
        display: flex;
        gap: 12px;
        transform: translateY(10px);
        transition: transform 0.3s ease;
    }
}

.project-card-refined:hover {
    .project-media img { transform: scale(1.03); }
    .media-overlay { opacity: 1; }
    .action-buttons { transform: translateY(0); }
}

.main-btn, .sub-btn {
    padding: 10px 22px;
    border-radius: 100px;
    font-weight: 700;
    text-decoration: none;
    font-size: 0.85rem;
    transition: all 0.3s;
}

.main-btn {
    background: #00f3ff;
    color: #000;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
    }
}

.sub-btn {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
}

.project-info {
    padding: 30px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .info-header {
        margin-bottom: 15px;

        .index-tag {
            color: rgba(0, 243, 255, 0.6);
            font-weight: 800;
            font-size: 0.75rem;
            letter-spacing: 2px;
            display: block;
            margin-bottom: 5px;
        }

        h3 {
            font-size: 1.7rem;
            font-weight: 700;
            color: #fff;
        }
    }

    .description-text {
        color: rgba(255, 255, 255, 0.5);
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 25px;
    }

    .tech-tags {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: auto; // Mantém as tags na parte inferior

        .tech-tag {
            font-size: 0.7rem;
            background: rgba(255, 255, 255, 0.05);
            color: rgba(255, 255, 255, 0.4);
            padding: 4px 12px;
            border-radius: 100px;
            font-weight: 600;
            text-transform: uppercase;
        }
    }
}

.scroll-spacer {
    width: 10vw;
    flex-shrink: 0;
}

.section-bottom {
    padding: 0 5%;
    margin-top: 40px;

    .progress-bar-wrap {
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.05);
        position: relative;
    }

    .progress-fill {
        position: absolute;
        height: 100%;
        background: #00f3ff;
        transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: 0 0 10px rgba(0, 243, 255, 0.4);
    }
}

@media (max-width: 768px) {
    .project-section { padding: 60px 0; }
    
    .nav-btn { display: none; }
    
    .project-card-refined { width: 85vw; }
    
    .project-media { height: 230px; }
    
    .projects-track { padding: 0 7%; }
    
    .project-info {
        padding: 22px;
        h3 { font-size: 1.4rem !important; }
    }
}
</style>
