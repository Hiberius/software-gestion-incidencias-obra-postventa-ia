"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CircleDot } from "lucide-react";
import { Logo } from "@/components/logo";
import { clsx } from "clsx";

const NAVIGATION = [
  { href: "/", label: "Inicio" },
  { href: "/demo/", label: "Nueva incidencia" },
  { href: "/seguimiento/", label: "Seguimiento" },
  { href: "/verificacion/", label: "Verificación" },
  { href: "/inteligencia/", label: "Inteligencia" },
  { href: "/impacto/", label: "Impacto" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="site-frame">
      <div className="demo-ribbon">
        <span>
          <CircleDot size={12} aria-hidden="true" /> Datos simulados para
          demostración
        </span>
        <span className="ribbon-rule">
          La IA propone; un profesional valida.
        </span>
      </div>
      <header className="site-header">
        <Logo />
        <nav className="primary-nav" aria-label="Navegación principal">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "nav-link",
                isActive(pathname, item.href) && "is-active",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/demo/">
          Demo <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div>
          <Logo compact />
          <p>Inteligencia de calidad para obra y postventa.</p>
        </div>
        <div className="footer-note">
          <p>Propuesta independiente para Metrovacesa AI Challenge II.</p>
          <Link href="/metodologia/">Metodología, fuentes y límites</Link>
        </div>
      </footer>
    </div>
  );
}
