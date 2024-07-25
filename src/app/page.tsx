"use client"
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { userType } from "@/types/type";
import { useEffect,  } from "react";

export default function Home() {
  
  const { user } = useAuthContext() as { user: userType | null };
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (user == null) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [user]);

  return (
   <>
   Checking if you're logged in.
   </>
  );
}
