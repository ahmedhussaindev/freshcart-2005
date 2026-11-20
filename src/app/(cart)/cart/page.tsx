"use client"
import { toast } from "@/components/ui/toast";
import { IproductRoot } from "@/interfaces/cart.interface";
import { clearCart } from "@/services/cartAction/clearCart";
import { deleteProduct } from "@/services/cartAction/deleteProductCart";
import { getCartProduct } from "@/services/cartAction/getProductCart";
import { useContext, useEffect, useState } from "react";
import emptyCart from "@/assets/images/empty-cart.webp"
import Image from "next/image";
import { updateProductCart } from "@/services/cartAction/updateCart";
import { cartContext } from "@/context/cartNumber.context";
import Link from "next/link";

export default function Cart() {

  const { setCartNumber } = useContext(cartContext)

  const [productList, setProductList] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [cartId, setcartId] = useState(0)


  async function getCartData() {
    const response = await getCartProduct()
    setcartId(response.cartId)
    setTotalPrice(response.data.totalCartPrice)
    setProductList(response.data.products)
    setCartNumber(response.numOfCartItems)
  }

  async function removeCartProduct(prodId: string) {
    try {
      const response = await deleteProduct(prodId)
      setTotalPrice(response.data.totalCartPrice)
      setProductList(response.data.products)
      setCartNumber(response.numOfCartItems)
      if (response.status == 'success') {
        toast.add({
          title: "Success",
          description: response.message
        })
      }
    } catch (err) {
      toast.add({
        title: "error",
        description: 'there is an error in removing product from cart'
      })
    }
  }

  useEffect(() => {
    getCartData()
  }, [])

  async function removeAllCart() {
    try {
      const response = await clearCart()
      setTotalPrice(response.data.totalCartPrice)
      setProductList(response.data.products)
      setCartNumber(response.numOfCartItems)
      if (response.status == 'success') {
        toast.add({
          title: "Success",
          description: response.message
        })
      }
    } catch (err) {
      toast.add({
        title: "error",
        description: 'there is an error in clear this cart'
      })
    }
  }

  async function updateCart(prodId: string, count: number) {
    try {
      const response = await updateProductCart(prodId, count)
      if (response.status == 'success') {
        getCartData()
      }
    } catch (err) {
      toast.add({
        title: "error",
        description: 'there is an error in change this quntaty'
      })
    }
  }

  if (productList.length == 0) {
    return <div className="flex  justify-center items-center h-screen">
      <Image src={emptyCart} alt="emptyCart" />
    </div>
  }
  return (
    <div className="mx-auto my-10 w-[95%] lg:w-[90%]">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Shopping Cart</h1>
          <p className="mt-1 text-sm text-slate-500">Review your items before checkout</p>
        </div>
        <button type="button" onClick={removeAllCart} disabled={!productList.length} className="rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">

        {/* Cart Products */}
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

            <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 md:grid">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-3">Quantity</div>
              <div className="col-span-2 text-right">Action</div>
            </div>

            <div className="divide-y divide-slate-100">
              {productList.map((product: IproductRoot) => (
                <div key={product.product._id} className="grid grid-cols-1 items-center gap-4 p-5 transition hover:bg-slate-50/70 md:grid-cols-12 md:gap-4 md:px-6">

                  {/* Product */}
                  <div className="flex items-center gap-4 md:col-span-5">
                    <img src={product.product.imageCover} alt={product.product.title} className="size-20 rounded-xl bg-slate-50 object-contain p-2" />
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">{product.product.title}</h3>
                      <p className={`mt-2 text-xs font-medium ${product.product.quantity > 0 ? "text-green-600" : "text-red-500"}`}>
                        {product.product.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between md:col-span-2 md:block">
                    <span className="text-xs text-slate-400 md:hidden">Price</span>
                    <p className="text-sm font-bold text-slate-800">{product.price} EGP</p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between md:col-span-3 md:block">
                    <span className="text-xs text-slate-400 md:hidden">Quantity</span>

                    <div className="inline-flex items-center gap-3 rounded-xl border border-slate-200 p-1">
                      <button type="button" disabled={product.count <= 1} onClick={() => updateCart(product.product._id, product.count - 1)} className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed disabled:opacity-30">
                        −
                      </button>
                      <span className="min-w-5 text-center text-sm font-semibold text-slate-800">{product.count}</span>

                      <button type="button" onClick={() => updateCart(product.product._id, product.count + 1)} className="flex size-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-green-50 hover:text-green-700">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove */}
                  <div className="flex justify-end md:col-span-2">
                    <button type="button" onClick={() => removeCartProduct(product.product._id)} className="rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-slate-800">Order Summary</h2>
            <p className="mt-1 text-sm text-slate-400">{productList.length} different products</p>
            <div className="my-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold text-slate-800">{totalPrice} EGP</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-semibold text-green-600">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Total</span>
                <span className="text-2xl font-bold text-green-700">{totalPrice} EGP</span>
              </div>
            </div>

            <Link href={`/checkout/${cartId}`} className={`mt-6 flex w-full items-center justify-center rounded-xl bg-green-700 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 hover:shadow-md ${!productList.length ? "pointer-events-none opacity-40" : ""}`}>Proceed to Checkout</Link>

            <p className="mt-4 text-center text-xs text-slate-400">Secure checkout experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}