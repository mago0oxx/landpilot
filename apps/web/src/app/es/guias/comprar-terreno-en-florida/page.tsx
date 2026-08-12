import type { Metadata } from "next";
import Link from "next/link";
import GuideLayoutEs from "@/features/marketing/components/GuideLayoutEs";

export const metadata: Metadata = {
  title: "Qué revisar antes de comprar un terreno en Florida",
  description:
    "Zonificación, zona de inundación, séptico, acceso legal y servicios: lo que hay que verificar antes de hacer una oferta por un lote en Florida.",
  alternates: { canonical: "/es/guias/comprar-terreno-en-florida" },
};

export default function ComprarTerrenoFloridaPage() {
  return (
    <GuideLayoutEs
      slug="comprar-terreno-en-florida"
      title="Qué revisar antes de comprar un terreno en Florida"
      dek="Lo que un anuncio no te dice y el condado sí, en el orden en que conviene revisarlo."
    >
      <section>
        <p>
          Florida es el estado donde más terreno se le vende a compradores de fuera, y también
          donde más lotes se venden con problemas que el anuncio no menciona. El vendedor casi
          nunca está obligado a verificar nada de lo que sigue. Te toca a ti.
        </p>
        <p className="mt-3">
          Este es el orden que conviene: primero lo gratis y rápido, y solo gastas dinero en los
          lotes que sobrevivan.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">1. Zonificación y uso permitido</h2>
        <p className="mt-2">
          Busca la parcela en el <strong>property appraiser</strong> del condado — cada condado de
          Florida tiene el suyo, es público y gratis. Ahí sale el código de zonificación.
        </p>
        <p className="mt-3">
          Después llama a la oficina de <em>planning and zoning</em> del condado con el número de
          parcela y pregunta directo: ¿una vivienda unifamiliar es uso permitido por derecho en
          esta parcela, y cuáles son los <em>setbacks</em> y el área mínima por unidad? Anota con
          quién hablaste y cuándo. Lo que te diga alguien en el mostrador no obliga al condado.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">2. Zona de inundación</h2>
        <p className="mt-2">
          En Florida esto no es un detalle. Si la parcela cae en zona AE o VE, con hipoteca
          respaldada por el gobierno federal el seguro de inundación es obligatorio, y lo más
          probable es que tengas que construir elevado. Eso cambia el presupuesto de la obra, no
          solo el del seguro.
        </p>
        <p className="mt-3">
          Los mapas de FEMA son públicos. También pregunta al{" "}
          <em>floodplain administrator</em> del condado, que a veces tiene información más nueva
          que el mapa nacional.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">3. Séptico: el perc test</h2>
        <p className="mt-2">
          Buena parte del terreno rural en Florida no tiene alcantarillado. Sin alcantarillado
          necesitas séptico, y para eso el suelo tiene que pasar una prueba de percolación. Sin
          perc aprobado no hay permiso de séptico, y sin permiso de séptico no hay permiso de
          construcción.
        </p>
        <p className="mt-3">
          El nivel freático alto de Florida hace que esto falle más seguido de lo que la gente
          espera. Haz tu oferta <strong>contingente</strong> a un perc test aprobado.{" "}
          <Link href="/es/guias/perc-test" className="font-medium text-lp-forest-light hover:underline">
            Cómo funciona un perc test →
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">4. Humedales</h2>
        <p className="mt-2">
          Florida tiene humedales por todas partes, y no siempre parecen pantano. Construir sobre
          humedales o rellenarlos requiere permiso federal y a veces estatal. El efecto práctico:
          cinco acres en el deed pueden ser un acre construible.
        </p>
        <p className="mt-3">
          El Inventario Nacional de Humedales del USFWS es gratis y público, pero es una
          herramienta de tamizaje. Si aparece algo, lo que vale es una <em>delineation</em> hecha
          por un consultor ambiental en el terreno.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">5. Acceso legal</h2>
        <p className="mt-2">
          Que exista un camino de tierra hasta el lote no significa que tengas derecho legal a
          usarlo. Si no hay servidumbre registrada, el dueño del terreno vecino puede cerrarlo. Un
          lote sin acceso legal registrado normalmente no consigue permiso de construcción ni
          financiamiento.
        </p>
        <p className="mt-3">
          Esto se confirma con una búsqueda de título, no preguntándole al vendedor.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">6. Servicios, y lo que cuesta llevarlos</h2>
        <p className="mt-2">
          &quot;Electricidad disponible en la calle&quot; significa que alguien cree que hay un
          poste cerca. No es una cotización. Llama a la compañía eléctrica con la dirección y pide
          el costo real de la extensión. Puede ser decenas de miles por milla.
        </p>
        <p className="mt-3">
          Suma también pozo y séptico si no hay agua municipal. Esos tres números juntos son los
          que deciden si el terreno barato de verdad salió barato.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">7. Título, HOA y restricciones</h2>
        <p className="mt-2">
          Pide una búsqueda de título antes de estar bajo contrato si puedes. Y cuando llegue el
          <em> title commitment</em>, lee el Schedule B completo: ahí está la lista exacta de
          servidumbres, gravámenes y restricciones registradas contra la parcela.
        </p>
        <p className="mt-3">
          Ojo con los lotes en subdivisiones platted: pueden traer cuotas de HOA que pagas cada
          año aunque no construyas nada, y restricciones de tamaño mínimo de casa que matan un
          plan de cabaña.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Nada de esto reemplaza a un profesional</h2>
        <p className="mt-2">
          Un topógrafo con licencia, un ingeniero o un abogado de bienes raíces deberían verificar
          cualquier cosa que afecte una decisión de seis cifras. Lo que hace esta lista es
          decirte qué lotes vale la pena pagarle a un profesional para que mire de cerca — y
          cuáles puedes descartar en una tarde, sin gastar nada.
        </p>
      </section>
    </GuideLayoutEs>
  );
}
