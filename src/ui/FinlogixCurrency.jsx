"use client"; // Required for widgets that use 'window' or 'document'

import Script from "next/script";

export default function FinlogixCurrency() {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      {/* 1. The Container Div */}
      <div className="finlogix-container"></div>

      {/* 2. Load the Library */}
      <Script
        src="https://widget.finlogix.com/Widget.js"
        strategy="afterInteractive"
        onReady={() => {
          // 3. Initialize after script is ready
          if (typeof window !== "undefined" && window.Widget) {
            window.Widget.init({
              widgetId: "504879f5-fbe0-4c17-a571-582eefc58a77",
              type: "CurrencyConverter",
              language: "en",
              isAdaptive: true,
              withBorderBox: true,
            });
          }
        }}
      />
    </div>
  );
}
