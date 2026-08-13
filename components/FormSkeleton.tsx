export function FormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <div className="mb-2 h-3 w-12 animate-pulse rounded bg-border" />
          <div className="h-8 animate-pulse rounded border-b border-border bg-transparent" />
        </div>
        <div>
          <div className="mb-2 h-3 w-12 animate-pulse rounded bg-border" />
          <div className="h-8 animate-pulse rounded border-b border-border bg-transparent" />
        </div>
      </div>
      <div>
        <div className="mb-2 h-3 w-16 animate-pulse rounded bg-border" />
        <div className="h-8 animate-pulse rounded border-b border-border bg-transparent" />
      </div>
      <div>
        <div className="mb-2 h-3 w-20 animate-pulse rounded bg-border" />
        <div className="h-20 animate-pulse rounded border-b border-border bg-transparent" />
      </div>
      <div className="h-11 w-36 animate-pulse rounded border border-border bg-surface-alt" />
    </div>
  );
}
