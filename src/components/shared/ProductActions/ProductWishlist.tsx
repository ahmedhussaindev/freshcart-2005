"use client"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/toast"
import { addProductWishlist } from "@/services/wishlistAction/addProductWishlist"
import { removeProductWishlist } from "@/services/wishlistAction/removeProductWishlist"
import { getWishlist } from "@/services/wishlistAction/getWishlist"
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Props {
    productId: string
}

export default function ProductWishlist({ productId }: Props) {

    const [inWishlist, setInWishlist] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function checkWishlist() {

            const response = await getWishlist()
            if (response.status == "success") {
                const exists = response.data.some((item: any) => item._id === productId)
                setInWishlist(exists)
            }
        }
        checkWishlist()
    }, [productId])

    async function toggleWishlist() {
        try {
            setLoading(true)
            const response = inWishlist ? await removeProductWishlist(productId) : await addProductWishlist(productId)

            if (response.status === "success") {
                setInWishlist(!inWishlist)

                toast.add({
                    title: "Success",
                    description: response.message
                })
            } else {
                toast.add({
                    title: "Error",
                    description: response.message
                })
            }

        } catch (err) {
            toast.add({
                title: "Error",
                description: "There is an error updating wishlist"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <button type="button" onClick={toggleWishlist} disabled={loading} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50 transition duration-200 hover:-translate-y-0.5  hover:shadow-lg cursor-pointer">
            {inWishlist ? (<FaHeart className="text-red-500" size={18} />) : (<FaRegHeart size={18} />)}
            {loading ? "Please wait..." : inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
    )
}