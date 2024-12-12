import Link from "next/link";
import Image from "next/image";

function DashboardCard({
  title,
  image,
  href,
}: {
  title: string;
  image: any;
  href: { title: string; href: string; icon: any }[];
}) {
  return (
    <div className="dashboard-card">
      {href.map((link, index) => (
        <Link key={index} href={link.href}>
          <div className="card-motion">
            <div className="wrapper">
              <Image
                className="cover-image"
                alt={`Imagen de ${title}`}
                src={image}
              />
            </div>
            <h4 className="title-card-motion">{title}</h4>
            <Image
              className="character"
              alt={`Icono de ${link.title}`}
              src={link.icon}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DashboardCard;
