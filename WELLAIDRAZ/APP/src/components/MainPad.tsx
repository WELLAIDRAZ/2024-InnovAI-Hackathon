import Image from 'next/image';
import React from 'react'
import { ReactTyped } from "react-typed";
import Logo from "@/app/appLogo.png";
import "@/app/globals.css";
const MainPad = () => {
    return (
        <div className="hidden bg-white lg:flex lg:flex-col lg:items-center lg:justify-center bg-[length:200%_200%] animate-gradient-move">
            {/* <div className="fixed left-[10px] top-[10px] gap-1 flex items-center">
                <Image
                    src={Logo}
                    alt="unv"
                    width={35}
                    height={35}
                    className="w-auto h-auto object-cover pl-4"
                />
                <h1 className="text-4xl font-bold poppins">waze</h1>
            </div> */}
            <Image
                src={Logo}
                alt="Image"
                width={360}
                height={360}
                className="h-auto w-auto object-cover animate-float"
            />
            <div className="mt-2 text-start font-bold text-secondary-foreground text-4xl ">
                <ReactTyped
                    strings={["Welcome to"]}
                    typeSpeed={80}
                    showCursor={false}
                    startDelay={500} // Optional delay before typing starts
                    loop={false}
                    shuffle={true}
                />
            </div>
            <div className="mt-2 text-start font-bold">
                <div className="flex justify-center items-center gap-2">
                    <div className="mt-0 text-start font-bold text-primary text-4xl">
                        <ReactTyped
                            strings={["SepsiGuard ..."]}
                            typeSpeed={80}
                            startDelay={2000} // Optional delay before typing starts
                            loop={false}
                            shuffle={true}
                            showCursor={true}
                        />
                    </div>
                </div>
                <div className="mt-2 text-center text-secondary-foreground text-3xl">
                    {" "}
                    <ReactTyped
                        strings={["Empowering Early Intervention for Sepsis."]}
                        typeSpeed={50}
                        startDelay={5000} // Delay the second message to match the duration of the first message
                        showCursor={false} // Optional cursor visibility
                        loop={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default MainPad
