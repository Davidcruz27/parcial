"use client";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";
import { isTeacher } from "@/utils/teacher";
import Image from "next/image";

function Header() {
  const { userId } = useAuth();
  return (
    <header className="bg-[#FCF8F1] bg-opacity-30">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <Image
                className="w-auto h-8"
                src="/logo.png"
                alt="logo"
                width={300}
                height={300}
              />
            </a>
          </div>

          <div className="flex justify-center items-center gap-4">
            {isTeacher(userId) && (
              <button>
                <Link
                  href={"/registra/courses"}
                  title=""
                  className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
                  role="button"
                >
                  Registrar Nueva Casa
                </Link>
              </button>
            )}
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
