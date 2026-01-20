export const technologies = [
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'JavaScript', icon: '📜' },
    { name: 'Vue.js', icon: '🚀' },
    { name: 'React', icon: '⚛️' },
    { name: 'Tailwind CSS', icon: '🌊' },
    { name: 'SQL', icon: '🗄️' },
    { name: 'PHP', icon: '🐘' },
]

export const projects = [
    {
        id: 1,
        title: 'Portfólio Pessoal',
        description: 'Portfólio pessoal desenvolvido com Vue 3 (Composition API), Three.js e GSAP. Utiliza 3D em tempo real, animações coordenadas, SCSS e smooth scroll com Lenis.',
        image: '/projects/1.png',
        link: 'https://example.com',
        repo: 'https://github.com',
        tags: ['Vue', 'Three.js', 'GSAP']
    },
    {
        id: 2,
        title: 'Dashboard Financeiro',
        description: 'Desenvolvimento de aplicação web financeira utilizando React, Vite, Tailwind CSS e Supabase Implementação de autenticação segura, gerenciamento de estado global e integração com banco PostgreSQL Criação de dashboard interativo com visualização de dados (Chart.js).',
        image: '/projects/5.png',
        link: 'https://example.com',
        repo: 'https://github.com',
        tags: ['React', 'Chart.js', 'Supabase']
    },
    {
        id: 3,
        title: 'Api de Clima',
        description: 'Desenvolvimento de aplicação web de previsão do tempo utilizando Vue 3, Vite, Tailwind CSS e Pinia. Implementação de visualização de dados climáticos com gráficos interativos usando Chart.js e PWA com Vite PWA.',
        image: '/projects/7.png',
        link: 'https://example.com',
        repo: 'https://github.com',
        tags: ['Vue', 'Tailwind CSS', 'PWA']
    }
]

export const navLinks = [
    { href: '#about', label: 'Sobre' },
    { href: '#tech', label: 'Tech' },
    { href: '#projects', label: 'Projetos' },
    { href: '#contact', label: 'Contato' }
]

export const socialLinks = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/arthur-henrique-rech-b7339a359' },
    { name: 'GitHub', href: 'https://github.com/arthxrrr' },
    { name: 'Instagram', href: 'https://www.instagram.com/arthxr.hxnrique/' }
]

export const personalInfo = {
    name: 'Arthur Henrique',
    email: 'arthurhenriquerech@gmail.com',
    location: 'Joinville, Santa Catarina',
    resumeUrl: '/projects/curriculo.pdf'
}
