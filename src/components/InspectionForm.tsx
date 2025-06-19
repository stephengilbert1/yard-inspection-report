// src/components/InspectionForm.tsx
"use client";

import { useState } from "react";
import type { Transformer } from "@/types";
import CreatableSelect from "react-select/creatable";

type Props = {
  onAddGroup: (group: Transformer, qty: number) => void;
};

const issueOptions = [
  { value: "SL Installed Incorrectly", label: "SL Installed Incorrectly" },
  { value: "Activated Sensor", label: "Activated Sensor" },
  {
    value: "Activated on removal of SL",
    label: "Activated on removal of SL",
  },
  {
    value: "Activated on venting of PRV",
    label: "Activated on venting of PRV",
  },
  {
    value: "Incorrect PRV Installation",
    label: "Incorrect PRV Installation",
  },
  { value: "Leaking", label: "Leaking" },
  { value: "Damage", label: "Damage" },
];

export default function InspectionForm({ onAddGroup }: Props) {
  const [qty, setQty] = useState<number>(1);
  const [ncTe, setNcTe] = useState("");
  const [utility, setUtility] = useState("");
  const [location, setLocation] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");
  const [tm, setTM] = useState("");
  const [kva, setKVA] = useState<number | undefined>(undefined);
  const [type, setType] = useState<Transformer["transformerType"]>(undefined);
  const [sensorGen, setSensorGen] = useState("");
  const [issues, setIssues] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    const mutation = `
    mutation AddTransformers($input: TransformerInput!) {
      addTransformers(input: $input) {
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
      }
    }
  `;

    const input = {
      ncTe,
      utility,
      location,
      inspectionDate,
      quantity: qty,
      tm,
      kva,
      transformerType: type,
      sensorGen,
      issues,
    };

    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables: { input } }),
      });

      const { data, errors } = await res.json();
      console.log("Full mutation response:", data);

      if (errors) {
        console.error("GraphQL errors:", errors);
        alert(`GraphQL Error: ${errors[0].message}`);
        return;
      }

      if (data?.addTransformers?.length) {
        const first = data.addTransformers[0];
        if (first) {
          onAddGroup({ ...first, tm, type: first.transformerType }, qty);
        }
      }

      // Reset only the batch-specific fields
      setQty(1);
      setTM("");
      setKVA(undefined);
      setType(undefined);
      setSensorGen("");
      setIssues("");
    } catch (err) {
      console.error("Mutation failed", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            NC/TE #
          </label>
          <input
            type="text"
            value={ncTe}
            onChange={(e) => setNcTe(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Utility
          </label>
          <input
            type="text"
            value={utility}
            onChange={(e) => setUtility(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Inspection Date
          </label>
          <input
            type="date"
            value={inspectionDate}
            onChange={(e) => setInspectionDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Qty
          </label>
          <input
            type="number"
            value={qty}
            min={1}
            onChange={(e) => {
              const val = e.target.value;
              setQty(val === "" ? 1 : parseInt(val));
            }}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">TM</label>
          <input
            type="text"
            value={tm}
            onChange={(e) => setTM(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            kVA
          </label>
          <input
            type="number"
            value={kva ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setKVA(val === "" ? undefined : parseFloat(val));
            }}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Type
          </label>
          <select
            value={type || ""}
            onChange={(e) =>
              setType(
                e.target.value as
                  | "1ph pole"
                  | "3ph pole"
                  | "1ph pad"
                  | "3ph pad"
                  | undefined
              )
            }
            className="mt-1 w-full border rounded px-3 py-2"
          >
            <option value="">—</option>
            <option value="1ph pole">1ph pole</option>
            <option value="3ph pole">3ph pole</option>
            <option value="1ph pad">1ph pad</option>
            <option value="3ph pad">3ph pad</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Sensor Generation
          </label>
          <input
            type="text"
            value={sensorGen}
            onChange={(e) => setSensorGen(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Issues
          </label>
          <CreatableSelect
            isClearable
            onChange={(selected) => setIssues(selected?.value || "")}
            options={issueOptions}
            placeholder="Select or type an issue"
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "white",
                borderColor: state.isFocused ? "#000000" : "none",
                boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
                borderWidth: state.isFocused ? 2 : 1,
                borderRadius: 6,
                paddingLeft: 8,
                paddingRight: 8,
                minHeight: "2.5rem",
                fontSize: "1rem",
                transition: "border 0.2s ease, box-shadow 0.2s ease",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 20,
              }),
              placeholder: (base) => ({
                ...base,
                color: "#94a3b8",
              }),
            }}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Inspection Group
        </button>
      </form>
    </div>
  );
}
