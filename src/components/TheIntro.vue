<script setup>
import { shallowRef, ref, onMounted, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { Text3D, Html } from '@tresjs/cientos'
import gsap from 'gsap'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

RectAreaLightUniformsLib.init()

const emit = defineEmits(['unlock'])

// refs para objetos 3d
const groupRef = shallowRef(null)
const arthurGroupRef = shallowRef(null)
const henriqueGroupRef = shallowRef(null)

const isExploding = ref(false)
const loadingProgress = ref(0)
const showLoader = ref(true)
const animationComplete = ref(false)
const fontPath = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json'

const cameraRef = shallowRef(null)

const neonMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x000000, 
  emissive: 0x00f3ff, 
  emissiveIntensity: 1.5, // Stronger neon
  roughness: 0,
  metalness: 0,
  transparent: true,
  opacity: 1
})

const initialChaos = {
    ax: 0, ay: 0, az: 0, 
    arx: 0, ary: 0, arz: 0,
    hx: 0, hy: 0, hz: 0,
    hrx: 0, hry: 0, hrz: 0,
    scale: 0
}

// sequencia de carregamento
onMounted(() => {
    startLoadingSequence()
})

function startLoadingSequence() {
    const duration = 2500 
    const interval = 30
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
        currentStep++
        const progress = Math.min(Math.round((currentStep / steps) * 100), 100)
        loadingProgress.value = progress
        
        if (progress >= 100) {
            if (arthurGroupRef.value && henriqueGroupRef.value) {
                clearInterval(timer)
                finalizeLoading()
            } else if (currentStep > steps + 100) {
                clearInterval(timer)
                finalizeLoading()
            }
        }
    }, interval)
}

function finalizeLoading() {
    setTimeout(() => {
        showLoader.value = false 
        setTimeout(() => {
            startAnimation()
        }, 800)
    }, 500)
}

function startAnimation() {
    if (cameraRef.value) {
        cameraRef.value.position.set(0, 0, 12)
    }

    const tl = gsap.timeline()

    const isMobile = window.innerWidth < 768
    const spreadDistance = isMobile ? 1.5 : 4.5 
    const initialScale = isMobile ? 0.6 : 1 
    
    tl.to([arthurGroupRef.value.scale, henriqueGroupRef.value.scale], {
        x: initialScale, y: initialScale, z: initialScale,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out"
    }, 0)

    if (isMobile) {
        tl.to(arthurGroupRef.value.position, { x: 0, y: spreadDistance, duration: 1, ease: "expo.out" }, 0.4)
        tl.to(henriqueGroupRef.value.position, { x: 0, y: -spreadDistance, duration: 1, ease: "expo.out" }, 0.4)
    } else {
        tl.to(arthurGroupRef.value.position, { x: -spreadDistance, y: 0, duration: 1, ease: "expo.out" }, 0.4)
        tl.to(henriqueGroupRef.value.position, { x: spreadDistance, y: 0, duration: 1, ease: "expo.out" }, 0.4)
    }

    tl.to(neonMaterial, {
        emissiveIntensity: 5,
        duration: 0.8,
        ease: "power4.out"
    }, 0.4)

    tl.call(() => {
        try {
            animateToHeader()
        } catch (e) {
            forceFinish()
        }
    }, null, "+=0.1")
}

function forceFinish() {
    animationComplete.value = true
    const introRoot = document.querySelector('.intro-root')
    if (introRoot) introRoot.style.display = 'none'
    emit('unlock')
}


// ... helper function unchanged ...

function animateToHeader() {
    emit('unlock')
    const introRoot = document.querySelector('.intro-root')
    const introBg = document.querySelector('.intro-bg')
    
    const targetPos = getDoomedPosition('.brand-text', cameraRef.value, 0)

    if (introRoot) {
        introRoot.style.pointerEvents = 'none'
        introRoot.style.backgroundColor = 'transparent'
    }
    
    if (introBg) {
        gsap.to(introBg, { 
            opacity: 0, duration: 2.5, ease: 'power2.inOut',
            onComplete: () => { introBg.style.display = 'none' }
        })
    }
    
    const timeline = gsap.timeline()
    
    const isMobile = window.innerWidth < 768
    const finalScale = isMobile ? 0.09 : 0.12 
    const finalSpacing = isMobile ? 2.8 : 3.5

    timeline.to(groupRef.value.position, {
        x: targetPos.x, y: targetPos.y, z: 0,
        duration: 2.5, ease: 'expo.inOut'
    })
    
    timeline.to(arthurGroupRef.value.position, {
        x: -finalSpacing, y: 0, 
        duration: 2.0, ease: 'expo.inOut'
    }, '<')

    timeline.to(henriqueGroupRef.value.position, {
        x: finalSpacing, y: 0,
        duration: 2.0, ease: 'expo.inOut'
    }, '<')

    timeline.to(groupRef.value.rotation, {
        x: 0, y: 0, z: 0,
        duration: 2.0, ease: 'expo.inOut'
    }, '<') 
    
    timeline.to(groupRef.value.scale, {
        x: finalScale, y: finalScale, z: finalScale, 
        duration: 2.5,
        ease: 'expo.inOut'
    }, '<')
    
    timeline.to(neonMaterial, {
        emissiveIntensity: 10,
        duration: 0.2, 
        ease: 'power2.out'
    }, '-=0.2')
    
    timeline.to(neonMaterial, {
        emissiveIntensity: 0,
        opacity: 0,
        duration: 0.2, 
        ease: 'power2.in',
        onComplete: () => {
            animationComplete.value = true
            if (introRoot) {
                introRoot.style.display = 'none'
            }
        }
    }, '>') 
}
</script>

