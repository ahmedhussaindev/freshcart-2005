"use client"
import { useEffect, useState } from "react"
import { getUserOrders } from "@/services/orders/getUserOrders"
import { toast } from "@/components/ui/toast"
import { IOrder } from "@/interfaces/orders.interface"
import Image from "next/image"

export default function AllOrders() {

  const [orders, setOrders] = useState<IOrder[]>([])

  async function getOrdersData() {
    try {
      const response = await getUserOrders()
      setOrders(response)
    } catch (err) {
      toast.add({
        title: "Error",
        description: "There is an error loading orders"
      })
    }
  }

  useEffect(() => {
    getOrdersData()
  }, [])

  if (orders.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">You have no orders yet</h2>
      </div>
    )
  }

  return (
    <div className="mx-auto my-10 w-[95%] lg:w-[90%]">
      <h1 className="mb-2 text-3xl font-bold text-gray-800">My Orders</h1>
      <p className="mb-8 text-gray-500">{orders.length} Orders</p>
      <div className="space-y-5">
        {[...orders].sort((a, b) => new Date(b.createdAt).getTime() -new Date(a.createdAt).getTime()).map((order: IOrder) => (
            <div key={order._id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <h2 className="font-semibold text-gray-800">#{order.id}</h2>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Order Date</p>
                  <p className="font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Payment Method</p>
                  <p className="font-medium capitalize text-gray-700">{order.paymentMethodType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-lg font-bold text-green-700">{order.totalOrderPrice} EGP</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.isDelivered ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {order.isDelivered ? "Delivered" : "Processing"}
                </span>
              </div>

              {/* Shipping Address */}
              <div className="mt-4 text-sm text-gray-500">
                <p>
                  Shipping Address: {order.shippingAddress.details},{" "}
                  {order.shippingAddress.city}
                </p>
              </div>

              {/* Purchased Products */}
              <div className="mt-5 border-t border-gray-100 pt-5">
                <h3 className="mb-4 font-semibold text-gray-800">
                  Purchased Products ({order.cartItems.length})
                </h3>

                <div className="space-y-4">
                  {order.cartItems.map((item) => (
                    <div key={item._id} className="flex items-center gap-4 rounded-xl bg-gray-50 p-3">
                      <Image src={item.product.imageCover} alt={item.product.title} width={80} height={80} className="h-20 w-20 rounded-lg object-cover"/>

                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-2 font-medium text-gray-800">{item.product.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">Quantity: {item.count}</p>
                        <p className="mt-1 font-semibold text-green-700">{item.price} EGP</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">Subtotal</p>
                        <p className="font-bold text-gray-800">{item.price * item.count} EGP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
