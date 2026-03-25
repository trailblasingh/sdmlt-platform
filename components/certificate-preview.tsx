"use client";

import { useState } from "react";

export function CertificatePreview() {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFillColor(6, 17, 31);
      doc.rect(0, 0, 297, 210, "F");
      doc.setDrawColor(126, 200, 255);
      doc.rect(10, 10, 277, 190);
      doc.setTextColor(245, 247, 251);
      doc.setFontSize(18);
      doc.text("SDMLT", 148.5, 38, { align: "center" });
      doc.setFontSize(28);
      doc.text("Certificate of Decision Thinking", 148.5, 62, { align: "center" });
      doc.setFontSize(16);
      doc.text("Awarded to", 148.5, 86, { align: "center" });
      doc.setFontSize(26);
      doc.text("Aarav Mehta", 148.5, 104, { align: "center" });
      doc.setFontSize(14);
      doc.text("For successful completion of Levels 1-4 and the final case assessment", 148.5, 122, {
        align: "center"
      });
      doc.text("Issued by Vikash Singh | School of Decision Thinking", 148.5, 150, { align: "center" });
      doc.text("Certificate ID: SDMLT-2026-0142", 148.5, 165, { align: "center" });
      doc.save("sdmlt-certificate.pdf");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="light-panel overflow-hidden">
      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-deep">Certificate Preview</p>
      </div>
      <div className="bg-slate-950 px-6 py-10 text-center text-white">
        <p className="text-sm uppercase tracking-[0.32em] text-accent">SDMLT</p>
        <h3 className="mt-4 font-display text-4xl">Certificate of Decision Thinking</h3>
        <p className="mt-8 text-sm text-slate-300">Awarded to</p>
        <p className="mt-2 font-display text-3xl">Aarav Mehta</p>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-slate-300">
          For completing all four levels, solving the final capstone case, and demonstrating structured
          decision-making across logic, frameworks, and business analysis.
        </p>
      </div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-sm text-slate-500">PDF-ready issuance flow with downloadable certificate output</div>
        <button
          onClick={handleDownload}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
        >
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}
