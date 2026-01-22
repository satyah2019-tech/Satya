import { useState } from 'react'
import { motion } from 'framer-motion'
import './Careers.css'

const Careers = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobType: 'Internship',
        linkedin: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf_wF1hDbVAm_zZpsBlB292qDD_FyulolP1EuZvLtJtGNt9fw/formResponse'

        const formBody = new FormData()
        formBody.append('entry.1414039973', formData.name)
        formBody.append('entry.1384865087', formData.email)
        formBody.append('entry.1881629800', formData.phone)
        formBody.append('entry.327626644', formData.jobType)
        formBody.append('entry.1411163976', formData.linkedin)

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formBody
            })

            // Since no-cors gives an opaque response, we assume success if no network error occurred
            setSubmitStatus('success')
            setFormData({
                name: '',
                email: '',
                phone: '',
                jobType: 'Internship',
                linkedin: ''
            })

            setTimeout(() => setSubmitStatus(null), 5000)
        } catch (error) {
            console.error('Submission error:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const jobOpenings = [
        {
            id: 1,
            title: "Data Analyst Intern",
            type: "Internship",
            description: "Join our analytics team to help process and interpret complex datasets for social impact projects."
        },
        {
            id: 2,
            title: "Senior Research Consultant",
            type: "Full-time",
            description: "Lead research initiatives and provide data-backed strategic consulting for our partners."
        },
        {
            id: 3,
            title: "Frontend Developer",
            type: "Full-time",
            description: "Build and maintain responsive web applications that visualize our data and research findings."
        }
    ]

    return (
        <div className="careers-page">
            <section className="careers-hero">
                <div className="container">
                    <motion.div
                        className="careers-hero-content"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="page-title">Careers at SATYAH</h1>
                        <p className="page-subtitle">
                            Join our team and contribute to research-driven, data-backed decision making.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container careers-content">
                <section className="jobs-section">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Current Openings
                    </motion.h2>

                    <div className="jobs-grid">
                        {jobOpenings.map((job, index) => (
                            <motion.div
                                key={job.id}
                                className="job-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h3 className="job-title">{job.title}</h3>
                                <span className="job-type">{job.type}</span>
                                <p className="job-description">{job.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="application-section">
                    <motion.div
                        className="form-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Apply Now</h2>

                        <form className="careers-form" onSubmit={handleSubmit}>
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
                                    placeholder="Your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email ID *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                    placeholder="+91 99999 99999"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="jobType">Job Type *</label>
                                <div className="select-wrapper">
                                    <select
                                        id="jobType"
                                        name="jobType"
                                        value={formData.jobType}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="Internship">Internship</option>
                                        <option value="Full-time">Full-time</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="linkedin">LinkedIn Profile (Optional)</label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>



                            {submitStatus === 'success' && (
                                <div className="form-success">
                                    Application submitted successfully! We will get back to you soon.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="form-submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </form>
                    </motion.div>
                </section>
            </div>
        </div>
    )
}

export default Careers
