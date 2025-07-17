import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Globe, Code, Database, Cloud, Award, Calendar, Users, TrendingUp, Languages, Download } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import SkillsChart from './components/SkillsChart';
import './App.css';

// Dados multilíngues
const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      education: 'Educação',
      skills: 'Habilidades',
      contact: 'Contato'
    },
    hero: {
      greeting: 'Olá, eu sou',
      title: 'Engenheiro de Software Sênior',
      subtitle: 'Especialista em desenvolvimento full-stack com mais de 10 anos de experiência criando soluções escaláveis e inovadoras.',
      cta: 'Ver Meu Trabalho',
      downloadCV: 'Baixar CV'
    },
    about: {
      title: 'Sobre Mim',
      description: 'Sou um engenheiro de software apaixonado por tecnologia e inovação. Com mais de uma década de experiência, tenho trabalhado em projetos desafiadores que vão desde startups até grandes corporações, sempre focado em entregar soluções de alta qualidade.',
      location: 'São Paulo, Brasil',
      experience: '10+ Anos de Experiência',
      projects: '50+ Projetos Concluídos',
      languages: 'Português (Nativo), Inglês (Fluente), Espanhol (Básico)'
    },
    experience: {
      title: 'Experiência Profissional',
      current: 'Atual'
    },
    education: {
      title: 'Educação'
    },
    skills: {
      title: 'Habilidades Técnicas',
      languages: 'Linguagens de Programação',
      frameworks: 'Frameworks & Bibliotecas',
      databases: 'Bancos de Dados',
      cloud: 'Cloud & DevOps',
      tools: 'Ferramentas'
    },
    contact: {
      title: 'Entre em Contato',
      subtitle: 'Vamos conversar sobre seu próximo projeto',
      email: 'Email',
      phone: 'Telefone',
      location: 'Localização'
    }
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      contact: 'Contact'
    },
    hero: {
      greeting: 'Hello, I am',
      title: 'Senior Software Engineer',
      subtitle: 'Full-stack development specialist with over 10 years of experience creating scalable and innovative solutions.',
      cta: 'View My Work',
      downloadCV: 'Download CV'
    },
    about: {
      title: 'About Me',
      description: 'I am a software engineer passionate about technology and innovation. With over a decade of experience, I have worked on challenging projects ranging from startups to large corporations, always focused on delivering high-quality solutions.',
      location: 'São Paulo, Brazil',
      experience: '10+ Years of Experience',
      projects: '50+ Completed Projects',
      languages: 'Portuguese (Native), English (Fluent), Spanish (Basic)'
    },
    experience: {
      title: 'Professional Experience',
      current: 'Current'
    },
    education: {
      title: 'Education'
    },
    skills: {
      title: 'Technical Skills',
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Libraries',
      databases: 'Databases',
      cloud: 'Cloud & DevOps',
      tools: 'Tools'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s talk about your next project',
      email: 'Email',
      phone: 'Phone',
      location: 'Location'
    }
  }
};

// Dados da experiência profissional
const experiences = [
  {
    company: 'BairesDev',
    logo: './assets/images/logos/bairesdev.png',
    position: 'Sr Software Engineer',
    period: '12/2022 - 06/2025',
    current: true,
    description: {
      pt: 'Desenvolveu novos microserviços e APIs para melhorar funcionalidade e performance do sistema. Auxiliou equipe na preparação de tarefas e forneceu treinamento técnico para novos membros.',
      en: 'Developed new microservices and APIs to enhance system functionality and performance. Assisted team in task preparation and provided technical training to onboard new members.'
    },
    technologies: ['Golang', 'Python', 'AWS', 'MySQL', 'PHP', 'Docker', 'Kubernetes', 'RabbitMQ', 'VueJS', 'GraphQL']
  },
  {
    company: 'DBC Company',
    logo: './assets/images/logos/dbc.jpg',
    position: 'Sr Software Engineer',
    period: '09/2021 - 12/2022',
    description: {
      pt: 'Conduziu revisões de código e liderou desenvolvimento de arquitetura. Aumentou significativamente a cobertura de testes de 20% para 70%.',
      en: 'Conducted code reviews and led architecture development. Significantly increased test coverage from 20% to 70%.'
    },
    technologies: ['Golang', 'AWS', 'MySQL', 'DynamoDB', 'PHP', 'Docker', 'Kubernetes']
  },
  {
    company: 'RedVentures',
    logo: './assets/images/logos/redventures.png',
    position: 'Software Engineer',
    period: '05/2021 - 09/2021',
    description: {
      pt: 'Responsável por manutenção e criação de sistemas. Melhorou performance do sistema em 50% através de otimizações estratégicas.',
      en: 'Responsible for system maintenance and creation. Improved system performance by 50% through strategic optimizations.'
    },
    technologies: ['Golang', 'AWS', 'MySQL', 'C#', 'Docker', 'Kubernetes']
  },
  {
    company: 'Bionexo',
    logo: './assets/images/logos/bionexo.jpg',
    position: 'Software Analyst',
    period: '09/2020 - 05/2021',
    description: {
      pt: 'Conduziu tarefas de manutenção de sistema e otimização de código. Colaborou com clientes e Product Owners para coletar requisitos.',
      en: 'Conducted system maintenance tasks and code optimization. Collaborated with customers and Product Owners to gather requirements.'
    },
    technologies: ['Golang', 'AWS', 'Oracle', 'Java', 'PHP', 'Docker', 'Kubernetes']
  },
  {
    company: 'Bluefit Academia',
    logo: './assets/images/logos/bluefit.jpg',
    position: 'Tech Lead',
    period: '02/2020 - 09/2020',
    description: {
      pt: 'Liderou desenvolvimento de novos sistemas e supervisionou membros da equipe. Conduziu manutenção regular de banco de dados.',
      en: 'Led development of new systems and supervised team members. Conducted regular database maintenance.'
    },
    technologies: ['Golang', 'Java', 'PHP', 'Docker', 'SQLServer']
  },
  {
    company: 'Grupo Ideal Trends',
    logo: './assets/images/logos/ideal-trends.png',
    position: 'Software Engineer / Process Manager',
    period: '01/2018 - 01/2020',
    description: {
      pt: 'Manteve e desenvolveu mais de 50 sistemas diversos incluindo e-commerce, SaaS, ERP, CMS, portais web e sistemas de relatórios.',
      en: 'Maintained and developed over 50 diverse systems including e-commerce, SaaS, ERP, CMS, web portals, and reporting systems.'
    },
    technologies: ['PHP', 'NodeJS', 'VueJS', 'MySQL', 'MongoDB', 'Python', 'ElasticSearch', 'Docker']
  }
];

