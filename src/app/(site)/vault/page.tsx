"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router  = useRouter();

  useEffect(() => {
    try{
      const token = sessionStorage.getItem("authToken");

      if( token === null ){
        router.push('/login')
      }

    } catch (err){
      router.push('/login')
      console.log(err)
    }
  })

  return (
    <div>
      <div>Valut</div>
    </div>
  )
}
