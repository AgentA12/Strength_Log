import React from "react";

export function Signup() {
  return (
    <div className="">
      <div class="mb-6">
        <label
          for="username-success"
          class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
        >
          Your Username
        </label>
        <input
          type="text"
          id="username-success"
          class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
          placeholder="Bonnie Green"
        />
        <p class="mt-2 text-sm text-green-600 dark:text-green-500">
          <span class="font-medium">Alright!</span> Username available!
        </p>
      </div>
      <div>
        <label
          for="username-error"
          class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
        >
          Your Username
        </label>
        <input
          type="text"
          id="username-error"
          class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
          placeholder="Bonnie Green"
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
          <span class="font-medium">Oops!</span> Username already taken!
        </p>
      </div>

      <label
        for="email-address-icon"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Your Email
      </label>
      <div class="relative">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </div>
        <input
          type="text"
          id="email-address-icon"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@email.com"
        />
      </div>
    </div>
  );
}
