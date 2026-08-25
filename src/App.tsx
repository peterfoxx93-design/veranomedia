import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ChatWidget from './components/ChatWidget'
import Home from './routes/Home'
import ServiciosOverview from './routes/ServiciosOverview'
import PortafolioPage from './routes/PortafolioPage'
import ClinicaDental from './routes/ClinicaDental'
import BienesRaices from './routes/BienesRaices'
import BufeteAbogados from './routes/BufeteAbogados'
import Nosotros from './routes/Nosotros'
import Contacto from './routes/Contacto'
import Blog from './routes/Blog'
import BlogPost from './routes/BlogPost'
import SistemaVerano from './routes/SistemaVerano'
import Diagnostico from './routes/Diagnostico'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<ServiciosOverview />} />
          <Route path="/portafolio" element={<PortafolioPage />} />
          <Route path="/modelos/clinica-dental" element={<ClinicaDental />} />
          <Route path="/modelos/bienes-raices" element={<BienesRaices />} />
          <Route path="/modelos/bufete-abogados" element={<BufeteAbogados />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sistema-verano" element={<SistemaVerano />} />
          <Route path="/diagnostico" element={<Diagnostico />} />
        </Route>
      </Routes>
      <ChatWidget
        apiUrl="https://veranomedia-crm.vercel.app/api/chat"
        botName="María"
        avatarUrl="/maria-avatar.jpg"
        greeting="¡Hola! Soy María, asesora de Verano Media. ¿En qué puedo ayudarte?"
        primaryColor="#5170FF"
      />
      </BrowserRouter>
  )
}
