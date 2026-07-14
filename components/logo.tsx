import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="REPASO AI — inicio">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      {!compact && (
        <span className="brand-type">
          <strong>REPASO</strong>
          <small>AI</small>
        </span>
      )}
    </Link>
  );
}
