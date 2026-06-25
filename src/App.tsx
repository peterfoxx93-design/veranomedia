import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ChatWidget from './components/ChatWidget'
import Home from './routes/Home'
import ServiciosOverview from './routes/ServiciosOverview'
import ServiciosWeb from './routes/ServiciosWeb'
import ServiciosRedes from './routes/ServiciosRedes'
import ServiciosSEO from './routes/ServiciosSEO'
import ServiciosAutomatizacion from './routes/ServiciosAutomatizacion'
import ServiciosContenido from './routes/ServiciosContenido'
import PaqueteCompleto from './routes/PaqueteCompleto'
import PortafolioPage from './routes/PortafolioPage'
import ProyectoLandingPages from './routes/ProyectoLandingPages'
import ProyectoPosicionamientoLocal from './routes/ProyectoPosicionamientoLocal'
import ProyectoPaquetesIntegrales from './routes/ProyectoPaquetesIntegrales'
import ProyectoAutomatizaciones from './routes/ProyectoAutomatizaciones'
import ClinicaDental from './routes/ClinicaDental'
import BienesRaices from './routes/BienesRaices'
import BufeteAbogados from './routes/BufeteAbogados'
import Nosotros from './routes/Nosotros'
import Contacto from './routes/Contacto'
import Blog from './routes/Blog'
import BlogPost from './routes/BlogPost'

export default function App() {
  return (
    <BrowserRouter>
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
          <Route path="/proyectos/landing-pages" element={<ProyectoLandingPages />} />
          <Route path="/proyectos/posicionamiento-local" element={<ProyectoPosicionamientoLocal />} />
          <Route path="/proyectos/paquetes-integrales" element={<ProyectoPaquetesIntegrales />} />
          <Route path="/proyectos/automatizaciones" element={<ProyectoAutomatizaciones />} />
          <Route path="/modelos/clinica-dental" element={<ClinicaDental />} />
          <Route path="/modelos/bienes-raices" element={<BienesRaices />} />
          <Route path="/modelos/bufete-abogados" element={<BufeteAbogados />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
      </BrowserRouter>
  )
}