<template>
  <div class="intro-root" :class="{ 'animation-complete': animationComplete }">
    <!-- Removed intro-bg to ensure zero blocking -->
    <!-- Plain HTML Loader - always works -->
    <transition name="fade">
        <div v-if="showLoader" class="loader-overlay">
            <div class="loader-count">{{ loadingProgress }}%</div>
            <div class="loader-bar">
                <div class="loader-progress" :style="{ width: loadingProgress + '%' }"></div>
            </div>
        </div>
    </transition>

    <!-- shockwave overlay -->
    <div v-if="isExploding" class="shockwave"></div>

    <div class="canvas-layer">
        <TresCanvas 
            window-size 
            alpha 
            :clear-color="[0,0,0,0]"
        >
            <TresPerspectiveCamera 
                ref="cameraRef"
                :position="[0, 0, 12]" 
                :look-at="[0, 0, 0]" 
            />
            
            <TresGroup ref="groupRef">
                <TresPointLight :position="[0, 0, 5]" :intensity="50" color="#00f3ff" />
                <TresRectAreaLight :position="[0, 5, 5]" :intensity="50" width="10" height="2" color="white" :look-at="[0,0,0]" />
                <TresAmbientLight :intensity="1" />
                
                <Suspense>
                    <TresGroup>
                        <TresGroup 
                            ref="arthurGroupRef"
                            :position="[initialChaos.ax, initialChaos.ay, initialChaos.az]"
                            :rotation="[initialChaos.arx, initialChaos.ary, initialChaos.arz]"
                            :scale="[initialChaos.scale, initialChaos.scale, initialChaos.scale]"
                        >
                            <Text3D
                                :font="fontPath" :size="1" :height="0.2" center :material="neonMaterial"
                            >
                                ARTHUR
                            </Text3D>
                        </TresGroup>

                        <TresGroup 
                            ref="henriqueGroupRef"
                            :position="[initialChaos.hx, initialChaos.hy, initialChaos.hz]"
                            :rotation="[initialChaos.hrx, initialChaos.hry, initialChaos.hrz]"
                            :scale="[initialChaos.scale, initialChaos.scale, initialChaos.scale]"
                        >
                            <Text3D
                                :font="fontPath" :size="1" :height="0.2" center :material="neonMaterial"
                            >
                                HENRIQUE
                            </Text3D>
                        </TresGroup>
                    </TresGroup>
                </Suspense>
            </TresGroup>
        </TresCanvas>
    </div>
  </div>
</template>

<style scoped>
.intro-root {
    position: fixed;
    inset: 0;
    z-index: 10000; 
    pointer-events: auto; 
    background-color: transparent;
    overflow: visible; 
    
    &.animation-complete {
        /* After animation, hide completely */
        opacity: 0;
        pointer-events: none;
        display: none;
    }
}

.intro-bg {
    position: absolute;
    inset: 0;
    background-color: #000;
    z-index: 0;
    pointer-events: none;
}

.canvas-layer {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    overflow: visible; 
}

.canvas-layer canvas {
    mix-blend-mode: screen !important; 
    pointer-events: none !important;
    background: transparent !important; 
}

/* background auroraa */
:global(body) {
    background: radial-gradient(circle at 50% 50%, #1a0b2e 0%, #000000 100%);
}

.shockwave {
    position: fixed;
    inset: 0;
    width: 100vw; height: 100vh;
    background: radial-gradient(circle, rgba(0,243,255,0.6) 0%, rgba(0,243,255,0.2) 40%, rgba(0,0,0,0) 70%); 
    animation: flash 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen; 
    transform-origin: center;
    filter: blur(40px); 
}

@keyframes flash {
    0% { opacity: 0; transform: scale(0.5); }
    10% { opacity: 1; transform: scale(1); }
    100% { opacity: 0; transform: scale(4); } 
}

.loader-overlay {
    position: fixed;
    inset: 0;
    width: 100vw; height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 20000; 
    color: white !important; 
    font-family: 'Courier New', Courier, monospace; 
    pointer-events: auto; 
}

.loader-count {
    font-size: clamp(3.2rem, 12vw, 8rem);
    font-weight: 900;
    margin-bottom: 20px;
    letter-spacing: -2px;
    color: #00f3ff;
    text-shadow: 0 0 40px rgba(0, 243, 255, 0.8), 2px 2px 0px #000;
    font-family: 'Syncopate', sans-serif;
    line-height: 1;
    z-index: 10;
}

.loader-bar {
    width: 240px;
    height: 4px;
    background: rgba(255,255,255,0.05);
    position: relative;
    overflow: hidden;
}

.loader-progress {
    height: 100%;
    background: #00f3ff; 
    box-shadow: 0 0 10px #00f3ff;
    transition: width 0.1s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: opacity 0.8s ease, visibility 0s linear 0.8s;
}

.fade-leave-to {
  opacity: 0;
  visibility: hidden;
}
</style>
