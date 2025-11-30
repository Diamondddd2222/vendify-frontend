export default function StoreDashboardSkeleton() {
  return (
    <div className="store-skeleton">
      <div className="skeleton store-skeleton-title" />

      <div className="grid-skeleton-boxes" style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[1,2,3,4].map((i) => (
          <div key={i} className="skeleton store-skeleton-box" />
        ))}
      </div>

      <div className="skeleton store-skeleton-banner" />
    </div>
  );
}
