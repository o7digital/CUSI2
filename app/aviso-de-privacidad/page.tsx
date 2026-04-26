const legalLinks = [
  { label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' },
  { label: 'Pago de Impuestos', href: '/pago-de-impuestos' },
  { label: 'Condiciones Generales de Uso', href: '/condiciones-generales-de-uso' },
]

export default function AvisoDePrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI FLORES</a>
          <a href="/" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Volver al inicio</a>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 text-[#2a1c19] md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Aviso de Privacidad Integral</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Ultima actualizacion: Abril 2026</p>
          <p className="mt-5 text-base leading-8 text-[#4e3a34]">
            En cumplimiento con la Ley Federal de Proteccion de Datos Personales en Posesion de los Particulares, CUSI FLORES pone a disposicion de sus clientes, usuarios y visitantes el presente Aviso de Privacidad, con el fin de informar de manera clara como se recaban, utilizan, protegen y, en su caso, comparten sus datos personales.
          </p>
        </section>

        <section className="mt-6 space-y-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
        <article>
          <h2 className="text-2xl md:text-3xl">1. Responsable del tratamiento de datos personales</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES, con RFC CUGC470830RU2, con domicilio en C. Monte Carpatos 990 Int. 2, Colonia Lomas Virreyes, C.P. 11000, Ciudad de Mexico, Mexico, es responsable del tratamiento de los datos personales que usted proporcione a traves de este sitio web, formularios de contacto, llamadas telefonicas, mensajes por WhatsApp, redes sociales, correo electronico o cualquier otro medio de comunicacion relacionado con nuestros productos y servicios.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Telefono de contacto:{' '}
            <a href="tel:+525521092665" className="font-semibold underline underline-offset-2">
              +52 1 55 2109 2665
            </a>
          </p>
          <p className="mt-2 text-base leading-8 text-[#4e3a34]">Correo electronico de privacidad: contacto@cusiflores.com</p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">2. Datos personales que podemos recabar</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES podra recabar los siguientes datos personales, dependiendo del medio de contacto y del tipo de solicitud realizada:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Nombre completo</li>
            <li>Telefono</li>
            <li>Correo electronico</li>
            <li>Domicilio de entrega</li>
            <li>Datos de facturacion, incluyendo RFC, razon social, uso de CFDI y domicilio fiscal</li>
            <li>Informacion relacionada con pedidos, arreglos florales, fechas de entrega, dedicatorias o mensajes personalizados</li>
            <li>Datos de pago necesarios para confirmar una compra o servicio</li>
            <li>Informacion proporcionada voluntariamente a traves de formularios, WhatsApp, redes sociales o correo electronico</li>
          </ul>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES no solicita datos personales sensibles de forma ordinaria. En caso de que el cliente incluya de manera voluntaria informacion personal dentro de mensajes, dedicatorias o solicitudes especiales, dicha informacion sera tratada unicamente para cumplir con el pedido o servicio solicitado.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">3. Finalidades primarias del tratamiento de datos</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Los datos personales que usted proporcione seran utilizados para las siguientes finalidades necesarias:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Atender solicitudes de informacion, cotizacion o contacto</li>
            <li>Procesar pedidos de flores, arreglos florales, regalos, eventos o servicios relacionados</li>
            <li>Coordinar entregas a domicilio</li>
            <li>Confirmar pagos, pedidos y disponibilidad de productos</li>
            <li>Emitir facturas cuando el cliente lo solicite</li>
            <li>Dar seguimiento a compras, aclaraciones, cambios o incidencias</li>
            <li>Comunicarnos con usted por telefono, WhatsApp, correo electronico o redes sociales</li>
            <li>Cumplir con obligaciones legales, fiscales, administrativas y comerciales</li>
            <li>Mantener un registro interno de clientes, pedidos y servicios prestados</li>
          </ul>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">4. Finalidades secundarias</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            De manera adicional, sus datos podran ser utilizados para finalidades secundarias que no son indispensables para la relacion comercial, tales como:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Envio de promociones, campanas especiales o novedades de temporada</li>
            <li>Invitaciones a eventos, lanzamientos o fechas especiales</li>
            <li>Encuestas de satisfaccion</li>
            <li>Comunicacion de nuevos productos o servicios de CUSI FLORES</li>
            <li>Acciones de mercadotecnia y prospeccion comercial</li>
          </ul>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Si usted no desea que sus datos personales sean utilizados para estas finalidades secundarias, podra solicitarlo enviando un mensaje al correo: contacto@cusiflores.com
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            La negativa para el uso de sus datos en finalidades secundarias no afectara la prestacion de los servicios o productos solicitados.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">5. Transferencia de datos personales</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">CUSI FLORES no vendera, rentara ni comercializara sus datos personales.</p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Sus datos podran ser compartidos unicamente cuando sea necesario para cumplir con las finalidades descritas en este Aviso de Privacidad, por ejemplo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Servicios de mensajeria o entrega a domicilio</li>
            <li>Proveedores de tecnologia, hosting, correo electronico, formularios web o sistemas de administracion</li>
            <li>Plataformas de pago o instituciones financieras, cuando aplique</li>
            <li>Proveedores contables o fiscales para emision de facturas</li>
            <li>Autoridades competentes, cuando exista una obligacion legal o requerimiento fundado</li>
          </ul>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            En todos los casos, CUSI FLORES procurara que los terceros que tengan acceso a datos personales mantengan medidas de confidencialidad y seguridad adecuadas.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">6. Uso de medios digitales, cookies y tecnologias similares</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            El sitio web de CUSI FLORES podra utilizar cookies, herramientas de analisis, formularios de contacto, enlaces a redes sociales o tecnologias similares para mejorar la experiencia de navegacion, conocer el uso del sitio y facilitar la comunicacion con los usuarios.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            El usuario puede configurar su navegador para bloquear o eliminar cookies. Sin embargo, algunas funciones del sitio podrian verse afectadas.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">7. Medidas de seguridad</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES implementa medidas administrativas, tecnicas y fisicas razonables para proteger los datos personales contra dano, perdida, alteracion, destruccion, uso, acceso o tratamiento no autorizado.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Estas medidas pueden incluir:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Uso de sistemas protegidos</li>
            <li>Accesos restringidos a la informacion</li>
            <li>Comunicacion mediante canales digitales seguros</li>
            <li>Control interno de la informacion de pedidos y clientes</li>
            <li>Resguardo de informacion fiscal y comercial conforme a la normativa aplicable</li>
          </ul>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">8. Conservacion de los datos personales</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Los datos personales seran conservados unicamente durante el tiempo necesario para cumplir con las finalidades descritas en este Aviso de Privacidad, asi como para atender obligaciones legales, fiscales, administrativas o comerciales.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Una vez que los datos dejen de ser necesarios, CUSI FLORES podra eliminarlos, bloquearlos o conservarlos unicamente en los casos permitidos por la legislacion aplicable.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">9. Derechos ARCO</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales, conforme a la legislacion aplicable.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Estos derechos se conocen como derechos ARCO:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Acceso: conocer que datos personales tenemos de usted y para que los utilizamos.</li>
            <li>Rectificacion: solicitar la correccion de datos incompletos, incorrectos o desactualizados.</li>
            <li>Cancelacion: solicitar la eliminacion de sus datos cuando legalmente proceda.</li>
            <li>Oposicion: oponerse al uso de sus datos para finalidades especificas.</li>
          </ul>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Para ejercer cualquiera de estos derechos, debera enviar una solicitud al correo: contacto@cusiflores.com
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">La solicitud debera incluir:</p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#4e3a34]">
            <li>Nombre completo del titular</li>
            <li>Medio de contacto para recibir respuesta</li>
            <li>Documento que acredite su identidad</li>
            <li>Descripcion clara del derecho que desea ejercer</li>
            <li>Datos personales sobre los que desea ejercer el derecho ARCO</li>
            <li>Cualquier documento o informacion que facilite la localizacion de sus datos</li>
          </ul>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES dara respuesta a su solicitud dentro de los plazos establecidos por la legislacion aplicable.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">10. Revocacion del consentimiento y limitacion del uso de datos</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            Usted podra revocar el consentimiento otorgado para el tratamiento de sus datos personales o solicitar que se limite el uso o divulgacion de los mismos, enviando una solicitud al correo: contacto@cusiflores.com
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            La revocacion del consentimiento no tendra efectos retroactivos y podra estar limitada cuando exista una obligacion legal, fiscal, contractual o administrativa que requiera conservar cierta informacion.
          </p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">11. Cambios al Aviso de Privacidad</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">
            CUSI FLORES podra modificar o actualizar este Aviso de Privacidad en cualquier momento, derivado de cambios legales, nuevos requerimientos internos, mejoras en el sitio web, actualizacion de servicios o cambios en nuestras practicas comerciales.
          </p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Cualquier modificacion sera publicada en esta misma seccion del sitio web: /aviso-de-privacidad</p>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Se recomienda revisar periodicamente este Aviso de Privacidad para conocer cualquier actualizacion.</p>
        </article>

        <article>
          <h2 className="text-2xl md:text-3xl">12. Contacto</h2>
          <p className="mt-3 text-base leading-8 text-[#4e3a34]">Para cualquier duda, aclaracion o solicitud relacionada con este Aviso de Privacidad, puede contactar a CUSI FLORES a traves de:</p>
          <ul className="mt-3 list-none space-y-2 text-base leading-8 text-[#4e3a34]">
            <li>CUSI FLORES</li>
            <li>RFC: CUGC470830RU2</li>
            <li>Domicilio: C. Monte Carpatos 990 Int. 2, Colonia Lomas Virreyes, C.P. 11000, Ciudad de Mexico, Mexico</li>
            <li>
              Telefono:{' '}
              <a href="tel:+525521092665" className="font-semibold underline underline-offset-2">
                +52 1 55 2109 2665
              </a>
            </li>
            <li>Correo electronico: contacto@cusiflores.com</li>
          </ul>
          <p className="mt-5 text-sm text-[#6f5851]">CUSI FLORES - Aviso de Privacidad actualizado en Abril 2026.</p>
        </article>
        </section>
      </main>

      <footer className="mx-auto w-[92%] max-w-7xl border-t border-[#e6d5cc] py-8 text-sm text-[#6f5851]">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6f5851]">Informacion legal</p>
        <div className="mt-2 flex flex-col gap-1.5 text-sm font-semibold">
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="underline underline-offset-2 transition hover:opacity-70">
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}
