"use client"
import Image from "next/image";
import logo from '@/assets/images/freshcart-logo.svg'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext } from "react";
import { cartContext } from "@/context/cartNumber.context";
import { IoMdCart } from "react-icons/io";
import { FaHeart, FaHome, FaShoppingBag, FaTags, FaThLarge, FaClipboardList, FaKey, FaCreditCard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { FaShieldHalved, FaTruckFast } from "react-icons/fa6";

export default function Navbar() {

  const { data: session } = useSession()

  const { cartNumber } = useContext(cartContext)

  const pathname = usePathname();
  const linkStyle = (path: string) =>
    `rounded-lg px-3.5 py-2 text-sm transition-all duration-200 ${pathname === path || (path !== "/" && pathname.startsWith(path + "/"))
      ? "bg-green-50 font-semibold text-green-700"
      : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"
    }`;

  const navToggle = useRef<HTMLInputElement>(null);

  function LogOut() {
    signOut({
      callbackUrl: '/Login'
    })
  }
  return (
    <>
      <header className="w-full bg-white sticky top-0 z-10">

        <div className="hidden items-center justify-center gap-6 border-b border-green-100 bg-green-50 py-2 sm:flex">
          <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <FaTruckFast className="text-green-600" size={15} />
            Fast & Reliable Delivery
          </p>
          <span className="h-4 w-px bg-green-200" />
          <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <FaShieldHalved className="text-green-600" size={14} />
            Secure Shopping
          </p>
          <span className="h-4 w-px bg-green-200" />
          <p className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <FaCreditCard className="text-green-600" size={15} />
            Cash & Online Payment
          </p>
        </div>

        <nav className="border-b border-slate-200" aria-label="Main navigation">
          <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="#" className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-lg">
              <Image src={logo} alt="logo" className="w-full" width={400} height={200} />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              <li>
                <Link href="/" className={linkStyle("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Products" className={linkStyle("/Products")}>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/Category" className={linkStyle("/Category")}>
                  Category
                </Link>
              </li>
              <li>
                <Link href="/Brands" className={linkStyle("/Brands")}>
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className={linkStyle("/wishlist")}>
                  Wishlist
                </Link>
              </li>
              {session && (
                <>
                  <li>
                    <Link href="/allorders" className={linkStyle("/allorders")}>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link href="/change-password" className={linkStyle("/change-password")}>
                      Change Password
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart" className={`relative flex size-10 items-center justify-center rounded-full transition-all duration-200 ${pathname.startsWith("/cart") ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
                      <IoMdCart size={22} />
                      {cartNumber > 0 && (
                        <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
                          {cartNumber > 99 ? "99+" : cartNumber}
                        </span>
                      )}
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="flex items-center gap-3">
              {session && (
                <>
                  <a onClick={LogOut} className="hidden items-center justify-center rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-red-700/20 transition-all duration-200 hover:bg-red-800 hover:shadow-md hover:shadow-red-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 sm:inline-flex">
                    LogOut
                  </a>
                </>
              )}
              {!session && (
                <>
                  <Link href="/Login" className="hidden rounded-lg px-3.5 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 sm:inline-flex">
                    LogIn
                  </Link>
                  <Link href="/Register" className="hidden items-center justify-center rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:shadow-md hover:shadow-green-700/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 sm:inline-flex">
                    SignUp
                  </Link>
                </>
              )}
              <input ref={navToggle} type="checkbox" id="fin-nav-toggle" className="peer hidden" />
              <label htmlFor="fin-nav-toggle" className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-50 focus-within:ring-2 focus-within:ring-green-600 lg:hidden" aria-label="Toggle menu">
                <svg className="h-5 w-5 peer-checked:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <label htmlFor="fin-nav-toggle" className="fixed inset-0 z-40 hidden bg-slate-900/40 backdrop-blur-sm peer-checked:block lg:hidden" />
              <div className="pointer-events-none fixed inset-y-0 right-0 z-50 w-full max-w-xs translate-x-full transform border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out peer-checked:pointer-events-auto peer-checked:translate-x-0 lg:hidden">
                <div className="flex h-18 items-center justify-between border-b border-slate-200 px-5">
                  <Image src={logo} className="w-full" alt="logo" />
                </div>

                <nav className="flex flex-col gap-1.5 p-4" aria-label="Mobile navigation">
                  <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname === "/" ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                    <FaHome size={19} />Home
                    {pathname === "/" && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                  </Link>

                  <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/Products" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/Products") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                    <FaShoppingBag size={18} />Products
                    {pathname.startsWith("/Products") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                  </Link>

                  <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/Category" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/Category") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                    <FaThLarge size={18} />Category
                    {pathname.startsWith("/Category") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                  </Link>

                  <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/Brands" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/Brands") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                    <FaTags size={18} />Brands
                    {pathname.startsWith("/Brands") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                  </Link>

                  <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/wishlist" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/wishlist") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                    <FaHeart size={18} />Wishlist
                    {pathname.startsWith("/wishlist") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                  </Link>

                  {session && (
                    <>
                      <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/allorders" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/allorders") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                        <FaClipboardList size={18} />My Orders
                        {pathname.startsWith("/allorders") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                      </Link>

                      <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/change-password" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/change-password") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                        <FaKey size={18} />Change Password
                        {pathname.startsWith("/change-password") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                      </Link>

                      <Link onClick={() => navToggle.current && (navToggle.current.checked = false)} href="/cart" className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm transition-all ${pathname.startsWith("/cart") ? "bg-green-50 font-semibold text-green-700" : "font-medium text-slate-600 hover:bg-green-50 hover:text-green-700"}`}>
                        <IoMdCart size={20} />Cart
                        {cartNumber > 0 && (
                          <span className="ms-auto flex h-6 min-w-6 items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-bold text-white">
                            {cartNumber > 99 ? "99+" : cartNumber}
                          </span>
                        )}
                        {cartNumber === 0 && pathname.startsWith("/cart") && <span className="ms-auto size-2 rounded-full bg-green-600" />}
                      </Link>
                    </>
                  )}
                </nav>
                <div className="mt-auto space-y-3 border-t border-slate-200 p-4">
                  <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3">
                    <svg className="h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.556-3.04 8.13-7.21 9.51-.32.1-.66.1-.98 0C8.64 20.13 5.6 16.556 5.6 12V6.317a1 1 0 01.629-.928l5.4-2.16a1 1 0 01.742 0l5.4 2.16a1 1 0 01.629.928V12z" />
                    </svg>
                    <p className="text-xs font-medium text-slate-600">FDIC insured · 256-bit encryption</p>
                  </div>
                  {session && (
                    <>
                      <a onClick={LogOut} className="flex items-center justify-center rounded-xl bg-red-700 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-red-700/20 transition-all duration-200 hover:bg-red-800 active:scale-[0.98]">
                        LogOut
                      </a>
                    </>
                  )}
                  {!session && (
                    <>
                      <Link href="/Login" className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50">
                        Log In
                      </Link>
                      <Link href="/Register" className="flex items-center justify-center rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-green-700/20 transition-all duration-200 hover:bg-green-800 active:scale-[0.98]">
                        SignUp
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}