// Dados da educação
const education = [
  {
    institution: 'FIAP',
    logo: './assets/images/logos/fiap.jpg',
    degree: 'MBA - Full Stack Development',
    period: '2023-2024',
    description: {
      pt: 'Criação de uma startup',
      en: 'Creation of a startup'
    }
  },
  {
    institution: 'Senac',
    logo: './assets/images/logos/senac.png',
    degree: 'Gestão de Projetos PMI',
    period: '2022-2023',
    description: {
      pt: 'Desenvolvimento de um site para trabalho voluntário',
      en: 'Development of a website for volunteer work'
    }
  },
  {
    institution: 'FATEC Zona Sul',
    logo: './assets/images/logos/fatec.jpg',
    degree: 'Análise e Desenvolvimento de Sistemas',
    period: '2018-2021',
    description: {
      pt: 'Desenvolvimento de 2 apps mobile e uma rede social para gamers',
      en: 'Development of 2 mobile apps and one social network for gamers'
    }
  }
];

// Dados das habilidades
const skills = {
  languages: [
    { name: 'PHP', level: 95 },
    { name: 'Golang', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'JavaScript', level: 88 },
    { name: 'Java', level: 80 },
    { name: 'C#', level: 75 }
  ],
  frameworks: [
    { name: 'Laravel', level: 95 },
    { name: 'Vue.js', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 88 },
    { name: '.NET', level: 75 }
  ],
  databases: [
    { name: 'MySQL', level: 90 },
    { name: 'PostgreSQL', level: 85 },
    { name: 'MongoDB', level: 80 },
    { name: 'DynamoDB', level: 75 },
    { name: 'Oracle', level: 70 },
    { name: 'ElasticSearch', level: 75 }
  ],
  cloud: [
    { name: 'AWS', level: 90 },
    { name: 'Docker', level: 88 },
    { name: 'Kubernetes', level: 85 },
    { name: 'RabbitMQ', level: 80 },
    { name: 'GraphQL', level: 75 }
  ]
};

function App() {
  const [language, setLanguage] = useState('pt');
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  
  const t = translations[language];

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Language toggle
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              VS
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key === 'about' ? 'about' : key)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {value}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:bg-white/10"
              >
                <Languages className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </motion.div>

        <div className="container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-purple-300 text-lg mb-4">{t.hero.greeting}</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                Vinícius
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Shiguemori
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-gray-300 mb-6">{t.hero.title}</h2>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">{t.hero.subtitle}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('experience')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {t.hero.cta}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Download className="mr-2 w-4 h-4" />
                  {t.hero.downloadCV}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                <img
                  src="./assets/images/profile.jpg"
                  alt="Vinícius Shiguemori"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.about.title}</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t.about.description}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.about.location}</h3>
                  <p className="text-gray-400">São Paulo, Brasil</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.about.experience}</h3>
                  <p className="text-gray-400">10+ Anos</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.about.projects}</h3>
                  <p className="text-gray-400">50+ Projetos</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.experience.title}</h2>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                            <p className="text-purple-300 font-medium">{exp.company}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 lg:mt-0">
                            <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                              {exp.period}
                            </Badge>
                            {exp.current && (
                              <Badge className="bg-green-600/20 text-green-300">
                                {t.experience.current}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{exp.description[language]}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="border-blue-400/30 text-blue-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.education.title}</h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-16 h-16 object-contain mx-auto mb-4 rounded-lg bg-white/10 p-2"
                      />
                      <h3 className="text-xl font-semibold text-white mb-2">{edu.degree}</h3>
                      <p className="text-purple-300 font-medium mb-2">{edu.institution}</p>
                      <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                        {edu.period}
                      </Badge>
                    </div>
                    <p className="text-gray-300 text-center">{edu.description[language]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.skills.title}</h2>
          </motion.div>

          {/* Skills Charts */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SkillsChart language={language} />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Code className="w-6 h-6 mr-2 text-purple-400" />
                    {t.skills.languages}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.languages.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Frameworks */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-400" />
                    {t.skills.frameworks}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.frameworks.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Databases */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="w-6 h-6 mr-2 text-green-400" />
                    {t.skills.databases}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.databases.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cloud & DevOps */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Cloud className="w-6 h-6 mr-2 text-orange-400" />
                    {t.skills.cloud}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skills.cloud.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-white">{skill.name}</span>
                          <span className="text-gray-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t.contact.title}</h2>
            <p className="text-lg text-gray-300">{t.contact.subtitle}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.contact.email}</h3>
                  <p className="text-gray-400">shiguemori@hotmail.com</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Phone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.contact.phone}</h3>
                  <p className="text-gray-400">+55 11 97567-6977</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t.contact.location}</h3>
                  <p className="text-gray-400">São Paulo, Brasil</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Vinícius Shiguemori Shirakawabe. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

