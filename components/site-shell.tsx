"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, CircleDot, Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { clsx } from "clsx";

const NAVIGATION = [
  { href: "/demo/", label: "Demo" },
  { href: "/seguimiento/", label: "Caso" },
  { href: "/verificacion/", label: "Verificación" },
  { href: "/inteligencia/", label: "Inteligencia" },
  { href: "/impacto/", label: "Impacto" },
];

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href.replace(/\/$/, ""));
}

function NavigationLinks({ pathname }: { pathname: string }) {
  return NAVIGATION.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      aria-current={isActive(pathname, item.href) ? "page" : undefined}
      className={clsx("nav-link", isActive(pathname, item.href) && "is-active")}
    >
      {item.label}
    </Link>
  ));
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>
      <div className="demo-ribbon">
        <span>
          <CircleDot size={12} aria-hidden="true" /> Datos simulados para
          demostración
        </span>
        <span className="ribbon-rule">
          La IA propone. Una persona verifica.
        </span>
      </div>
      <header className="site-header">
        <Logo />
        <nav className="primary-nav" aria-label="Navegación principal">
          <NavigationLinks pathname={pathname} />
        </nav>
        <Link className="header-cta" href="/demo/">
          Probar demo <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <details className="mobile-nav">
          <summary aria-label="Abrir navegación">
            <Menu size={19} aria-hidden="true" /> Menú
          </summary>
          <nav aria-label="Navegación móvil">
            <NavigationLinks pathname={pathname} />
            <Link className="nav-link" href="/metodologia/">
              Seguridad y límites
            </Link>
          </nav>
        </details>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div>
          <Logo compact />
          <p>Inteligencia de calidad para obra y postventa.</p>
        </div>
        <div className="footer-note">
          <p>Propuesta independiente para Metrovacesa AI Challenge II.</p>
          <Link href="/metodologia/">Metodología, seguridad y límites</Link>
        </div>
      </footer>
    </div>
  );
}
