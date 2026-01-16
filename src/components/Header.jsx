"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PortfolioIntro from "./PortfolioIntro";
import PortfolioStats from "./PortfolioStats";
import { useAtom } from "jotai";
import { portfolioNameAtoms } from "@/jotai/PortfolioAtoms";

function Header() {
  const [portfolioChosen, setPortfolioChosen] = useAtom(portfolioNameAtoms);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://script.google.com/macros/s/AKfycbxVZzhrPzxZk7NlNY8l7TrswKtcmD26f4oO026IVWG8X9jCNho0ZKloFsB_pWakgmAtkg/exec"
  //       );
  //       const result = await response.json();

  //       if (result.status === "success") {
  //         console.log("Portfolio Data:", result.data);
  //         // e.g., result.data["Moomoo Portfolio"].marketValue
  //       }
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <>
      <div className="drawer drawer-open min-h-screen">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          {/* <nav className="navbar w-full bg-none relative flex items-center justify-center font-poppins font-light gap-x-8 p-6">
            <div
              className="text-xl hover:underline hover:cursor-pointer"
              onClick={() => setPortfolioChosen("Moomoo Portfolio")}
            >
              KwMo
            </div>
            <div
              className="text-xl hover:underline hover:cursor-pointer"
              onClick={() => setPortfolioChosen("IBKR Portfolio")}
            >
              KwIb
            </div>
            <div
              className="text-xl hover:underline hover:cursor-pointer"
              onClick={() => setPortfolioChosen("Jia En Portfolio")}
            >
              JeMo
            </div>
            <div
              className="text-xl hover:underline hover:cursor-pointer"
              onClick={() => setPortfolioChosen("Mum Portfolio")}
            >
              LeeIb
            </div>
          </nav> */}
          <div className="flex flex-col items-center justify-center gap-4">
            <PortfolioIntro />
            <PortfolioStats />
          </div>
        </div>

        <div className={`w-20 bg-base-300`}>
          <div className="flex flex-col min-h-screen justify-start items-center pt-5">
            <ul className="flex flex-col items-center gap-4">
              <li className="flex justify-center items-end mb-6">
                <button className="dropdown dropdown-right">
                  <Image
                    src="/user-icon.svg"
                    alt="sidebar icon"
                    width={50}
                    height={50}
                    tabIndex={0}
                    role="button"
                    className="m-1"
                  />
                  <ul
                    tabIndex="-1"
                    className="ml-4 dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm"
                  >
                    <li>
                      <a
                        onClick={() => {
                          document.activeElement.blur();
                          setPortfolioChosen("Kit Wei Moomoo Portfolio");
                        }}
                      >
                        KW Moomoo
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          document.activeElement.blur();
                          setPortfolioChosen("Kit Wei IBKR Portfolio");
                        }}
                      >
                        KW IB
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          document.activeElement.blur();
                          setPortfolioChosen("Jia En Portfolio");
                        }}
                      >
                        Jia En Moomoo
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          document.activeElement.blur();
                          setPortfolioChosen("Mum Portfolio");
                        }}
                      >
                        Mum IB
                      </a>
                    </li>
                  </ul>
                </button>
              </li>

              <li className="hover:bg-gray-300 flex items-center justify-center aspect-square rounded-full p-1">
                <button className="tooltip tooltip-right">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-orange-400 -rotate-10 text-md font-black">
                      Home Page
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                </button>
              </li>

              <li className="hover:bg-gray-300 flex items-center justify-center aspect-square rounded-full p-1">
                <button className="tooltip tooltip-right">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-orange-400 -rotate-10 text-md font-black">
                      Settings
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                </button>
              </li>

              <li className="hover:bg-gray-300 flex items-center justify-center aspect-square rounded-full p-1">
                <button className="tooltip tooltip-right">
                  <div className="tooltip-content">
                    <div className="animate-bounce text-orange-400 -rotate-10 text-md font-black">
                      Recent Positions
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
