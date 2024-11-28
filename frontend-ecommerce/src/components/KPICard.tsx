import "@/app/css/kpicard.css";
function KPICard({ title, value }: { title: string; value: number }) {
  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <p className="value">{value}</p>
    </div>
  );
}

export default KPICard;
