"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  console.log(prevRepo)

  return (
    <div className="w-full items-center justify-items-center p-8 space-y-10">
      <div className="text-5xl font-bold text-cyan-500">Existing Data vaults</div>
      {Array.isArray(prevRepo) && prevRepo.map((repo, index) => (
        <div className="space-y-4" key={index}>
          <a href={`view/?repo=${repo}`}><div className="text-xl rounded-md bg-black text-cyan-500">
            {repo}
          </div></a>
        </div>
      ))}
    </div>
  )
}
