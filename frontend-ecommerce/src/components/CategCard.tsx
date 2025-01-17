import Link from "next/link";
import Image from "next/image";
import "@/app/css/kpicard.css";

function CategCard({ title, backImg, link }: { title: string; backImg: any; link: string }) {
    return (
        <div className="card-bg">
            <a href={link}>
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
            </a>
        </div>

    );
}

export default CategCard;