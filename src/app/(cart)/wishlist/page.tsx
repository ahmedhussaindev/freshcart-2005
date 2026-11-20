"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/components/ui/toast"
import { getWishlist } from "@/services/wishlistAction/getWishlist"
import { removeProductWishlist } from "@/services/wishlistAction/removeProductWishlist"
import { FaHeart } from "react-icons/fa"

export default function Wishlist() {

    const [productList, setProductList] = useState<any[]>([])

    async function getWishlistData() {
        try {
            const response = await getWishlist()

            if (response.status === "success") {
                setProductList(response.data)
            }
        } catch (err) {
            toast.add({
                title: "Error",
                description: "There is an error loading wishlist"
            })
        }
    }

    async function removeProduct(productId: string) {
        try {
            const response = await removeProductWishlist(productId)

            if (response.status === "success") {
                setProductList(current => current.filter(product => product._id !== productId))

                toast.add({
                    title: "Success",
                    description: response.message
                })
            }
        } catch (err) {
            toast.add({
                title: "Error",
                description: "There is an error removing product"
            })
        }
    }

    useEffect(() => {
        getWishlistData()
    }, [])

    if (productList.length === 0) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
                <FaHeart size={55} className="text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h2>
                <p className="text-gray-500">Save products you love and find them here.</p>
                <Link href="/Products" className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700">Explore Products</Link>
            </div>
        )
    }

    return (
        <div className="mx-auto my-10 w-[95%] lg:w-[90%]">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">My Wishlist</h1>
            <p className="mb-8 text-gray-500">{productList.length} saved products</p>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {productList.map(product => (
                    <div key={product._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <Link href={`/Products/${product._id}`}>
                            <div className="relative mb-4 h-48">
                                <Image src={product.imageCover} alt={product.title} fill className="object-contain" />
                            </div>
                            <h2 className="line-clamp-2 font-semibold text-gray-800">{product.title}</h2>
                            <p className="mt-3 font-bold text-green-700">{product.price} EGP</p>
                        </Link>

                        <button type="button" onClick={() => removeProduct(product._id)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                            <FaHeart /> Remove</button>
                    </div>
                ))}
            </div>
        </div>
    )
}