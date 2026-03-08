export default function BlogLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="h-10 w-24 bg-white/20 rounded mb-2 animate-pulse" />
      <div className="h-4 w-20 bg-white/10 rounded mb-12 animate-pulse" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-6 flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-5 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
