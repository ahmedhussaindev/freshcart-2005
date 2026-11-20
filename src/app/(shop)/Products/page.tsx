import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { Iproduct } from "@/interfaces/product.interface";
import { getProducts } from "@/services/product.service";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import AddBtn from "@/components/shared/AddBtn/AddBtn";

export default async function Products() {

  const products = await getProducts()

  return (
     <div className="mx-auto my-8 w-[95%] md:w-[90%]">
      <SectionTitle sectionTitle="Popular Products" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {products.map((product: Iproduct) => (
          <div key={product.id} className="group h-full">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-100 hover:shadow-xl hover:shadow-green-900/5 md:p-4">

              {/* Product Image */}
              <Link href={`/Products/${product.id}`} className="relative mb-4 block overflow-hidden rounded-xl bg-slate-50">
                <Image className="aspect-square w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105" src={product.imageCover} width={400} height={400} alt={product.title}/>
                <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-green-700 shadow-sm md:text-xs">{product.category.name}</span>
              </Link>

              {/* Product Info */}
              <div className="flex flex-1 flex-col">
                <Link href={`/Products/${product.id}`}>
                  <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800 transition-colors group-hover:text-green-700 md:text-base">{product.title}</h3>
                </Link>

                {/* Rating */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 md:text-lg">
                  {Array.from({ length: 5 }, (_, i) => {
                    const value = product.ratingsAverage - i
                    return value >= 1 ? (
                      <IoIosStar key={i} className="text-yellow-500" />
                    ) : value >= 0.5 ? (
                      <IoIosStarHalf key={i} className="text-yellow-500" />
                    ) : (
                      <IoIosStar key={i} className="text-gray-300" />
                    )
                  })}
                </div>
                <span className="text-sm text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity})</span>
              </div>

                {/* Price & Cart */}
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-base font-bold text-slate-900 md:text-lg">
                      {product.price}
                      <span className="ml-1 text-md font-semibold text-slate-500">EGP</span>
                    </span>

                    <span className={`text-sm font-medium text-green-600 md:text-xs ${product.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
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
    </div>
  )
}