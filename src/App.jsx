import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Projects from './pages/Projects'
import Partners from './pages/Partners'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Careers from './pages/Careers'
import Blogs from './pages/Blogs'
import Layout from './components/Layout'
import PageTransition from './components/PageTransition'

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/projects"
          element={
            <PageTransition>
              <Projects />
            </PageTransition>
          }
        />
        <Route
          path="/partners"
          element={
            <PageTransition>
              <Partners />
            </PageTransition>
          }
        />
        <Route
          path="/team"
          element={
            <PageTransition>
              <Team />
            </PageTransition>
          }
        />
        <Route
          path="/careers"
          element={
            <PageTransition>
              <Careers />
            </PageTransition>
          }
        />
        <Route
          path="/blogs"
          element={
            <PageTransition>
              <Blogs />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  )
}

export default App
