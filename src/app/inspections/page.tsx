// src/app/inspections/page.tsx
"use client";

import { useEffect, useState } from "react";
import type { Transformer } from "@/types";
import Link from "next/link";

export default function InspectionRecordsPage() {
  const [transformers, setTransformers] = useState<Transformer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransformers = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                transformers {
                  id
                  ncTe
                  utility
                  location
                  inspectionDate
                  tm
                  kva
                  transformerType
                  sensorGen
                  issues
                  createdAt
                }
              }
            `,
          }),
        });

        const { data } = await res.json();
        setTransformers(data?.transformers ?? []);
      } catch (err) {
        console.error("Failed to fetch transformers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransformers();
  }, []);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link
          href="/yard"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ← Add New Yard Inspection
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Inspection Records</h1>

      {loading ? (
        <p className="text-slate-600">Loading inspections...</p>
      ) : transformers.length === 0 ? (
        <p className="text-slate-600">No inspection records found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-3 py-2 border">NC/TE</th>
                <th className="px-3 py-2 border">Utility</th>
                <th className="px-3 py-2 border">Location</th>
                <th className="px-3 py-2 border">Issues</th>
                <th className="px-3 py-2 border">kVA</th>
                <th className="px-3 py-2 border">Type</th>
                <th className="px-3 py-2 border">TM</th>
                <th className="px-3 py-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transformers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 border">{t.ncTe ?? "—"}</td>
                  <td className="px-3 py-2 border">{t.utility ?? "—"}</td>
                  <td className="px-3 py-2 border">{t.location ?? "—"}</td>
                  <td className="px-3 py-2 border">{t.issues ?? "—"}</td>
                  <td className="px-3 py-2 border">{t.kva ?? "—"}</td>
                  <td className="px-3 py-2 border">
                    {t.transformerType ?? "—"}
                  </td>
                  <td className="px-3 py-2 border">{t.tm ?? "—"}</td>
                  <td className="px-3 py-2 border">
                    {t.inspectionDate ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
