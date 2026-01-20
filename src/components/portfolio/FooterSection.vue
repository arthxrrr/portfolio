<script setup>
import { navLinks, socialLinks, personalInfo } from '../../data/portfolio.js'

</script>

<template>
  <footer id="contact" class="footer">
    <div class="footer-cta">
        <h2 class="cta-title">Entre em contato</h2>
        <div class="cta-line"></div>
    </div>
    <div class="footer-grid">
        <div class="footer-col">
            <h3>Contato</h3>
            <a :href="`mailto:${personalInfo.email}`">{{ personalInfo.email }}</a>
            <p>{{ personalInfo.location }}</p>
        </div>
        <div class="footer-col">
            <h3>Social</h3>
            <div class="social-links">
                <a 
                    v-for="social in socialLinks" 
                    :key="social.name" 
                    :href="social.href"
                    target="_blank"
                >
                    {{ social.name }}
                </a>
            </div>
        </div>
        <div class="footer-col">
            <h3>Meu Currículo</h3>
            <a :href="personalInfo.resumeUrl" download class="resume-link">
                Baixar PDF
            </a>
        </div>
    </div>
    <p class="copy">© {{ new Date().getFullYear() }} {{ personalInfo.name }}.</p>
  </footer>
</template>

<style scoped lang="scss">
.footer {
    padding: 120px 10% 40px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(to right, transparent, #00f3ff, transparent);
        opacity: 0.3;
    }

    .footer-cta {
        margin-bottom: 80px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .cta-title {
            font-size: clamp(2.5rem, 6vw, 5rem);
            font-weight: 900;
            line-height: 1;
            margin-bottom: 20px;
            background: linear-gradient(to bottom, #ffffff 30%, rgba(255, 255, 255, 0.4));
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -2px;
        }

        .cta-line {
            width: 60px;
            height: 2px;
            background: #00f3ff;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
            border-radius: 2px;
        }
    }

    .footer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        margin-bottom: 60px;

        .footer-col {
            padding: 25px;
            background: rgba(255, 255, 255, 0.02);
            border-left: 2px solid rgba(0, 243, 255, 0.3);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;

            &:hover {
                background: rgba(255, 255, 255, 0.04);
                border-left-color: #00f3ff;
                transform: translateX(5px);
            }

            h3 {
                font-size: 0.7rem;
                text-transform: uppercase;
                color: #00f3ff;
                letter-spacing: 3px;
                margin-bottom: 20px;
                font-weight: 700;
            }

            a {
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                font-size: 1.1rem;
                transition: all 0.3s;
                display: block;
                margin-bottom: 8px;

                &:hover {
                    color: #fff;
                    padding-left: 5px;
                }
            }

            p {
                color: rgba(255, 255, 255, 0.5);
                font-size: 0.9rem;
                line-height: 1.6;
            }

            .social-links {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .resume-link {
                display: inline-flex !important;
                align-items: center;
                gap: 12px;
                background: rgba(0, 243, 255, 0.05);
                padding: 12px 24px;
                border-radius: 4px;
                border: 1px solid rgba(0, 243, 255, 0.2);
                font-size: 0.9rem !important;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-top: 5px;
                color: #00f3ff !important;
                
                &:hover {
                    background: #00f3ff;
                    color: #000 !important;
                    box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
                    padding-left: 24px; 
                }
            }
        }
    }

    .copy {
        color: rgba(255, 255, 255, 0.2);
        font-size: 0.75rem;
        border-top: 1px solid rgba(255, 255, 255, 0.03);
        padding-top: 30px;
        text-align: center;
        letter-spacing: 1px;
    }
}
</style>
