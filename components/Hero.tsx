import Image from "next/image"
import Link from "next/link"


function Hero() {
  return (
    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-4">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">compra tu casa ideal</p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Descubre tu hogar ideal hoy mismo</h1>
                
                <Link href="/compra" title="" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400" role="button">
                    Busca tu Casa
                    <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link>
            </div>

            <div>
                <Image className="w-full" src="/hero-img.png" alt="hero" width={500} height={500} />
            </div>
        </div>
    </div>
</section>
  )
}

export default Hero