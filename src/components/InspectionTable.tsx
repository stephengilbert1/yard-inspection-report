// src/components/InspectionTable.tsx
import type { Transformer } from "@/types";
import { convertToCSV, downloadCSV } from "@/utils/csvExport";

type Props = {
  groups?: Transformer[];
  onRemove?: (index: number) => void;
};

export default function InspectionTable({ groups = [], onRemove }: Props) {
  if (groups.length === 0)
    return <p className="text-slate-500">No inspections yet.</p>;

  const handleExportCSV = () => {
    const csv = convertToCSV(groups);
    downloadCSV(csv);
  };

  const meta = groups[0];

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 bg-white shadow-md rounded-xl p-6">
          <div className="text-sm text-slate-700 space-y-1">
            <p>
              <strong>NC/TE:</strong> {meta.ncTe}
            </p>
            <p>
              <strong>Utility:</strong> {meta.utility}
            </p>
            <p>
              <strong>Location:</strong> {meta.location}
            </p>
            <p>
              <strong>Inspection Date:</strong> {meta.inspectionDate}
            </p>
          </div>

          <button className="mt-4 md:mt-0 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
            Export table as CSV
          </button>
        </div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden space-y-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    TM
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    kVA
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sensor Gen
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, idx) => (
                  <tr
                    key={group.id || idx}
                    className="hover:bg-slate-50 border-b border-slate-100"
                  >
                    <td className="px-4 py-3">{group.tm ?? "—"}</td>
                    <td className="px-4 py-3">{group.kva ?? "—"}</td>
                    <td className="px-4 py-3">
                      {group.transformerType ?? "—"}
                    </td>
                    <td className="px-4 py-3">{group.sensorGen ?? "—"}</td>
                    <td className="px-4 py-3">{group.issues ?? "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onRemove?.(idx)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-medium text-slate-700">
                  <td colSpan={6} className="px-4 py-3 text-right">
                    Total: {groups.length} Transformers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
