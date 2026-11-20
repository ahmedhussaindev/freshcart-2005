import CommonSlider from "@/components/shared/CommonSlider/CommonSlider";
import { ICategory } from "@/interfaces/category.interface";
import { getCategories } from "@/services/category.service";
import SectionTitle from "@/components/shared/sectionTitle/SectionTitle";

export default async function CategorySlider() {
    const categoryOptions = {
        breakpoints: {
            500: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 18,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 24,
            },
            1280: {
                slidesPerView: 6,
                spaceBetween: 24,
            },
        },
    };

    const categories = await getCategories();

    const slides = categories.map((category: ICategory) => ({
        id: category._id,
        src: category.image,
        label: category.name
    }))

    return (
        <div className="mx-auto my-10 w-[92%] md:w-[90%]">
            <SectionTitle sectionTitle="Browse By Category" />
            <CommonSlider slides={slides} swiperOptions={categoryOptions} variant="category" />
        </div>
    );
}