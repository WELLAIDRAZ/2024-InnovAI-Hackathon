"use client"

import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import { ThemeProvider } from "../components/ui/theme-provider";
import "@/app/globals.css"
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { SidebarProvider } from "./contexts/SideBar";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  });


export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
            "flex flex-col justify-center items-center scroll-smooth h-screen overflow-hidden custom-scrollbar min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-[#ffffff] font-sans antialiased",
          fontSans.variable
        )}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <SidebarProvider>
            {children}
            </SidebarProvider>
        <NextTopLoader
        color="#067873"/>
        <Toaster  richColors/>
        </ThemeProvider>
      </body>
    </html>
  );
}
