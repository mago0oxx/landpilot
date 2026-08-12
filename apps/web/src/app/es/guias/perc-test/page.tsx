import type { Metadata } from "next";
import Link from "next/link";
import GuideLayoutEs from "@/features/marketing/components/GuideLayoutEs";

export const metadata: Metadata = {
  title: "Qué es un perc test y por qué puede tumbar tu compra",
  description:
    "Qué mide una prueba de percolación, por qué el condado la exige para el séptico, y qué hacer si el lote la reprueba.",
  alternates: { canonical: "/es/guias/perc-test" },
};

export default function PercTestEsPage() {
  return (
    <GuideLayoutEs
      slug="perc-test"
      title="Qué es un perc test y por qué puede tumbar tu compra"
      dek="Si el lote no tiene alcantarillado, una prueba de percolación reprobada significa que legalmente no puedes construir."
    >
      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Qué mide realmente</h2>
        <p className="mt-2">
          Una prueba de percolación — &quot;perc test&quot; — mide qué tan rápido drena el agua
          por el suelo en un punto específico de la propiedad. Se excava un hoyo a cierta
          profundidad, se llena de agua y se cronometra cuánto baja el nivel. Esa velocidad le
          dice al condado si el suelo puede absorber y filtrar de forma segura las aguas
          residuales de un sistema séptico, y de qué tamaño tendría que ser ese sistema.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Por qué importa tanto</h2>
        <p className="mt-2">
          Si el lote no está conectado a alcantarillado municipal, el séptico suele ser la única
          forma legal de manejar las aguas residuales. Y la mayoría de los condados no emite
          permiso de construcción para una vivienda sin un sistema séptico aprobado.
        </p>
        <p className="mt-3">
          Sin perc aprobado no hay permiso de séptico, y sin permiso de séptico no hay permiso de
          construcción. Es una de las razones más comunes por las que un lote rural barato resulta
          no ser construible.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Quién la hace y cuánto cuesta</h2>
        <p className="mt-2">
          Normalmente la realiza o supervisa un científico de suelos con licencia, un ingeniero o
          el departamento de salud ambiental del condado. El costo varía bastante por región y por
          las condiciones del lote, pero un rango aproximado es de 150 a 800 dólares.
        </p>
        <p className="mt-3">
          Es poco dinero comparado con el precio de compra, y justamente por eso saltárselo antes
          de comprar es un mal negocio.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Qué hace que un lote repruebe</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          <li>Mucha arcilla — el agua drena demasiado lento</li>
          <li>Nivel freático alto — no queda separación suficiente entre el campo de drenaje y el agua subterránea</li>
          <li>Roca madre poco profunda</li>
          <li>Lote demasiado chico para el campo de drenaje que exige ese tipo de suelo</li>
          <li>Pendiente pronunciada, o cercanía a un pozo, un cuerpo de agua o humedales</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Reprobar no siempre es el final</h2>
        <p className="mt-2">
          Algunos lotes que reprueban el perc estándar todavía pueden usar sistemas sépticos
          alternativos de ingeniería — sistemas de montículo, unidades de tratamiento aeróbico —
          pero cuestan bastante más de instalar, cuestan dinero de mantener cada año, y no están
          permitidos en todos lados.
        </p>
        <p className="mt-3">
          Si un lote reprueba, pregunta específicamente al departamento de salud del condado qué
          sistemas alternativos aprueban <em>antes</em> de darlo por perdido — y también antes de
          asumir que existe un plan B.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">Cuándo no tienes que preocuparte</h2>
        <p className="mt-2">
          Si el lote ya está conectado, o puede conectarse fácilmente, a una línea de alcantarillado
          municipal, el perc test es irrelevante para la construibilidad. Confirma la disponibilidad
          de alcantarillado directamente con el condado o el proveedor del servicio.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-lp-ink">La regla práctica</h2>
        <p className="mt-2">
          Si el lote depende de séptico y todavía no ha pasado un perc test, haz tu oferta
          contingente a que apruebe uno — o presupuesta la posibilidad real de que nunca lo haga.
        </p>
        <p className="mt-3">
          En Florida en particular, el nivel freático alto hace que esto falle más seguido de lo
          que la gente espera.{" "}
          <Link
            href="/es/guias/comprar-terreno-en-florida"
            className="font-medium text-lp-forest-light hover:underline"
          >
            Ver la lista completa para Florida →
          </Link>
        </p>
      </section>
    </GuideLayoutEs>
  );
}
