export default function PortfolioLoading() {
  return (
    <main className="flex flex-1 items-center justify-center bg-paper">
      <div className="flex flex-col items-center gap-4">
        <div className="h-1 w-16 bg-pen" />
        <p className="font-mono text-xs uppercase tracking-[0.06em] text-ink-60">
          Loading manuscript...
        </p>
      </div>
    </main>
  );
}
