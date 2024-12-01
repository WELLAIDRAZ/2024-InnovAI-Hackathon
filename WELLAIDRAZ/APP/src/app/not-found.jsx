"use client";

import { TriangleAlert, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const NotFoundPage = () => {
  const router = useRouter();
  return (
    <section className="bg-primary-foreground w-screen flex-grow">
      <div className="container flex items-center min-h-screen px-8 py-16 mx-auto">
        <div className="flex flex-col items-center max-w-lg mx-auto text-center">
          <p className="p-4 text-base font-medium text-primary rounded-full bg-blue-50 dark:bg-gray-800">
            <TriangleAlert />
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-white md:text-4xl">
            Page not found
          </h1>
          <p className="mt-5 text-lg text-gray-500 dark:text-gray-400">
            The page you are looking for doesn&apos;t exist. Here are some
            helpful links:
          </p>

          <div className="flex items-center w-full mt-7 gap-x-4 shrink-0 sm:w-auto">
            <button
              onClick={() => {
                router.back();
              }}
              className="flex items-center justify-center font-bold w-1/2 px-6 py-3 text-base text-gray-700 transition-colors duration-200 bg-white border rounded gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
            >
              <MoveLeft />
              <span>Go back</span>
            </button>

            <button
              onClick={() => {
                router.push("/");
              }}
              className="w-1/2 px-6 py-3 text-base tracking-wide text-white transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-secondary-foreground hover:text-primary-foreground font-bold"
            >
              Take me home
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
