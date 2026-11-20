import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaTruckFast, FaHeadset, FaShieldHalved, FaCreditCard } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-white">
      <div className="mx-auto w-[92%] max-w-7xl py-12">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="text-3xl font-bold tracking-tight">
              <span className="text-green-500">Fresh</span>Cart
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Your everyday shopping destination. Discover fresh products and enjoy a simple and convenient shopping experience.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                <span key={index} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-green-600 hover:text-white">
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/" className="transition hover:text-green-500">Home</Link></li>
              <li><Link href="/Products" className="transition hover:text-green-500">Products</Link></li>
              <li><Link href="/Category" className="transition hover:text-green-500">Categories</Link></li>
              <li><Link href="/Brands" className="transition hover:text-green-500">Brands</Link></li>
            </ul>
          </div>

          {/* Customer Account */}
          <div>
            <h3 className="mb-5 text-lg font-bold">My Account</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/wishlist" className="transition hover:text-green-500">My Wishlist</Link></li>
              <li><Link href="/allorders" className="transition hover:text-green-500">My Orders</Link></li>
              <li><Link href="/change-password" className="transition hover:text-green-500">Change Password</Link></li>
              <li><Link href="/cart" className="transition hover:text-green-500">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Why FreshCart */}
          <div>
            <h3 className="mb-5 text-lg font-bold">Why FreshCart?</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <FaTruckFast className="text-xl text-green-500" />
                <span>Fast Delivery</span>
              </li>
              <li className="flex items-center gap-3">
                <FaShieldHalved className="text-xl text-green-500" />
                <span>Secure Shopping</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCreditCard className="text-xl text-green-500" />
                <span>Flexible Payments</span>
              </li>
              <li className="flex items-center gap-3">
                <FaHeadset className="text-xl text-green-500" />
                <span>Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-800 pt-8 md:flex-row">
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-300">We Accept</p>
            <div className="flex flex-wrap gap-2">
              {["VISA", "Mastercard", "PayPal", "Cash"].map((method) => (
                <span key={method} className="rounded-md bg-white px-3 py-2 text-xs font-bold text-slate-800">
                  {method}
                </span>
              ))}
            </div>
          </div>
          <p className="text-center text-xs text-slate-500">
            © 2026 FreshCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
