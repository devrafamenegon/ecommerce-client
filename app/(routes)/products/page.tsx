import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";

import ProductList from "@/components/product-list";

export const revalidate = 0;

interface ProductsPageProps {
  searchParams: {
    name: string;
  }
}

const ProductsPage: React.FC<ProductsPageProps> = async ({
  searchParams
}) => {
  const products = await getProducts({
    name: searchParams.name
  })

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 mt-4">
          <ProductList title={`Results for '${searchParams.name}'`} items={products} />
        </div>
      </div>
    </Container>
  )
}

export default ProductsPage;