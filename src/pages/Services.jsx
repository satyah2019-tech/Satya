import { useRef } from 'react'
import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import './ServicesPage.css'

const ServicesPage = () => {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = React.useState(null) // Track active card for mobile
  const [isMobile, setIsMobile] = React.useState(false)

  // Detect mobile for conditional variants
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax for ambient layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const yMath = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Floating animation variant (Ambient)
  const floatContinuous = (duration) => ({
    y: [0, -30, 0],
    opacity: [0.03, 0.05, 0.03],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut"
    }
  })

  // 3-Layer Progressive Reveal Variants
  // Desktop: Lift up (-80px). Mobile: Center (0px translation, flex handles centering).
  const titleVariant = {
    rest: { y: 0 },
    hover: {
      y: -80,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    mobileActive: {
      y: 0, // No lift needed, centering handles it
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const contentVariant = {
    rest: {
      opacity: 0,
      y: 20,
      height: 0,
      display: "none"
    },
    hover: {
      opacity: 1,
      y: -80,
      height: "auto",
      display: "block",
      transition: { duration: 0.5, ease: "easeOut" }
    },
    mobileActive: {
      opacity: 1,
      y: 0,
      height: "auto",
      display: "block",
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  const tagVariant = {
    rest: { height: 0, opacity: 0, marginBottom: 0 },
    hover: {
      height: "auto",
      opacity: 1,
      marginBottom: 16,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    mobileActive: {
      height: "auto",
      opacity: 1,
      marginBottom: 16,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const detailedServices = [
    {
      title: 'Research and Analysis',
      videoUrl: '/videos/research.mp4',
      description:
        'Comprehensive research methodologies and in-depth analysis to uncover insights that drive strategic decisions.',
      features: ['Qualitative Design', 'Meta-Analyses', 'Primary Data', 'Statistical Analysis'],
    },
    {
      title: 'Data Collection & Analysis',
      videoUrl: '/videos/data-collection.mp4',
      description:
        'Systematic data gathering and advanced analytical techniques to transform raw information into actionable intelligence.',
      features: ['Survey Design', 'Focus Groups', 'Data Mining', 'Visualization'],
    },
    {
      title: 'Consultancy Services',
      videoUrl: '/videos/consultancy.mp4',
      description:
        'Expert guidance and strategic consulting to help organizations navigate complex challenges and opportunities.',
      features: ['Strategic Planning', 'Optimization', 'Process Improvement', 'Change Management'],
    },
    {
      title: 'Sustainable Development Research',
      videoUrl: '/videos/sustainability.mp4',
      description:
        'Evidence-based research focused on creating sustainable solutions for long-term environmental and social impact.',
      features: ['Impact Assessments', 'ESG Analysis', 'Climate Adaptation', 'SDG Alignment'],
    },
    {
      title: 'Agri-Economic Research',
      videoUrl: '/videos/agri-econ.mp4',
      description:
        'Comprehensive analysis of agricultural markets, value chains, and policy impacts to drive rural economic growth.',
      features: ['Market Analysis', 'Policy Impact', 'Crop Economics', 'Supply Chain'],
    },
    {
      title: 'Socio-Economic Research',
      videoUrl: '/videos/socio-econ.mp4',
      description:
        'Studying the intersection of social factors and economic outcomes to empower communities and inform public policy.',
      features: ['Demographics', 'Social Impact', 'Inequality Studies', 'Community Dev'],
    },
    {
      title: 'Educational Economics',
      videoUrl: '/videos/edu-econ.mp4',
      description:
        'Evidence-based research on educational resource allocation, school performance, and human capital development.',
      features: ['Resource Mapping', 'Policy Evaluation', 'Skill Gap Analysis', 'ROI in Ed'],
    },
    {
      title: 'Strategic Planning',
      videoUrl: '/videos/strategy.mp4',
      description:
        'Data-driven strategic planning that aligns organizational goals with actionable roadmaps for success.',
      features: ['Competitive Analysis', 'Roadmap Development', 'KPI Definition', 'Implementation'],
    },
    {
      title: 'Monitoring And Evaluation',
      icon: '📋',
      videoUrl: '/videos/me.mp4',
      description:
        'Comprehensive monitoring and evaluation frameworks to track program effectiveness and measure long-term impact.',
      features: ['Logic Framework', 'Impact Assessment', 'Outcome Evaluation', 'Quality Assurance'],
    },
  ]

  // Helper to toggle card on mobile
  const handleCardClick = (index) => {
    if (!isMobile) return // Desktop uses hover, ignore clicks
    setActiveIndex(prev => prev === index ? null : index)
  }

  return (
    <div className="services-page" ref={containerRef}>
      {/* Ambient Math Background */}
      <div className="page-ambient-bg">
        <motion.div className="page-math-symbol pm1" animate={floatContinuous(25)} style={{ y: yMath }}>∫ dx</motion.div>
        <motion.div className="page-math-symbol pm2" animate={floatContinuous(20)} style={{ y: yMath }}>∑</motion.div>
        <motion.div className="page-math-symbol pm3" animate={floatContinuous(30)} style={{ y: yMath }}>P(A|B)</motion.div>
        <motion.div className="page-math-symbol pm4" animate={floatContinuous(22)} style={{ y: yMath }}>lim</motion.div>
      </div>

      <section className="services-hero section">
        <div className="container">
          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="page-title">Our Capabilities</h1>
            <p className="page-subtitle">
              Comprehensive solutions tailored to your research and strategic needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="detailed-services-section">
        <div className="container">
          <div className="detailed-services-grid">
            {detailedServices.map((service, index) => (
              <motion.article
                key={index}
                className={`detailed-service-panel ${activeIndex === index ? 'active' : ''}`}
                initial="rest"
                whileHover={isMobile ? undefined : "hover"} // Disable hover on mobile to prevent conflicts
                whileTap={{ scale: 0.98 }} // Visual feedback on tap
                animate={activeIndex === index ? "mobileActive" : "rest"} // Use new mobileActive variant
                onClick={() => handleCardClick(index)} // Toggle state
              >
                <div className="service-panel-media">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="service-panel-video"
                  >
                    <source src={service.videoUrl} type="video/mp4" />
                  </video>
                  <div className="service-panel-wash" />

                  {/* Interactive Content Layer */}
                  <div className="service-explore-content">
                    <motion.div
                      className="content-slide-wrapper"
                      layout // Enables smooth flexbox transition (Bottom -> Center)
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >

                      {/* 1. CAPABILITY TAG */}
                      <motion.div
                        className="explore-tag-wrapper"
                        variants={tagVariant}
                      >
                        <span className="explore-subtitle-label">CAPABILITY</span>
                      </motion.div>

                      {/* 2. MAIN TITLE */}
                      <motion.div className="explore-header-group">
                        <motion.h2 className="explore-title" variants={titleVariant}>
                          {service.title}
                        </motion.h2>
                      </motion.div>

                      {/* 3. DESCRIPTION & TAGS */}
                      <motion.div
                        className="explore-body-container"
                        variants={contentVariant}
                      >
                        <p className="explore-description">
                          {service.description}
                        </p>

                        <ul className="features-labels-list">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="feature-label">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                    </motion.div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-text">
              Let's discuss how SATYAH can help drive your organization forward.
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/contact" className="cta-button-large">
                <span className="cta-button-text">Contact Us</span>
                <span className="cta-button-arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
