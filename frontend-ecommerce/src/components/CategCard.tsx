import Link from "next/link";
import Image from "next/image";
import "@/app/css/kpicard.css";

function CategCard({ title, backImg }: { title: string; backImg: any }) {
    return (
        <div className="card-bg">
            <div className="card-content">
                <Image
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