"use client";

import { useEffect, useState } from "react";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "accepted";
}

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(hasConsent());
    window.addEventListener("consent-changed", () => setConsent(hasConsent()));
    return () => {
      window.removeEventListener("consent-changed", () => setConsent(hasConsent()));
    };
  }, []);

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || !consent) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);

    const inline = document.createElement("script");
    inline.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { anonymize_ip: true });
    `;
    document.head.appendChild(inline);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inline);
    };
  }, [consent]);

  return null;
}
