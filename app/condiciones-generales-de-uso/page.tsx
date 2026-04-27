const legalLinks = [
  { label: 'Aviso de Privacidad', href: '/aviso-de-privacidad' },
  { label: 'Pago de Impuestos', href: '/pago-de-impuestos' },
  { label: 'Condiciones Generales de Uso', href: '/condiciones-generales-de-uso' },
]

export default function CondicionesGeneralesDeUsoPage() {
  return (
    <div className="min-h-screen bg-[#f6efe9] text-[#241715]">
      <header className="sticky top-0 z-40 border-b border-[#ead8cf] bg-[#fffaf7]/90 backdrop-blur-md">
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between py-4">
          <a href="/" className="text-sm font-semibold tracking-[0.16em] text-[#2a1c19]">CUSI</a>
          <a href="/" className="rounded-full border border-[#d8c7be] px-4 py-2 text-xs font-semibold text-[#2e231f]">Volver al inicio</a>
        </div>
      </header>

      <main className="mx-auto w-[92%] max-w-5xl py-8 md:py-12">
        <section className="rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <h1 className="text-3xl leading-tight md:text-5xl">Condiciones Generales de Uso</h1>
          <p className="mt-4 text-sm text-[#6f5851]">Ultima actualizacion: Abril 2026</p>
          <p className="mt-4 text-base leading-8 text-[#5d4740]">Bienvenido al sitio web de CUSI.</p>
          <p className="mt-3 text-base leading-8 text-[#5d4740]">
            Al navegar en este sitio, contactar a CUSI, solicitar informacion, realizar un pedido o contratar alguno de nuestros productos o servicios, el usuario acepta las presentes Condiciones Generales de Uso.
          </p>
        </section>

        <section className="mt-6 space-y-6 rounded-3xl border border-[#ead8cf] bg-white p-6 md:p-10">
          <article>
            <h2 className="text-2xl md:text-3xl">1. Identidad del proveedor</h2>
            <div className="mt-4 rounded-2xl border border-[#ead8cf] bg-[#fdf8f4] p-5 text-base leading-8 text-[#5d4740]">
              <p className="font-semibold text-[#2a1c19]">CUSI</p>
              <p>RFC: CUGC470830RU2</p>
              <p>Domicilio:</p>
              <p>C. Monte Carpatos 990 Int. 2</p>
              <p>Colonia Lomas Virreyes</p>
              <p>C.P. 11000, Ciudad de Mexico, Mexico</p>
              <p className="mt-2">Telefono:</p>
              <p>
                <a href="tel:+525521092665" className="font-semibold underline underline-offset-2">
                  +52 1 55 2109 2665
                </a>
              </p>
            </div>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">2. Objeto del sitio web</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              El sitio web de CUSI tiene como finalidad presentar informacion sobre nuestros productos, arreglos florales, servicios, promociones, contacto, entregas y opciones comerciales relacionadas con flores, decoracion floral, regalos y eventos.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">La informacion publicada en el sitio tiene fines informativos y comerciales.</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">3. Uso del sitio</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">El usuario se compromete a utilizar este sitio de manera adecuada, licita y respetuosa.</p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Queda prohibido:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
              <li>Usar el sitio para fines fraudulentos o ilicitos</li>
              <li>Intentar danar, bloquear o alterar el funcionamiento del sitio</li>
              <li>Usar informacion, imagenes, textos o contenidos sin autorizacion</li>
              <li>Enviar informacion falsa, incompleta o enganosa</li>
              <li>Suplantar la identidad de otra persona o empresa</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">4. Productos, imagenes y disponibilidad</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Las imagenes de flores, arreglos, productos o decoraciones publicadas en el sitio son ilustrativas y pueden variar segun temporada, disponibilidad, tipo de flor, color, presentacion o condiciones de entrega.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI procurara respetar el diseno, estilo y calidad solicitados por el cliente. Sin embargo, algunos productos naturales pueden presentar variaciones en color, tamano, forma o disponibilidad.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              En caso de no contar con una flor, material o producto especifico, CUSI podra proponer una alternativa similar, procurando mantener el valor, estetica y calidad del pedido.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">5. Pedidos y confirmaciones</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Los pedidos podran realizarse a traves del sitio web, telefono, WhatsApp, redes sociales, correo electronico o cualquier otro medio autorizado por CUSI.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Un pedido se considerara confirmado una vez que CUSI haya validado la informacion del cliente, disponibilidad del producto, condiciones de entrega y pago correspondiente.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">6. Precios</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Los precios publicados o comunicados por CUSI podran variar segun temporada, disponibilidad, tipo de producto, diseno, tamano, urgencia, distancia de entrega o requerimientos especiales.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">CUSI informara al cliente el precio aplicable antes de confirmar el pedido.</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">7. Entregas</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Las entregas estaran sujetas a disponibilidad de horario, zona de entrega, condiciones de transito, accesibilidad del domicilio y confirmacion previa del pedido.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">El cliente debera proporcionar datos completos y correctos para la entrega, incluyendo:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-8 text-[#5d4740]">
              <li>Nombre de quien recibe</li>
              <li>Direccion completa</li>
              <li>Telefono de contacto</li>
              <li>Referencias del domicilio</li>
              <li>Fecha y horario solicitado</li>
              <li>Instrucciones especiales, si aplica</li>
            </ul>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI no sera responsable por retrasos o entregas fallidas cuando los datos proporcionados por el cliente sean incorrectos, incompletos o cuando no haya una persona disponible para recibir el pedido.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">8. Cambios, cancelaciones y reembolsos</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Los cambios o cancelaciones deberan solicitarse con anticipacion suficiente y estaran sujetos al tipo de pedido, nivel de personalizacion, avance de preparacion y fecha de entrega.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              En pedidos personalizados, eventos, arreglos especiales o productos ya elaborados, la cancelacion podra no ser procedente o podra generar cargos administrativos o de produccion.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">CUSI revisara cada caso de forma individual.</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">9. Mensajes personalizados</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Cuando el cliente solicite incluir mensajes, tarjetas o dedicatorias, sera responsable del contenido proporcionado.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI no sera responsable por errores ortograficos, nombres incorrectos o mensajes enviados de forma incompleta por el cliente.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">10. Propiedad intelectual</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Todos los textos, imagenes, disenos, logotipos, fotografias, composiciones visuales y contenidos del sitio son propiedad de CUSI o se utilizan con autorizacion correspondiente.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              Queda prohibida su reproduccion, distribucion, modificacion o uso comercial sin autorizacion previa por escrito.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">11. Limitacion de responsabilidad</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI procura mantener la informacion del sitio actualizada y correcta. Sin embargo, no garantiza que el sitio este libre de errores, interrupciones tecnicas o informacion desactualizada.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI no sera responsable por danos derivados del uso indebido del sitio, fallas tecnicas externas, interrupciones de internet o acciones de terceros.
            </p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">12. Proteccion de datos personales</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">El tratamiento de datos personales se realizara conforme al Aviso de Privacidad publicado en este sitio.</p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">El usuario puede consultar dicho documento en la seccion: /aviso-de-privacidad</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">13. Modificaciones</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">
              CUSI podra modificar estas Condiciones Generales de Uso en cualquier momento, por cambios legales, comerciales, operativos o tecnicos.
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Las modificaciones seran publicadas en esta misma seccion del sitio web.</p>
          </article>

          <article>
            <h2 className="text-2xl md:text-3xl">14. Contacto</h2>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Para cualquier duda relacionada con estas Condiciones Generales de Uso, puede contactar a CUSI a traves de:</p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Telefono:</p>
            <p className="text-base leading-8 text-[#5d4740]">
              <a href="tel:+525521092665" className="font-semibold underline underline-offset-2">
                +52 1 55 2109 2665
              </a>
            </p>
            <p className="mt-3 text-base leading-8 text-[#5d4740]">Correo electronico:</p>
            <p className="text-base leading-8 text-[#5d4740]">[AGREGAR CORREO DE CONTACTO]</p>
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
