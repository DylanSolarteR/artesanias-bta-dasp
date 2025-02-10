import "@/app/css/kpicard.css";
import ImageFb from "./ImageFb";

function CategCard({ title, backImg }: { title: string; backImg: any }) {
  return (
    <div className="card-bg">
      <div className="card-content">
        <ImageFb
          className="card-categ-img"
          alt={`Imagen de ${title}`}
          src={backImg}
          fill
          style={{ objectFit: "cover" }}
        />
        <h5>{title}</h5>
      </div>
    </div>
  );
}

export default CategCard;
