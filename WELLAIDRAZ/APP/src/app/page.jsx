"use client"; // Used to set this component as a client component

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

// Importing css files
import "@/app/globals.css";
import logo from "@/app/appLogo.png";
// Importing React Typed package for auto typing
import { ReactTyped } from "react-typed";

// Importing Shadcn/ui components
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRightIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <main className="">
        <header className="fixed top-0 left-0 w-full px-[25px] border-b-4 border-[#143644] flex bg-[#e2e2e2] justify-between items-center z-100">
          <div className="flex justify-center items-center gap-3">
            <h2 className="text-[1.2em] font-bold cursor-pointer text-[#143644] hover:text-primary">
              SepsiGuard
            </h2>
          </div>

          <nav className="navbar flex space-x-8 items-center p-4">
            <Link
              href="{{route('utilisateur_login')}}"
              className="relative text-base font-bold text-primary group hover:text-black"
            >
              Home
              <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
            </Link>
            <Link
              href="/main"
              className="relative text-base font-bold text-black group hover:text-black"
            >
              Main
              <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
            </Link>
            <Link
              href="#aboutus"
              className="relative text-base font-bold text-black group hover:text-black"
            >
              About Us
              <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
            </Link>
            <Link
              href="#"
              className="relative text-base font-bold text-black group hover:text-black"
            >
              FAQ
              <span className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-black rounded opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"></span>
            </Link>
            <Button
              onClick={() => {
                router.push("/main");
              }}
              variant="default"
              className="rounded-lg gap-1 h-9 bg-[#143644] hover:bg-primary text-[#D8EFEF]"
            >
              <span className=" text-sm font-bold">Try Here</span>
              <ChevronRightIcon className="h-5 w-5 gap-2" />
            </Button>
          </nav>
        </header>
      </main>
      <div className="fixed flex-col justify-start items-center top-24 gap-4">
        <div className="text-4xl font-bold text-primary  ">
          <ReactTyped
            strings={["Revolutionizing Early Prediction of Sepsis with AI"]}
            typeSpeed={50}
            showCursor={true}
            startDelay={500}
            loop={true}
            shuffle={true}
          />
        </div>
      </div>
      <div className="flex-col justify-between items-center fixed left-20 top-44 gap-5">
        <div className="flex justify-start items-center gap-4 mb-4">
          <CheckCircle2 className="h-[40px] w-[40px] gap-3 text-black hover:text-primary cursor-pointer" />
          <h1 className="text-2xl text-black hover:text-primary cursor-pointer max-w-[700px]">
            <span className="font-bold">SepsiGUARD</span> is an innovative
            solution designed to predict the early onset of sepsis in patients.
          </h1>
        </div>
        <div className="flex justify-start items-center gap-4 mb-4">
          <CheckCircle2 className="h-[40px] w-[40px] gap-3 text-black hover:text-primary cursor-pointer" />
          <h1 className="text-2xl text-black hover:text-primary cursor-pointer">
            <span className="font-bold">Powered</span> by cutting-edge{" "}
            <span className="font-bold">AI algorithms.</span>
          </h1>
        </div>
        <div className="flex justify-start items-center gap-4 mb-4">
          <CheckCircle2 className="h-[40px] w-[40px] gap-3 text-black hover:text-primary cursor-pointer" />
          <h1 className="text-2xl text-black hover:text-primary cursor-pointer max-w-[700px]">
            <span className="font-bold">Analyze real-time</span> patient data,
            including{" "}
            <span className="font-bold">vital signs, laboratory </span> results,
            and medical history.
          </h1>
        </div>
        <div className="flex justify-start items-center gap-4 mb-4">
          <CheckCircle2 className="h-[40px] w-[40px] gap-3 text-black hover:text-primary cursor-pointer" />
          <h1 className="text-2xl text-black hover:text-primary cursor-pointer max-w-[700px]">
            <span className="font-bold">Provide</span> healthcare professionals
            with accurate <span className="font-bold"> sepsis </span> risk
            scores.
          </h1>
        </div>
        <Button
          onClick={() => {
            router.push("/main");
          }}
          variant="default"
          className="rounded-lg gap-1 h-12 w-36 mt-4 hover:bg-[#143644] text-[#D8EFEF]"
        >
          <span className="text-lg font-bold">Try Here</span>
          <ChevronRightIcon className="h-8 w-8 gap-2" />
        </Button>
      </div>
      <Image
        src={logo}
        alt="alt"
        width={500}
        height={500}
        className="absolute right-10 animate-float"
      />
    </>
  );
}
