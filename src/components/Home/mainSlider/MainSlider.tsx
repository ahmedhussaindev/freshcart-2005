import slide1 from "@/assets/images/slider-image-1.jpeg";
import slide2 from "@/assets/images/slider-image-2.jpeg";
import slide3 from "@/assets/images/slider-image-3.jpeg";
import CommonSlider from "@/components/shared/CommonSlider/CommonSlider";

export default function MainSlider() {
    const slides = [
        { src: slide1.src, label: "FreshCart Banner 1" },
        { src: slide2.src, label: "FreshCart Banner 2" },
        { src: slide3.src, label: "FreshCart Banner 3" },
    ];

    return (
        <div className="container mx-auto mt-5 w-[95%]">
            <CommonSlider slides={slides} variant="main" />
        </div>
    );
}