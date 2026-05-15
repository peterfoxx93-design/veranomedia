import { HashRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './routes/Home'
import ServiciosOverview from './routes/ServiciosOverview'
import ServiciosWeb from './routes/ServiciosWeb'
import ServiciosRedes from './routes/ServiciosRedes'
import ServiciosSEO from './routes/ServiciosSEO'
import ServiciosAutomatizacion from './routes/ServiciosAutomatizacion'
import ServiciosContenido from './routes/ServiciosContenido'
import PaqueteCompleto from './routes/PaqueteCompleto'
import PortafolioPage from './routes/PortafolioPage'
import ClinicaDental from './routes/ClinicaDental'
import Nosotros from './routes/Nosotros'
import Contacto from './routes/Contacto'
import Blog from './routes/Blog'
import BlogPost from './routes/BlogPost'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosOverview />} />
          <Route path="/servicios/web" element={<ServiciosWeb />} />
          <Route path="/servicios/redes" element={<ServiciosRedes />} />
          <Route path="/servicios/anuncios-seo" element={<ServiciosSEO />} />
          <Route path="/servicios/automatizacion" element={<ServiciosAutomatizacion />} />
          <Route path="/servicios/contenido" element={<ServiciosContenido />} />
          <Route path="/paquete-completo" element={<PaqueteCompleto />} />
          <Route path="/portafolio" element={<PortafolioPage />} />
          <Route path="/modelos/clinica-dental" element={<ClinicaDental />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
      </HashRouter>
  )
}
