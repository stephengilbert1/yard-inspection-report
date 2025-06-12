import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">
        Yard Inspection Tool
      </h1>

      <div className="space-y-4 w-full max-w-sm">
        <Link
          href="/yard"
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded shadow"
        >
          New Yard Inspection
        </Link>

        <Link
          href="/inspections"
          className="block bg-gray-100 hover:bg-gray-200 text-center py-3 px-4 rounded shadow border"
        >
          Inspection Records
        </Link>
      </div>
    </main>
  );
}
