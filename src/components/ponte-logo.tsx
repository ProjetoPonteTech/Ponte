import Link from "next/link";

export function PonteSymbol({ trimOrangeEnd = false }: { trimOrangeEnd?: boolean }) {
  return (
    <>
      <path d="M104 402V235a144 144 0 0 1 288 0v167h-66V235a78 78 0 0 0-156 0v167z" fill="var(--blue)" />
      <path d="M104 302h144c54 0 98 44 98 98" stroke="var(--accent)" strokeWidth="28" pathLength={trimOrangeEnd ? 1 : undefined} strokeDasharray={trimOrangeEnd ? "0.975 1" : undefined} />
      <circle cx="104" cy="302" r="10" fill="var(--background)" />
      <circle cx="346" cy="402" r="10" fill="var(--background)" />
    </>
  );
}

export function PonteLogo() {
  return (
    <Link className="brand" href="/" aria-label="PONTE — início">
      <svg width="36" height="32" viewBox="94 91 298 321" fill="none" aria-hidden="true">
        <PonteSymbol trimOrangeEnd />
      </svg>
      PONTE
    </Link>
  );
}
