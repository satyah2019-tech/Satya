import { motion } from 'framer-motion'
import './Blogs.css'

const Blogs = () => {
    const dummyPosts = [
        {
            id: 1,
            title: "The Future of Data-Driven Policy Making",
            date: "Oct 15, 2025",
            category: "Policy",
            excerpt: "How real-time analytics and big data are transforming the way governments and organizations make decisions for social impact."
        },
        {
            id: 2,
            title: "Sustainable Development in Urban Planning",
            date: "Sep 28, 2025",
            category: "Urban Planning",
            excerpt: "Exploring the intersection of technology, community engagement, and environmental sustainability in modern city planning."
        },
        {
            id: 3,
            title: "Understanding Digital Transformation",
            date: "Sep 10, 2025",
            category: "Technology",
            excerpt: "A comprehensive guide to digital transformation strategies for non-profits and social enterprises."
        },
        {
            id: 4,
            title: "Impact Assessment Methodologies",
            date: "Aug 22, 2025",
            category: "Research",
            excerpt: "A deep dive into the various methodologies used to measure and evaluate the social impact of development projects."
        }
    ]

    return (
        <div className="blogs-page">
            <section className="blogs-hero">
                <div className="container">
                    <motion.div
                        className="blogs-hero-content"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="page-title">Blogs & Articles</h1>
                        <p className="page-subtitle">
                            Insights, updates, and research findings from the SATYAH team.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="blogs-content">
                <div className="container">
                    <div className="blogs-grid">
                        {dummyPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                className="blog-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="blog-image-wrapper">
                                    <div className="blog-image-placeholder"></div>
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <span>{post.category}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h2 className="blog-title">{post.title}</h2>
                                    <p className="blog-excerpt">{post.excerpt}</p>
                                    <a href="#" className="blog-link" onClick={(e) => e.preventDefault()}>
                                        Read More <span>→</span>
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Blogs
