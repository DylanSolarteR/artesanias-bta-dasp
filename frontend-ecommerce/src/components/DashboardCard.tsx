import "@/app/css/dashboard-card.css";
import Link from "next/link";
import Image from "next/image";

function DashboardCard({
  title,
  icon,
  href,
}: {
  title: string;
  icon: any;
  href: string;
}) {
  return (
    <div className="cards">
      <Link href={href}>
        <h1>{title}</h1>
        <Image alt={`${"tarjeta " + title}`} src={icon}></Image>
      </Link>
    </div>
  );
}

export default DashboardCard;
