import Image from "next/image";

function ProductCard({
  title,
  stock,
  image,
}: {
  title: string;
  stock: number;
  image: string;
}) {
  return (
    <div>
      <input type="checkbox" />
      <Image
        src={
          image ??
          "https://placehold.co/600x400/EEE/31343C?font=lato&text=Placeholder"
        }
        alt={title}
        width={180}
        height={150}
      />
      <h3>{title}</h3>
      <p>Stock: {stock}</p>
    </div>
  );
}

export default ProductCard;
