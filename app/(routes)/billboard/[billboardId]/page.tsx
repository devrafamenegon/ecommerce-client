import getBillboard from "@/actions/get-billboard";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";

import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "./components/mobile-filter";
import Filter from "./components/filter";
import getCategories from "@/actions/get-categories";

export const revalidate = 0;

interface BillboardPageProps {
  params: {
    billboardId: string;
  },
  searchParams: {
    categoryId: string;
    colorId: string;
    sizeId: string;
  }
}

const BillboardPage: React.FC<BillboardPageProps> = async ({
  params,
  searchParams
}) => {
  const { billboardId } = params;
  const { categoryId, colorId, sizeId } = searchParams;

  const products = await getProducts({
    billboardId: billboardId,
    categoryId: categoryId,
    colorId: colorId,
    sizeId: sizeId
  });

  const billboard = await getBillboard(billboardId);

  const categories = await getCategories({ billboardId });
  const sizes = await getSizes();
  const colors = await getColors();
  
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard}/>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilter categories={categories} sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Categories"
                data={categories}
              />

              <Filter
                valueKey="sizeId"
                name="Sizes"
                data={sizes}
              />

              <Filter 
                valueKey="colorId"
                name="Colors"
                data={colors}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default BillboardPage;