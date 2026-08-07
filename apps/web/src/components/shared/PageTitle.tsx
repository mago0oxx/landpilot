interface PageTitleProps {
  title: string;
  description?: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-lp-ink">{title}</h1>
      {description && <p className="mt-2 text-stone-500">{description}</p>}
    </div>
  );
}
