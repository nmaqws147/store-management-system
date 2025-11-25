"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import Logo from './33d808a7-db78-48db-8116-d0d5cf4b6ac4.png';
import { useState, useEffect } from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsopen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {theme, setTheme} = useTheme();

  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.href = "/dashboard";
    }

    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className="sticky top-0 h-14 p-3 pl-3 sm:pl-5 flex flex-row gap-3 transition-all duration-400 z-30 bg-white"
        style={{ marginLeft: isOpen ? "0px" : isMobile ? "0px" : "0px" }}
      >
        {/* Mobile menu button */}
        {isMobile && (
          <div
            className="flex items-center cursor-pointer justify-between"
            onClick={() => setIsopen(!isOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center"
            >
              <rect y="4" width="24" height="2" fill="currentColor" />
              <rect y="11" width="24" height="2" fill="currentColor" />
              <rect y="18" width="24" height="2" fill="currentColor" />
            </svg>
          </div>
        )}

        <Image
          src={Logo}
          alt="Store Icon"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full shadow-lg object-cover"
        />
        {/* Desktop menu button */}
        {!isMobile && (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsopen(!isOpen)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center"
            >
              <rect y="4" width="24" height="2" fill="currentColor" />
              <rect y="11" width="24" height="2" fill="currentColor" />
              <rect y="18" width="24" height="2" fill="currentColor" />
            </svg>
          </div>
        )}
      </nav>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsopen(false)}
        />
      )}

      {/* Main container */}
      <div className="flex">
        {/* Sidebar - Fixed/Sticky */}
        <div
          className={`sticky top-0 h-screen bg-white shadow-lg transition-all duration-400 overflow-hidden z-40
            ${isMobile ? 'fixed' : 'sticky'}
            ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
          `}
          style={{ 
            width: isMobile ? "210px" : (isOpen ? "0px" : "200px"),
            left: isMobile ? "0" : "auto"
          }}
        >
          <div className="flex flex-row gap-1 items-center justify-center overflow-hidden pt-6">
            <span className="font-semibold text-sm sm:text-base">StoreFlow</span>
            <Image src={Logo} alt="Store Icon" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full" />
          </div>

          <div className="items flex flex-col relative top-6 sm:top-25 left-6 sm:left-10 gap-6 sm:gap-10 mt-6 sm:mt-8">
            <Link href="/dashboard" onClick={() => isMobile && setIsopen(false)}>
              <span className="item1 text-sm transition-all duration-200 hover:text-white hover:bg-[#428EFF] inline-flex items-center gap-3 hover:p-2 w-40 hover:rounded-md cursor-pointer opacity-80 group">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10" />
                </svg>
                DASHBOARD
              </span>
            </Link>

            <Link href="/products" onClick={() => isMobile && setIsopen(false)}>
              <span className="item2 text-sm transition-all duration-200 hover:text-white hover:bg-[#428EFF] inline-flex items-center gap-3 hover:p-1.5 w-40 hover:rounded-md cursor-pointer opacity-80 group">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                PRODUCT
              </span>
            </Link>

            <Link href="/customers" onClick={() => isMobile && setIsopen(false)}>
              <span className="item4 text-sm transition-all duration-200 hover:text-white hover:bg-[#428EFF] inline-flex items-center gap-3 hover:p-1.5 w-40 hover:rounded-md cursor-pointer opacity-80 group">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                CUSTOMERS
              </span>
            </Link>

            <Link href="/employees" onClick={() => isMobile && setIsopen(false)}>
              <span className="item5 text-sm transition-all duration-200 hover:bg-[#428EFF] hover:text-white inline-flex items-center gap-3 hover:p-1.5 w-40 hover:rounded-md cursor-pointer opacity-80 group">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                EMPLOYEES
              </span>
            </Link>
          </div>
        </div>

        {/* Main content */}
        <main 
          className="flex-1 p-4 sm:p-6 min-h-screen transition-all duration-400"
          style={{ 
            marginLeft: isMobile ? "-40px" : (isOpen ? "0px" : "100px")
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;