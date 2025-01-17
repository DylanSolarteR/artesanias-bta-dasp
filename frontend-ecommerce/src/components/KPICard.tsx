import "@/app/css/kpicard.css";
import Image from "next/image";

function KPICard({ title, value }: { title: string; value: number }) {
  return (
    <div className="container-kpi">
      <h4>{title}</h4>
      <h4>{value}</h4>
    </div>
  );
}

export default KPICard;
