import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";
import { ICategory } from "@/interfaces/category.interface";
import { getCategories } from "@/services/category.service";

export default async function Categories() {
    const categories: ICategory[] = await getCategories();

    if (!categories.length) {
        return <h2 className="my-10 text-center">No Categories Found</h2>;
    }

    return (
        <div className="mx-auto my-10 w-[95%] md:w-[90%]">
            <SectionTitle sectionTitle="Shop By Category" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {categories.map((category) => (
                    <Link href={`/Category/${category._id}`} key={category._id} className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                        <div className="relative h-36 overflow-hidden bg-gray-50 sm:h-44">
                            <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h2 className="px-2 py-4 text-center text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-600 md:text-base">
                            {category.name}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
}
