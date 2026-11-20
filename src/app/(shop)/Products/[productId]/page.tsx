import { Iproduct } from "@/interfaces/product.interface"
import { getProductsDetails } from "@/services/product.service"
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import Image from "next/image"
import AddBtn from "@/components/shared/AddBtn/AddBtn";
import ProductWishlist from "@/components/shared/ProductActions/ProductWishlist"

export default async function ProductDetails(params: any) {

  const param = await params.params
  const { productId } = param
  const details: Iproduct = await getProductsDetails(productId)

  return (
    <div className="m-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="container mx-auto p-5 md:p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">

          {/* Product Image */}
          <div className="flex items-center justify-center rounded-2xl bg-gray-50 p-6 md:p-10">
            <Image src={details.imageCover} width={500} height={500} alt={details.title} className="h-auto max-h-112.5 w-full max-w-100 object-contain" />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">

            {/* Category */}
            <div className="mb-3 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-lg font-semibold text-green-600">{details.category.name}</span>
            </div>

            {/* Title */}
            <h2 className="mb-4 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">{details.title}</h2>

            {/* Brand */}
            <h3 className="mb-4 text-lg text-gray-600">Brand:
              <span className="ml-2 font-semibold text-green-600">{details.brand.name}</span>
            </h3>

            {/* Price */}
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">{details.price} EGP</span>
            </div>

            {/* Rating */}
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xl">
                {Array.from({ length: 5 }, (_, i) => {
                  const value = details.ratingsAverage - i

                  return value >= 1 ? (
                    <IoIosStar key={i} className="text-yellow-500" />
                  ) : value >= 0.5 ? (
                    <IoIosStarHalf key={i} className="text-yellow-500" />
                  ) : (
                    <IoIosStar key={i} className="text-gray-300" />
                  )
                })}
              </div>
              <span className="text-sm text-gray-500">{details.ratingsAverage} ({details.ratingsQuantity} reviews)</span>
            </div>

            {/* Description */}
            <p className="mb-7 text-base leading-7 text-gray-600">{details.description}</p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <AddBtn variant="details" prodId={productId} />
              <ProductWishlist productId={productId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}