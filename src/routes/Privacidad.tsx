import { Link } from 'react-router-dom'

const ACTUALIZADO = '23 de septiembre de 2026'

const secciones = [
  {
    titulo: 'Quiénes somos',
    cuerpo: [
      'Verano Media es una agencia de marketing digital con domicilio en la República Dominicana. Esta política explica cómo tratamos la información cuando usa nuestro sitio veranomedia.click o cuando interactúa con nosotros por correo, WhatsApp o formularios.',
      'Contacto para cualquier asunto de privacidad: hola@veranomedia.click.',
    ],
  },
  {
    titulo: 'Qué información tratamos',
    cuerpo: [
      'Información que usted nos entrega: nombre, correo, teléfono y el contenido del mensaje cuando nos escribe o solicita un diagnóstico.',
      'Información de uso del sitio: datos técnicos agregados y anónimos (páginas vistas, dispositivo, origen de la visita) para entender cómo se usa el sitio.',
      'Información de las cuentas de Google que usted autoriza expresamente: ver el apartado siguiente.',
    ],
  },
  {
    titulo: 'Datos de las API de Google',
    cuerpo: [
      'Cuando una persona autoriza una cuenta de Google a nuestra aplicación interna (por ejemplo, el asistente que usamos para gestionar nuestras propias comunicaciones), accedemos únicamente a los datos necesarios para esas funciones: leer y clasificar correos, preparar respuestas, enviar correos en nombre de esa cuenta, leer y crear eventos de calendario, leer y subir archivos de Drive, leer y editar documentos y hojas de cálculo, y consultar contactos.',
      'No usamos esos datos para publicidad, elaboración de perfiles, evaluación crediticia ni para ningún fin distinto de prestar las funciones descritas. No los vendemos ni los cedemos a terceros.',
      'El uso que Verano Media hace de la información recibida de las API de Google se ajusta a la Política de datos de usuario de los servicios API de Google, incluidos los requisitos de Uso Limitado (Limited Use).',
    ],
  },
  {
    titulo: 'Con quién se comparte',
    cuerpo: [
      'No vendemos ni alquilamos información personal. Solo se comparte lo estrictamente necesario con proveedores de infraestructura que nos prestan servicios técnicos (alojamiento, envío de correo, base de datos), sujetos a obligaciones de confidencialidad.',
      'Podemos divulgar información si una autoridad competente lo requiere conforme a la ley aplicable.',
    ],
  },
  {
    titulo: 'Seguridad y conservación',
    cuerpo: [
      'Los permisos de acceso a cuentas de Google se guardan de forma cifrada y pueden revocarse en cualquier momento. Conservamos la información mientras exista una relación comercial o mientras exista un interés legítimo, y la eliminamos cuando deja de ser necesaria.',
      'Puede solicitar la eliminación de sus datos escribiendo a hola@veranomedia.click y los borraremos, salvo aquello que la ley nos obligue a conservar.',
    ],
  },
  {
    titulo: 'Cómo revocar el acceso de Google',
    cuerpo: [
      'Puede retirar el permiso de nuestra aplicación en cualquier momento desde la página de permisos de su cuenta de Google: myaccount.google.com/permissions. Al revocarlo, la aplicación deja de tener acceso de inmediato.',
    ],
  },
  {
    titulo: 'Sus derechos',
    cuerpo: [
      'Puede solicitarnos acceso, corrección, actualización o eliminación de su información personal, así como oponerse a su tratamiento, escribiendo a hola@veranomedia.click. Responderemos en un plazo razonable.',
    ],
  },
  {
    titulo: 'Cambios en esta política',
    cuerpo: [
      'Si modificamos esta política, publicaremos la versión actualizada en esta misma página con su fecha de actualización.',
    ],
  },
]

export default function Privacidad() {
  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="container-vm max-w-3xl">
        <p className="text-xs font-semibold tracking-widest text-[#5170FF] uppercase mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1C1C1E]">
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm text-[#8E8E93]">Actualizada el {ACTUALIZADO}</p>

        <div className="mt-10 space-y-8">
          {secciones.map((s) => (
            <section key={s.titulo}>
              <h2 className="text-lg font-bold text-[#1C1C1E] mb-2">{s.titulo}</h2>
              {s.cuerpo.map((p, i) => (
                <p key={i} className="text-sm text-[#4A4A4F] leading-relaxed mb-2">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E8E8ED] flex flex-wrap gap-4 text-sm">
          <Link to="/" className="text-[#5170FF] font-medium hover:underline">Volver al inicio</Link>
          <Link to="/terminos" className="text-[#5170FF] font-medium hover:underline">Términos de servicio</Link>
          <a href="mailto:hola@veranomedia.click" className="text-[#5170FF] font-medium hover:underline">hola@veranomedia.click</a>
        </div>
      </div>
    </main>
  )
}
