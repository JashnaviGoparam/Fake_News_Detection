import { Link } from "@tanstack/react-router";
import { ScanSearch } from "lucide-react";

const links = [
  { to: "/", label: "Detector" },
  { to: "/model", label: "Model & Results" },
  { to: "/about", label: "About Project" },
  { to: "/documentation", label: "Documentation" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-base font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <ScanSearch className="size-4" />
          </span>
          VeriNews
        </Link>
        <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-muted-foreground transition-colors hover:text-foreground data-[status=active]:font-medium data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground sm:px-6">
        <p className="font-medium text-foreground">Fake News Detection Using Machine Learning</p>
        <p className="mt-1">
          Final-year AI/ML project · TF-IDF + Logistic Regression · Flask reference backend included in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">/python</code>
        </p>
      </div>
    </footer>
  );
}
