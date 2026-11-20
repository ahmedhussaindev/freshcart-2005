
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import AddBtn from "@/components/shared/AddBtn/AddBtn";
import { Iproduct } from "@/interfaces/product.interface";
import { getCategoryDetails, getProductsByCategory } from "@/services/category.service";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [category, products] = await Promise.all([
    getCategoryDetails(id),
    getProductsByCategory(id)
  ]);

  if (!category) {
    return <h2 className="my-10 text-center">Category Not Found</h2>;
  }

  return (
    <div className="mx-auto my-10 w-[95%] md:w-[90%]">
      <div className="mb-10 flex flex-col items-center gap-5 rounded-2xl bg-white p-6 shadow-sm md:flex-row">
        <Image src={category.image} alt={category.name} width={180} height={180} className="h-36 w-36 rounded-xl object-cover" />
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">{category.name}</h1>
      </div>

      <SectionTitle sectionTitle={`${category.name} Products`} />

      {!products.length ? (
        <p className="my-10 text-center text-gray-500">No Products Found</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {products.map((product: Iproduct) => (
            <div key={product.id} className="group h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 md:p-4">

                <Link href={`/Products/${product.id}`} className="relative mb-4 block overflow-hidden rounded-xl bg-slate-50">
                  <Image className="aspect-square w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" src={product.imageCover} width={400} height={400} alt={product.title} />
                  <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-green-700 shadow-sm md:text-xs">{product.category.name}</span>
                </Link>

                <div className="flex flex-1 flex-col">
                  <Link href={`/Products/${product.id}`}>
                    <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800 transition-colors group-hover:text-green-700 md:text-base">{product.title}</h3>
                  </Link>

                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1 md:text-lg">
                      {Array.from({ length: 5 }, (_, i) => {
                        const value = product.ratingsAverage - i;
                        return value >= 1 ? (
                          <IoIosStar key={i} className="text-yellow-500" />
                        ) : value >= 0.5 ? (
                          <IoIosStarHalf key={i} className="text-yellow-500" />
                        ) : (
                          <IoIosStar key={i} className="text-gray-300" />
                        );
                      })}
                    </div>
                    <span className="text-sm text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-base font-bold text-slate-900 md:text-lg">
                        {product.price}
                        <span className="ml-1 text-md font-semibold text-slate-500">EGP</span>
                      </span>

                      <span className={`text-sm font-medium md:text-xs ${product.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    <AddBtn variant="product" prodId={product.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}