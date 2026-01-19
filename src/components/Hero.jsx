import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Hero.css'

import LiquidGrid from './LiquidGrid'

const Hero = () => {
  const heroRef = useRef(null)

  // Parallax for ambient layers
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  // Reduced parallax range for smoother feel, since we have 3D motion now
  const yMath = useTransform(scrollYProgress, [0, 1], [0, -50])

  // yGrid is no longer needed for the 3D component directly, 
  // unless we pass it as a prop, but let's keep it simple first.

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.15 } }
  }

  // Floating animation variant for math symbols
  const floatContinuous = (duration) => ({
    y: [0, -40, 0],
    x: [0, 15, 0],
    opacity: [0.04, 0.08, 0.04],
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1]
    }
  })

  return (
    <section className="hero" ref={heroRef}>
      {/* Background Layer: Minimal Gradient + 3D Liquid Grid */}
      <div className="hero-background-ambient">
        <div className="hero-grid-3d-container">
          <LiquidGrid />
        </div>
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left Column: Content */}
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 className="hero-headline" variants={fadeUp}>
              Research-led insight for smarter decisions.
            </motion.h1>

            <motion.p className="hero-subheading" variants={fadeUp}>
              SATYAH helps organizations turn data, strategy, and sustainability into clear, actionable direction.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <Link to="/services" className="hero-btn-primary">
                Explore Our Services <span className="arrow">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Ambient Math Visuals */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ y: yMath }}
          >
            <div className="math-ambient-container">
              <motion.div
                className="math-symbol s1"
                animate={floatContinuous(18)}
              >
                ∫ f(x) dx
              </motion.div>
              <motion.div
                className="math-symbol s2"
                animate={floatContinuous(25)}
              >
                ∑ (xᵢ - x̄)²
              </motion.div>
              <motion.div
                className="math-symbol s3"
                animate={floatContinuous(22)}
              >
                P(A|B)
              </motion.div>
              <motion.div
                className="math-symbol s4"
                animate={floatContinuous(30)}
              >
                y = β₀ + β₁x + ε
              </motion.div>
              <motion.div
                className="math-symbol s5"
                animate={floatContinuous(20)}
              >
                lim(x→∞)
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
