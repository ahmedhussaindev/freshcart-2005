"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { SwiperOptions } from "swiper/types";
import Link from "next/link";

interface slide {
    src: string;
    label: string;
    id?: string;
}

interface CommonSlideProps {
    slides: slide[];
    variant: "main" | "category";
    swiperOptions?: SwiperOptions;
}

export default function CommonSlider({ slides, variant, swiperOptions }: CommonSlideProps) {
    return (
        <Swiper
            slidesPerView={variant === "main" ? 1 : 2}
            spaceBetween={variant === "main" ? 0 : 16}
            pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-gray-300 !opacity-100",
                bulletActiveClass: "swiper-pagination-bullet-active !bg-green-600 !w-6 !rounded-full",
            }}
            modules={[Pagination, Autoplay]}
            autoplay={variant === "main" ? { delay: 4000, disableOnInteraction: false } : false}
            loop={variant === "main"}
            {...swiperOptions}
            className={`pb-10! ${variant === "main" ? "main-slider" : "category-slider"}`}
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={`${slide.label}-${index}`}>
                    {variant === "main" ? (
                        <div className="relative h-55 overflow-hidden rounded-xl sm:h-75 md:h-95 lg:h-110">
                            <Image
                                src={slide.src}
                                alt={slide.label}
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <Link href={`/Category/${slide.id}`} className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="relative h-32.5 overflow-hidden bg-gray-50 sm:h-40 md:h-47.5">
                                <Image
                                    src={slide.src}
                                    alt={slide.label}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h2 className="px-2 py-4 text-center text-sm font-semibold text-gray-800 transition-colors group-hover:text-green-600 md:text-base">
                                {slide.label}
                            </h2>
                        </Link>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
