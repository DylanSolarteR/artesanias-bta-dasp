import { PRODUCT } from "@/app/(non-protected)/(with-navbar)/(without-sidebar)/catalogo/page";
import BagsadIcon from "@/app/icons/BagsadIcon.png";
import Link from "next/link";
import { useMainContext } from "@/app/context/MainContext";
import "@/app/css/Catalog-product.css";
import ImageFb from "./ImageFb";

function Catalog({ products }: { products: PRODUCT[] }) {
  const { gridClass } = useMainContext();

  return products?.length === 0 ? (
    <div className="empty-message">
      <ImageFb src={BagsadIcon} alt="Nothing" width={100} height={100} />
      <p>Lo sentimos, no se encuentran productos en este momento.</p>
    </div>
  ) : (
    <div className={`list-product ${gridClass}`}>
      {products?.map((product: PRODUCT, index: number) => (
        <article key={index}>
          <div className="img-container">
            <ImageFb
              src={
                product.imagen ??
                "https://placehold.co/600x400/EEE/31343C?font=lato&text=NoImage"
              }
              alt={product.nombre}
              height={200}
              width={300}
            />
          </div>
          <div className="details">
            <h2>{product.nombre}</h2>
            <p>${product.precio}</p>
          </div>
          <Link href={`/producto/${product.id}`} passHref>
            <div className="overlay">- Ver detalles -</div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export default Catalog;
