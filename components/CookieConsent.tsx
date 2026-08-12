"use client";

import { useEffect, useState } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie-consent");
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("consent-changed"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("consent-changed"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/10 bg-paper shadow-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-3 sm:flex-row sm:justify-between sm:px-6">
        <p className="text-sm text-ink-60">
          This site uses analytics cookies to understand how visitors find and
          use the portfolio. No personal data is sold or shared.
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={decline}
            className="px-4 py-2 font-mono text-xs uppercase tracking-[0.06em] text-ink-60 hover:text-ink"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="bg-moss px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.06em] text-paper hover:bg-ink"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
