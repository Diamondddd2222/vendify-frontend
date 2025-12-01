export default function StorySkeleton() {
  return (
    <div className="story-skeleton skeleton">
      <div className="skeleton story-skeleton-avatar" />

      <div style={{ flex: 1 }}>
        <div className="skeleton story-skeleton-line" style={{ width: "60%" }} />
        <div className="skeleton story-skeleton-line" style={{ width: "40%" }} />
      </div>
    </div>
  );
}
