import notFound from '@/assets/images/error.svg'
import Image from "next/image";

export default function NotFound() {
  return (
    <div className='flex h-screen justify-center items-center'>
        <Image className='w-[70%]' src={notFound} alt="notfound" />
    </div>
  )
}
