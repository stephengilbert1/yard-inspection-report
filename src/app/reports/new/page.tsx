// src/app/reports/new/page.tsx

export default function NewReportPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        New Yard Inspection Report
      </h1>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="reportId"
            className="block text-sm font-medium text-slate-700"
          >
            NC/TE #
          </label>
          <input
            type="text"
            id="reportId"
            name="reportId"
            className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-slate-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="inspectionDate"
            className="block text-sm font-medium text-slate-700"
          >
            Inspection Date
          </label>
          <input
            type="date"
            id="inspectionDate"
            name="inspectionDate"
            className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start Report
        </button>
      </form>
    </main>
  );
}
