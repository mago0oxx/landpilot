import type { Metadata } from "next";
import Link from "next/link";
import GuideLayoutEs from "@/features/marketing/components/GuideLayoutEs";

export const metadata: Metadata = {
  title: "Cómo saber si un terreno en EE.UU. es construible",
  description:
    "Zonificación, acceso legal, séptico, humedales y servicios: la lista para confirmar que un lote en Estados Unidos sí se puede construir.",
  alternates: { canonical: "/es/guias/terreno-construible-estados-unidos" },
};

export default function TerrenoConstruiblePage() {
  return (
    <GuideLayoutEs
      slug="terreno-construible-estados-unidos"
      title="Cómo saber si un terreno en EE.UU. es construible"
      dek='"Buildable lot" en un anuncio es publicidad, no una garantía legal. Esta es la lista para comprobarlo.'
    >
      <section>
        <p>
          Un anuncio que dice &quot;buildable lot&quot; está haciendo una afirmación comercial. En
          la mayoría de los estados, ni el vendedor ni el agente están obligados a haber
          verificado nada de lo que sigue. La carga de comprobar que un lote se puede construir
          recae en el comprador.
        </p>
        <p className="mt-3">
          Este es el orden que conviene: lo más barato y rápido primero.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">1. Confirma la zonificación</h2>
        <p className="mt-2">
          Busca el código de zonificación de la parcela en el sitio del departamento de
          <em> planning and zoning</em> del condado (R-1, Agricultural, RM-2, y demás). La
          zonificación determina qué tienes permitido construir legalmente.
        </p>
        <p className="mt-3">
          Pregunta específicamente si <strong>una vivienda unifamiliar es uso permitido en esa
          parcela</strong>, no solo si la zonificación &quot;suena&quot; residencial. Y revisa el
          área mínima por unidad de vivienda, que es lo que decide cuántas casas caben.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">2. Confirma el acceso legal a la vía</h2>
        <p className="mt-2">
          Un lote sin acceso legal registrado a una carretera pública — un parcel
          <em> landlocked</em> — normalmente no consigue permiso de construcción, por bien que se
          vea todo lo demás.
        </p>
        <p className="mt-3">
          Acceso físico y acceso legal no son lo mismo. Que haya un camino de tierra no significa
          que tengas derecho a usarlo. Si la servidumbre nunca se registró, el dueño vecino puede
          cerrarlo legalmente.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">3. Confirma que se puede manejar el agua residual</h2>
        <p className="mt-2">
          Si el lote no está en alcantarillado municipal, necesitas séptico, y eso requiere suelo
          que apruebe una prueba de percolación. Es una de las razones más frecuentes por las que
          un lote rural &quot;construible&quot; resulta no serlo.{" "}
          <Link href="/es/guias/perc-test" className="font-medium text-lp-forest-light hover:underline">
            Cómo funciona un perc test →
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">4. Revisa inundación y humedales</h2>
        <p className="mt-2">
          Los mapas de zonas de inundación de FEMA y los mapas federales y estatales de humedales
          son públicos y gratis. Un lote mayormente dentro de un humedal mapeado puede tener muy
          poca área construible aunque el deed diga cinco acres.
        </p>
        <p className="mt-3">
          Estar en zona de alto riesgo (AE, VE) no lo descarta, pero cambia el costo del seguro y
          los requisitos de construcción.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">5. Confirma que los servicios llegan</h2>
        <p className="mt-2">
          &quot;Electricidad disponible en la calle&quot; significa que alguien cree que hay un
          poste cerca — no que la conexión sea gratis ni esté garantizada. Pide una cotización
          real a la compañía de servicios antes de cerrar.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">6. Busca servidumbres, restricciones y HOA</h2>
        <p className="mt-2">
          Una búsqueda de título — que normalmente hace la title company como parte del cierre,
          pero que puedes pedir antes — saca a la luz servidumbres registradas, restricciones del
          deed y reglas de HOA que pueden limitar qué construyes, dónde y de qué tamaño.
        </p>
        <p className="mt-3">Pídela antes de estar bajo contrato si puedes, no después.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Nada de esto reemplaza a un profesional</h2>
        <p className="mt-2">
          Un topógrafo con licencia, un ingeniero o un abogado de bienes raíces debería verificar
          cualquier cosa que afecte una decisión de seis cifras. Lo que hace esta lista es decirte
          qué lotes vale la pena pagarle a alguien para que revise a fondo, y cuáles puedes
          descartar en una tarde sin gastar un peso.
        </p>
      </section>
    </GuideLayoutEs>
  );
}
