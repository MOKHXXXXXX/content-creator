"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "bg-bg"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text"
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.06em] text-text-muted transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="border border-accent px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent transition-all hover:bg-accent hover:text-bg"
          >
            Hire Me
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-text-muted md:hidden hover:text-text"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-b border-border bg-surface transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-b-0"
        )}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] text-text-muted hover:text-text"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="block border border-accent px-3 py-2 text-center font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent hover:bg-accent hover:text-bg"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      </div>
    </header>
  );
}
