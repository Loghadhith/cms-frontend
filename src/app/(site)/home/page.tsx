"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [data, setData] = useState<string>('')

  const func = async () => {
    const url = `https://raw.githubusercontent.com/Sample-hub-hue/hel/refs/heads/main/sathya?v=${new Date().getTime()}`
    // const url = `https://raw.githubusercontent.com/Sample-hub-hue/reponame/refs/heads/main/exam?v=${new Date().getTime()}`;
    fetch(url)
      .then(response => response.text())
      .then(data => setData(data));
    console.log(data)

  }

  useEffect(() => {
    try {
      const token = sessionStorage.getItem("authToken");

      func();
      if (token === null) {
        router.push('/login')
      }

    } catch (err) {
      router.push('/login')
      console.log(err)
    }
  })

  return (
    <div>
      <div className="bg-indigo-500">Home page</div>
      <div dangerouslySetInnerHTML={{ __html: data }} />
      <div>{data}</div>
    </div>
  )
}

