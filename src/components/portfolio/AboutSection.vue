<template>
  <section id="about" class="section about-section">
    <div class="content-box">
        <h1 class="glitch-text" data-text="Sobre Mim">Sobre Mim</h1>
        <p class="description">
         Sou um Desenvolvedor apaixonado por criar experiências digitais que combinam <strong>arte, tecnologia e performance</strong>. Especialista em interfaces 3D imersivas e animações fluidas.
        </p>
        <div class="pillars" role="list">
            <div class="pillar" role="listitem">
                <h3>Criatividade</h3>
                <p>Transformo ideias complexas em interfaces visuais impactantes e únicas.</p>
            </div>
            <div class="pillar" role="listitem">
                <h3>Design</h3>
                <p>Foco em performance, código limpo e arquitetura escalável.</p>
            </div>
            <div class="pillar" role="listitem">
                <h3>Inovação</h3>
                <p>Exploro novas fronteiras para elevar o padrão.</p>
            </div>
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-section {
    .content-box {
        max-width: 800px;
        
        h1 {
            font-size: clamp(3rem, 8vw, 4.5rem); /* tamanho da fonte responsivo */
            margin-bottom: 20px;
            position: relative;
        }

        .description {
            font-size: clamp(1rem, 2vw, 1.4rem);
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 50px;
            
            strong {
                color: #00f3ff;
                font-weight: 700;
            }
        }

        .pillars {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* grid responsivo */
            gap: 30px;
            
            .pillar {
                background: rgba(255, 255, 255, 0.02);
                border-left: 2px solid #00f3ff;
                padding: 20px;
                transition: background 0.3s;
                height: 100%;

                &:hover {
                    background: rgba(0, 243, 255, 0.05);
                }

                h3 {
                    color: #00f3ff;
                    font-size: 1.2rem;
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                p {
                    font-size: 0.95rem;
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 1.4;
                }
            }
        }
    }
}
</style>
