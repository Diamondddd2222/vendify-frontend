export default function VendorCardSkeleton() {
  return (
    <div className="vendor-skeleton">
      <div className="skeleton vendor-skeleton-img" />

      <div className="skeleton vendor-skeleton-line" style={{ width: "70%" }} />
      <div className="skeleton vendor-skeleton-line" style={{ width: "50%" }} />
      <div className="skeleton vendor-skeleton-btn" />
    </div>
  );
}
