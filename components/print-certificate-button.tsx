"use client";

export function PrintCertificateButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 print:hidden"
    >
      Download / Print
    </button>
  );
}
