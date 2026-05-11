import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CTA />
      <Footer />
    </main>
  )
}
