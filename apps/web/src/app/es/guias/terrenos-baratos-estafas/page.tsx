import type { Metadata } from "next";
import Link from "next/link";
import GuideLayoutEs from "@/features/marketing/components/GuideLayoutEs";

export const metadata: Metadata = {
  title: "Terrenos baratos por internet: por qué son baratos",
  description:
    "Lotes rurales en EE.UU. de pocos miles de dólares con financiamiento del dueño. Qué suele estar mal y cómo verificarlo sin viajar.",
  alternates: { canonical: "/es/guias/terrenos-baratos-estafas" },
};

export default function TerrenosBaratosPage() {
  return (
    <GuideLayoutEs
      slug="terrenos-baratos-estafas"
      title="Terrenos baratos por internet: por qué son baratos"
      dek="Lotes rurales de cinco mil dólares con financiamiento del dueño. Qué suele estar mal, y cómo verificarlo desde tu casa."
    >
      <section>
        <p>
          Hay toda una industria vendiendo parcelas rurales baratas por internet a compradores de
          otros estados y de otros países. Parte es legítima. Parte es terreno que está barato
          precisamente porque nadie en la zona lo quiere, promocionado con fotos de una vista
          bonita y con términos de pago que hacen que el precio parezca no importar.
        </p>
        <p className="mt-3">
          El patrón se reconoce, y casi todo se puede verificar desde tu computadora.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Por qué está barato</h2>
        <p className="mt-2">
          El terreno tiene mercado. Cuando una parcela se vende muy por debajo del precio de la
          zona, casi siempre hay una razón:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>No tiene acceso legal.</strong> En el mapa parece que se llega, pero no hay
            servidumbre registrada.
          </li>
          <li>
            <strong>No hay agua.</strong> En buena parte del oeste de EE.UU., perforar un pozo
            puede ser carísimo, o directamente no estar permitido.
          </li>
          <li>
            <strong>Los servicios están a millas.</strong> &quot;Luz cerca&quot; puede significar
            que el poste más próximo está a tres kilómetros.
          </li>
          <li>
            <strong>El suelo no aguanta séptico.</strong> Sin perc aprobado no hay permiso de
            construcción.
          </li>
          <li>
            <strong>La zonificación no permite vivienda,</strong> o el tamaño mínimo de parcela es
            mayor que lo que estás comprando.
          </li>
          <li>
            <strong>Es humedal, llanura de inundación o pendiente inconstruible.</strong>
          </li>
          <li>
            <strong>Debe impuestos, tiene gravámenes o el título está sucio.</strong>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Tácticas de venta que conviene reconocer</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Financiamiento del dueño con mensualidad baja</strong>, que cambia la pregunta
            de &quot;¿vale 8.000 dólares este terreno?&quot; a &quot;¿puedo pagar 99 al
            mes?&quot;. No son la misma pregunta.
          </li>
          <li>
            <strong>Urgencia.</strong> Hay otro comprador interesado, el precio sube el lunes. El
            terreno lleva ahí diez mil años; puede esperar una semana.
          </li>
          <li>
            <strong>Geografía vaga.</strong> &quot;Cerca&quot; de un parque nacional puede ser dos
            horas de camino. Pide el número de parcela, no la descripción del anuncio.
          </li>
          <li>
            <strong>Fotos que nunca muestran el camino de acceso</strong>, o tomas de dron tan
            altas que no se distingue qué hay realmente.
          </li>
          <li>
            <strong>Contract for deed</strong>, donde no recibes la escritura hasta terminar de
            pagar. Entiende qué pasa si te atrasas: en algunas estructuras puedes perder el
            terreno y todo lo pagado.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Qué puedes verificar sin viajar</h2>
        <p className="mt-2">
          Bastante, en realidad. Consigue primero el <strong>número de parcela (APN o folio)</strong>{" "}
          — que se nieguen a dártelo ya es una respuesta. Después:
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>
            <strong>Property appraiser del condado</strong> — confirma quién es el dueño real, el
            valor catastral, los acres y si los impuestos están al día. Verifica que el vendedor
            de verdad sea el propietario.
          </li>
          <li>
            <strong>Visor GIS del condado</strong> — muestra los límites contra las carreteras, y
            si la parcela toca una vía pública.
          </li>
          <li>
            <strong>Ventas comparables recientes</strong> en el mismo condado. Si todo lo demás se
            vende diez veces más caro por acre, pregunta por qué esta no.
          </li>
          <li>
            <strong>Mapas de FEMA y el inventario de humedales del USFWS</strong>, ambos gratis.
          </li>
          <li>
            <strong>Llama al condado</strong> — planeación y salud — con el número de parcela:
            ¿se permite vivienda aquí, y es realista un permiso de séptico?
          </li>
          <li>
            <strong>Imágenes satelitales e históricas</strong> — busca si de verdad llega un
            camino.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Dos cosas que haría siempre</h2>
        <p className="mt-2">
          <strong>Búsqueda de título y seguro de título</strong>, incluso en una parcela barata.
          Sobre todo en una parcela barata: el terreno de ganga es desproporcionadamente terreno
          con problemas de título.
        </p>
        <p className="mt-3">
          <strong>Pagarle a alguien local para que lo camine</strong> si de verdad no puedes ir. Un
          topógrafo, un inspector o un agente de la zona lo hace por poco dinero. Pídele fotos del
          camino de acceso, del terreno y de los linderos. Unos cientos de dólares contra una
          compra de cinco cifras no es una decisión difícil.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Y después, ve a verlo</h2>
        <p className="mt-2">
          Si es posible, visita antes de cerrar. Las fotos no transmiten la pendiente, el estado
          del camino, el ruido, el olor, qué tan lejos quedan los servicios de verdad, ni qué
          están haciendo los vecinos. Quien se arrepiente de comprar terreno dice casi siempre lo
          mismo: en persona se veía distinto.
        </p>
        <p className="mt-3">
          <Link
            href="/es/guias/terreno-construible-estados-unidos"
            className="font-medium text-lp-forest-light hover:underline"
          >
            La lista completa de construibilidad →
          </Link>
        </p>
      </section>
    </GuideLayoutEs>
  );
}
