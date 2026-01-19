import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe33ccrXB8T1h_p6Igb9we1jPr3M1Sy-YbJClcQamrxTBTa5g/formResponse'

    try {
      const formBody = new FormData()
      formBody.append('entry.1362376038', formData.name) // Name
      formBody.append('entry.876053468', formData.email) // Email
      formBody.append('entry.1723727918', formData.organization) // Organization
      formBody.append('entry.1851143460', formData.message) // Message

      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formBody,
      })

      // With no-cors, we can't check response.ok, so we assume success if no error is thrown
      setSubmitStatus('success')
      setFormData({ name: '', email: '', organization: '', message: '' })

      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      console.error('Form submission failed:', error)
      setSubmitStatus('error') // Optional: Handle error state if needed, though user didn't explicitly ask for UI change on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">
              Let's discuss how SATYAH can help drive your organization forward
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-content section">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="form-title">Get in Touch</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-textarea"
                  ></textarea>
                </div>

                {submitStatus === 'success' && (
                  <motion.div
                    className="form-success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Message sent successfully!
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="form-submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="info-title">Contact Information</h2>
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>
                      <a href="mailto:satyah2019@gmail.com" className="contact-link">
                        satyah2019@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>
                      <a href="tel:7875695021" className="contact-link">7875695021</a>
                      {' / '}
                      <a href="tel:9175085911" className="contact-link">9175085911</a>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h3>Office</h3>
                    <p>Office No. 2, 1 st floor, Shree Sadashiv Hsg. Society, Above Shravan Hotel, Ferguson college Road, Model Colony, Pune - 41101</p>
                  </div>
                </div>
              </div>

              {/* Map Removed as requested */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
