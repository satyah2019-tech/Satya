import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Partners from '../components/Partners'
import './Projects.css'

const Projects = () => {
  const ongoingProjects = [
    {
      id: 1,
      title: 'Sustainable Urban Development',
      category: 'Urban Planning',
      description: 'Developing frameworks for eco-friendly city expansion and resource management in metropolitan areas.',
      status: 'Ongoing'
    },
    {
      id: 2,
      title: 'Rural Education Initiative',
      category: 'Education',
      description: 'Implementing digital literacy programs in rural communities to bridge the technological gap.',
      status: 'Ongoing'
    },
    {
      id: 3,
      title: 'Clean Water Access Study',
      category: 'Environment',
      description: 'Analyzing groundwater quality and distribution systems to improve access to safe drinking water.',
      status: 'Ongoing'
    }
  ]

  const completedProjects = [
    {
      id: 4,
      title: 'AI in Healthcare Policy',
      category: 'Policy Research',
      description: 'Researched the ethical implications and policy requirements for adopting AI in public healthcare.',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Renewable Energy Transition',
      category: 'Energy',
      description: 'Strategized the shift from fossil fuels to renewable energy sources for industrial sectors.',
      status: 'Completed'
    }
  ]

  const ProjectCard = ({ project }) => (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="project-status">{project.status}</div>
      <h3 className="project-title">{project.title}</h3>
      <span className="project-category">{project.category}</span>
      <p className="project-description">{project.description}</p>
    </motion.div>
  )

  return (
    <div className="projects-page">
      <section className="projects-hero section">
        <div className="container">
          <motion.div
            className="projects-hero-content"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="page-title">Our Projects</h1>
            <p className="page-subtitle">
              Explore our portfolio of impactful research and consulting
              engagements
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section projects-list-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Ongoing Projects</h2>
          </div>
          <div className="projects-grid">
            {ongoingProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section projects-list-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Completed Projects</h2>
          </div>
          <div className="projects-grid">
            {completedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Partners />
    </div>
  )
}

export default Projects
