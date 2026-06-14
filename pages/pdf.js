import dynamic from "next/dynamic";

const PdfComponent = dynamic(() => import("components/pdf"), { ssr: false });

export default function App() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <PdfComponent />
      </div>
      <div className="border-2 border-red-400">LEFT</div>
    </div>
  );
}
