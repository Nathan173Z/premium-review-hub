import { Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onViewDetails: (id: string) => void;
}

const ProductGrid = ({ products, onViewDetails }: ProductGridProps) => {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Reviews Recentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={onViewDetails} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
