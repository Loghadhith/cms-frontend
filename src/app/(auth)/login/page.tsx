'use client';

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react"

interface FormData {
  email: string,
  password: string,
}

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
  }, [router]);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const handleChange = (r: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = r.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log(formData)

    try {
      const res = await fetch('http://localhost:5000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Login Error, Please check the login details')
      }

      const data = await res.json();
      console.log(data); // Should log the response with the token
      const token = data.token; // Get the token from the response

      // Optionally, store the token (e.g., in localStorage or context)
      // localStorage.setItem('authToken', token);
      // localStorage.setItem('email', formData.email);
      sessionStorage.setItem('authToken',token);
      sessionStorage.setItem('email',formData.email);

      router.push('/home')
    } catch (err: any) {
      console.log(err)
      alert('Login Failed')
    }
  }
  return (
    <div className="dark:bg-gradient-to-l from-gray-900 to-gray-700 flex justify-center items-center w-screen h-screen p-5">
      <div className="bg-white shadow-md dark:shadow-gray-600 rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full md:w-1/3 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              onChange={handleChange}
              className="shadow appearance-none border border-red-500 rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              id="password"
              type="password"
              placeholder="******************"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
