// src/components/InspectionTable.tsx
import type { Transformer } from "@/types";

type Props = {
  groups?: Transformer[];
  onRemove?: (index: number) => void;
};

export default function InspectionTable({ groups = [], onRemove }: Props) {
  if (groups.length === 0)
    return <p className="text-slate-500">No inspections yet.</p>;

  return (
    <table className="w-full border mt-6 text-sm">
      <thead className="bg-slate-100">
        <tr>
          <th className="text-left px-3 py-2 border-b">TM</th>
          <th className="text-left px-3 py-2 border-b">kVA</th>
          <th className="text-left px-3 py-2 border-b">Type</th>
          <th className="text-left px-3 py-2 border-b">Issues</th>
          <th className="text-left px-3 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, idx) => (
          <tr key={group.id || idx} className="hover:bg-slate-50">
            <td className="px-3 py-2 border-b">{group.tm ?? "—"}</td>
            <td className="px-3 py-2 border-b">{group.kva ?? "—"}</td>
            <td className="px-3 py-2 border-b">
              {group.transformerType || "—"}
            </td>
            <td className="px-3 py-2 border-b">{group.issues || "—"}</td>

            <td className="px-3 py-2 border-b">
              <button
                onClick={() => onRemove?.(idx)}
                className="text-red-600 hover:underline text-sm"
              >
                🗑️ Remove
              </button>
            </td>
          </tr>
        ))}
        <tr className="font-semibold bg-slate-50">
          <td className="px-3 py-2 border-t" colSpan={7}>
            Total: {groups.length} Transformers
          </td>
        </tr>
      </tbody>
    </table>
  );
}
