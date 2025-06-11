// src/app/yard/page.tsx
"use client";

import { useState } from "react";
import type { Transformer } from "@/types";
import InspectionForm from "@/components/InspectionForm";
import InspectionTable from "@/components/InspectionTable";

export default function YardPage() {
  const [groups, setGroups] = useState<Transformer[]>([]);

  const addGroup = (group: Transformer, qty: number) => {
    const expanded = Array.from({ length: qty }, () => ({
      ...group,
      id: crypto.randomUUID(), // add unique ID to each transformer
    }));

    setGroups((prev) => [...prev, ...expanded]);
  };

  function removeGroup(index: number) {
    setGroups((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Yard Inspection Report</h1>
      <InspectionForm onAddGroup={addGroup} />
      <InspectionTable groups={groups} onRemove={removeGroup} />
    </main>
  );
}
