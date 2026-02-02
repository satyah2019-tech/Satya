import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

const ProjectCard = ({ project, onClick }) => (
  <motion.div
    className="project-card clickable"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    onClick={onClick}
    whileHover={{ y: -5 }}
  >
    <div className="project-card-header">
      <div className="project-client">{project.client}</div>
      <div className="project-status">{project.status}</div>
    </div>
    <h3 className="project-title">{project.title}</h3>
    <span className="project-category">{project.category}</span>
    <p className="project-description">{project.description}</p>
  </motion.div>
)

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="project-modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header-new">
          <div className="modal-tags">
            <span className="modal-category-badge">{project.category}</span>
            <span className={`modal-status-badge ${project.status?.toLowerCase() === 'ongoing' ? 'ongoing' : 'completed'}`}>
              {project.status}
            </span>
          </div>

          <h2 className="modal-title-large">{project.title}</h2>

          {project.client && (
            <div className="modal-client-highlight">
              <span className="client-label">Client</span>
              <span className="client-name">{project.client}</span>
            </div>
          )}
        </div>

        <div className="modal-body">
          <p className="modal-description-large">{project.description}</p>

          <div className="modal-details-grid">
            {project.duration && (
              <div className="detail-card">
                <span className="detail-icon">📅</span>
                <div className="detail-info">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{project.duration}</span>
                </div>
              </div>
            )}
            {project.location && (
              <div className="detail-card">
                <span className="detail-icon">📍</span>
                <div className="detail-info">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{project.location}</span>
                </div>
              </div>
            )}
            {project.sampleSize && (
              <div className="detail-card">
                <span className="detail-icon">👥</span>
                <div className="detail-info">
                  <span className="detail-label">Sample Size</span>
                  <span className="detail-value">{project.sampleSize}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Google Sheet CSV URL
// Note: We use 'pub?output=csv' to get raw data
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7WoVBK-F6loluRyq9dokodhI3htugST0uauLjtzfvZFDcwWoADo2geeEt1xnx7iF2jq6gqK2mq0wo/pub?output=csv'

const parseCSV = (text) => {
  const lines = text.split(/\r\n|\n/)
  if (lines.length < 2) return [] // No data

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))

  const result = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue

    const values = []
    let currentValue = ''
    let withinQuotes = false

    for (let j = 0; j < line.length; j++) {
      const char = line[j]

      if (char === '"') {
        if (j < line.length - 1 && line[j + 1] === '"') {
          // Handle escaped quotes if any (rare in simple sheets but good practice)
          currentValue += '"'
          j++
        } else {
          withinQuotes = !withinQuotes
        }
      } else if (char === ',' && !withinQuotes) {
        values.push(currentValue.trim().replace(/^"|"$/g, ''))
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ''))

    const obj = { id: i } // Default ID from row index
    headers.forEach((header, index) => {
      if (values[index] !== undefined) {
        obj[header] = values[index]
      }
    })
    result.push(obj)
  }
  return result
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(GOOGLE_SHEET_URL)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }
        const text = await response.text()
        const parsedData = parseCSV(text)
        setProjects(parsedData)
        setLoading(false)
      } catch (err) {
        console.error("Project fetch error:", err)
        setError("Unable to load projects at the moment. Please try again later.")
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const ongoingProjects = projects.filter(p => !p.status || p.status.trim().toLowerCase() === 'ongoing')
  const completedProjects = projects.filter(p => p.status && p.status.trim().toLowerCase() === 'completed')

  if (loading) {
    return (
      <div className="projects-page" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-spinner">Loading Projects...</div>
      </div>
    )
  }

  if (error) {
    // Fallback to empty or show error, but keeping the page structure might be better
    // For now, let's show the error clearly so user knows what's wrong
    return (
      <div className="projects-page" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer' }}>Retry</button>
      </div>
    )
  }






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
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
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
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
