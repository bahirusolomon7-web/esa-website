"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-cream"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Ethiopian Seed Association, home">
          <Image src="/images/esa-logo.png" alt="" width={66} height={44} priority className="h-11 w-auto" />
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-[17px] font-semibold text-forest-900">Ethiopian Seed</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Association</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors ${
                    isActive(item.href) ? "bg-forest-900 text-cream" : "text-ink hover:bg-sand"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDown className="size-3.5 opacity-60 transition group-hover:rotate-180" aria-hidden />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="min-w-60 rounded-2xl border border-line bg-white p-2 shadow-xl shadow-forest-900/10">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-leaf-50 hover:text-forest-700"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/membership/directory"
            className="hidden size-11 items-center justify-center rounded-full text-ink hover:bg-sand md:flex"
            aria-label="Find a member"
            title="Find a member"
          >
            <Search className="size-5" aria-hidden />
          </Link>
          <Link
            href="/membership"
            className="hidden whitespace-nowrap rounded-full bg-wheat-400 px-5 py-2.5 text-sm font-bold text-forest-900 shadow-sm transition hover:bg-wheat-300 sm:inline-flex"
          >
            Join ESA
          </Link>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full bg-forest-900 text-cream lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-cream lg:hidden">
          <ul className="container-x space-y-1 py-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold ${
                    isActive(item.href) ? "bg-forest-900 text-cream" : "hover:bg-sand"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="ml-4 border-l border-line pl-3">
                    {item.children
                      .filter((c) => c.href !== item.href)
                      .map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:text-forest-700">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-3">
              <Link href="/membership" className="block rounded-xl bg-wheat-400 px-4 py-3 text-center font-bold text-forest-900">
                Join ESA
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
