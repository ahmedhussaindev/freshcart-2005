import Image from "next/image"
import { getBrands } from "@/services/brands.service"
import Link from "next/link"

export default async function Brands() {
  const response = await getBrands()

  if (response.data.length === 0) {
    return <h2 className="my-10 text-center">No Brands Found</h2>
  }

  return (
    <div className="mx-auto my-10 w-[90%]">
      <h1 className="mb-8 text-center text-3xl font-bold text-green-700">Our Brands</h1>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {response.data.map((brand: any) => (
          <Link href={`/Brands/${brand._id}`} key={brand._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg">
            <Image src={brand.image} alt={brand.name} width={200} height={150} className="mx-auto h-32 w-full object-contain" />
            <h2 className="mt-4 text-center font-semibold text-gray-800">{brand.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}