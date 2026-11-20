import MainSlider from "@/components/Home/mainSlider/MainSlider";
import Products from "./(shop)/Products/page";
import { lazy, Suspense } from "react";

const LazyHomeCategory = lazy(() => import('@/components/Home/categorySlider/CategorySlider'))

export default function Home() {
  return (
    <>
      {/* main slider */}
      <MainSlider />
      {/* cataegory slider */}
      <Suspense fallback={
        <div className="flex items-center justify-center h-500 bg-red-800">
          <p>Loading...</p>
        </div>
      }>
        <LazyHomeCategory />
      </Suspense>
      {/* products */}
      <Products />
    </>
  );
}