export default function PortfolioLoading() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="h-10 w-36 bg-white/20 rounded mb-2 animate-pulse" />
      <div className="h-4 w-28 bg-white/10 rounded mb-12 animate-pulse" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card p-6 flex flex-col gap-3">
            <div className="w-full aspect-video bg-slate-200 rounded-lg animate-pulse mb-1" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
            <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-100 rounded animate-pulse" />
            <div className="flex gap-2 mt-1">
              <div className="h-5 w-14 bg-slate-100 rounded-full animate-pulse" />
              <div className="h-5 w-14 bg-slate-100 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
