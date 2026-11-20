"use client"
import { toast } from "@/components/ui/toast";
import { cartContext } from "@/context/cartNumber.context";
import { addProductCart } from "@/services/cartAction/addProductCart";
import { useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";

interface AddBtnProps {
    variant: "product" | "details",
    prodId: string
}

export default function AddBtn({ variant, prodId }: AddBtnProps) {

    const { setCartNumber } = useContext(cartContext)

    async function addToCart() {
        const response = await addProductCart(prodId)
        if (response.status == "success") {
            toast.add({
                title: "Success",
                description: response.message
            })
            setCartNumber(response.numOfCartItems)
        } else {
            toast.add({
                title: "Error",
                description: response.message
            })
        }
    }

    return (
        <>
            <button onClick={addToCart} className={
                variant === "product"
                    ? "text-green-600 hover:text-green-700 duration-200 cursor-pointer"
                    : "flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg cursor-pointer"
            }
            >
                {variant === "product" ? (
                    <IoIosAddCircle size={50} />
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                    </>
                )}
            </button>
        </>
    )
}