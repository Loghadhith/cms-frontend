"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FormData {
  email: string;
  repo: string;
  file: string;
  ftype: string,
  data: string,
}


export default function Page() {
  const router = useRouter();

  const [prevRepo, setRepos] = useState<string[]>([])



  useEffect(() => {
    const fetchData = async () => {
      const email = sessionStorage.getItem("email");

      if (email) {
        const d = { email };
        try {
          const resp = await fetch("http://localhost:5000/api/v1/fetchdata", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(d),
          });

          if (resp.ok) {
            const data = await resp.json();
            setRepos(data);
            console.log("Received data:", data);
          } else {
            console.log('Failed to fetch data:', resp.status);
          }
        } catch (err) {
          console.log('Error during fetch:', err);
        }
      } else {
        console.log("No email found in sessionStorage");
      }
    };

    const token = sessionStorage.getItem('authToken');

    if (token === null) {
      router.push('/login');
    } else {
      fetchData();
    }

  }, []);


  const [formData, setData] = useState<FormData>({
    email: '',
    repo: '',
    file: '',
    ftype: 'text',
    data: '',
  })

  const clearData = () => {
    setData(() => ({
      email: '',
      repo: '',
      file: '',
      ftype: '',
      data: '',
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]

    if (f) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setData((prevData) => ({
          ...prevData,
          data: reader.result as string,
        }))
      }
      reader.readAsDataURL(f)
    }
    console.log("image")
  }

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;

    textarea.style.height = 'auto';

    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLTextAreaElement | HTMLInputElement
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    var mail = sessionStorage.getItem("email")
    console.log('Done')
    setData((prevData) => ({
      ...prevData,
      email: mail as string,
    }))

    console.log(formData)
    try {
      const d = await fetch("http://localhost:5000/api/v1/postdata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!d.ok) {
        console.log("Error at the add post")
      }

      // Further process after post addition needs to be done

    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div className="self-center">
      <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-200">Add Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
            Repo Name
          </label>

          <input
            type="text"
            name="repo"
            id="repo"
            list="repo-list" // Link input to datalist
            onChange={handleChange}
            value={formData.repo}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="Select or type your own repo name"
            required
          />

          {/* Datalist for showing the repo options */}
          <datalist id="repo-list">

            {Array.isArray(prevRepo) && prevRepo.map((repo, index) => (
              <option key={index} value={repo} />
            ))}

          </datalist>
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
            File Name
          </label>
          <input
            type="text"
            name="file"
            id="file"
            onChange={handleChange}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            placeholder="File Name for the data"
            required
          />
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
            File Type
          </label>
          <input
            type="radio"
            id="text"
            name="ftype"
            value="text"
            checked={formData.ftype === "text"}
            onChange={handleChange}
          />
          <label>Text</label><br />
          <input
            type="radio"
            id="image"
            name="ftype"
            value="image"
            checked={formData.ftype === "image"}
            onChange={handleChange}
          />
          <label>Image</label>
          {formData.ftype === "text" &&
            <>
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Text Data
              </label>
              <textarea
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                onInput={handleInput}
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 resize-none transition-all duration-200 ease-in-out"
                placeholder="The text data or content"
              />
            </>
          }
          {formData.ftype === "image" &&
            <>
              <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                id="pic"
                name="photo"
                onChange={handleImageUpload}
                className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                placeholder="The text data or content"
              />
            </>
          }
        </div>

        <div>
          <p><strong>File Name:</strong> {formData.file}</p>
          <p><strong>File Type:</strong> {formData.ftype}</p>
          {formData.ftype === "image" && (
            <div>
              <h3 className="font-bold">Image Preview:</h3>
              <img src={formData.data} alt="Uploaded" width={200} />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-red-500 hover:bg-red-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-red-600" onClick={clearData}>
            Clear
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-green-600" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}


/*
 * <input
        type="text"
        name="repo"
        id="repo"
        list="repo-list" // Link input to datalist
        onChange={handleChange}
        value={formData.repo}
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        placeholder="Select or type your own repo name"
        required
      />

      {/* Datalist for showing the repo options }
      <datalist id="repo-list">
        {repoOptions.map((repo, index) => (
          <option key={index} value={repo} />
        ))}
      </datalist>
      */
