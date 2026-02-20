export default function HomeSectionTitle({
  firstTitle,
  lastTitle,
}: {
  firstTitle: string;
  lastTitle: string;
}) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase">
        {firstTitle} <span className="text-green-700">{lastTitle}</span>
      </h2>
    </div>
  );
}
