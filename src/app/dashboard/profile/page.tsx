"use client";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  addDoc,
  where,
  doc,
  deleteDoc,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { userType, userDataType } from "@/types/type";
import PopUp from "@/components/PopUp";

const Page = () => {
  const [profileAvailable, setProfileAvailable] = useState(false);
  const [userDatas, setUserDatas] = useState<userDataType[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [popupText, setPopupText] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthContext() as { user: userType | null };
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/login");
    } else {
      readData();
    }
  }, [user]);

//   const checkFields=()=>{return ;}
  const addData = async () => {
    try {
      if (user) {

      await addDoc(collection(db, "userDatas"), {
        email: user.email, // Replace this with the appropriate link if needed
        firstName: lastName,
        lastName: firstName,
        userId: user.uid,
      });
      readData(); // Refresh the list of links after adding a new one
    }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const readData = async () => {
    // setProfileAvailable(true);
    setIsLoading(true);

    try {
            if (user) {

      const q = query(collection(db, "userDatas"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const userData: userDataType[] = [];
      querySnapshot.forEach((doc) => {
          userData.push({ id: doc.id} as userDataType);
        });
        setUserDatas(userData);
      setProfileAvailable(userData.length > 0);
      console.log()
    }
    } catch (e) {
      console.log("error getting links", e);
      setProfileAvailable(false);
    } finally {
      setIsLoading(false);
    }

    //   console.log(doc.id, " => ", doc.data());
    // const querySnapshot = await getDocs(collection(db, "links"));
    // querySnapshot.forEach((doc) => {
    //   const { url, title, userId, platform } = doc.data();
    //   console.log({ url, title, userId, platform });
    // });
  };
  useEffect(() => {
    readData();
  }, []);
  return (
    <div className="w-full pt-0 p-6">
      <div className="lg:grid lg:grid-cols-3 gap-4">
        <div className="hidden lg:block rounded-xl bg-white">
          <img alt="photo" src="/phoneFrame.png" />
        </div>
        <div className="w-full col-span-2 rounded-xl bg-white gap-10 flex flex-col py-10">
          <div
            aria-label="top content"
            className="flex flex-col px-4 md:px-10 gap-2"
          >
            <h1 className="text-[#333333] text-4xl font-bold">
              Profile details
            </h1>
            <p className="text-base text-[#737373]">
            Add your details to create a personal touch to your profile.
            </p>
          </div>
          <div
            aria-label="bottom content"
            className="flex px-4 md:px-10 flex-col gap-6"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="loader">Loading...</div>
              </div>
            ) : profileAvailable ? (
              <>
              <div className="bg-[#fafafa] grid grid-cols-3 items-center text-[#737373] rounded-xl p-5 ">
              Profile picture
              <div className="w-[200px] h-[200px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <p className="text-sm">Image must be below 1024x1024px. Use PNG or JPG format.</p>
              </div>
              <div className="bg-[#fafafa] rounded-xl p-5 grid gap-4 text-[#737373]">
              <div className="grid grid-cols-3 items-center">First name*<input type="name" onChange={(e)=>setFirstName(e.target.value)} required placeholder="Ben" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              <div className="grid grid-cols-3 items-center">First name*<input type="name" onChange={(e)=>setLastName(e.target.value)} required placeholder="Wright" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              <div className="grid grid-cols-3 items-center">Email<input type="name" value={user?.email} disabled placeholder="alex@email.com" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              </div>
              </>
            ) : (
                <>
                <PopUp popupText=""/>
              <div className="bg-[#fafafa] grid grid-cols-3 items-center text-[#737373] rounded-xl p-5 ">
              Profile picture
              <div className="w-[200px] h-[200px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <p className="text-sm">Image must be below 1024x1024px. Use PNG or JPG format.</p>
              </div>
              <div className="bg-[#fafafa] rounded-xl p-5 grid gap-4 text-[#737373]">
              <div className="grid grid-cols-3 items-center">First name*<input type="name" onChange={(e)=>setFirstName(e.target.value)} required placeholder="Ben" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              <div className="grid grid-cols-3 items-center">First name*<input type="name" onChange={(e)=>setLastName(e.target.value)} required placeholder="Wright" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              <div className="grid grid-cols-3 items-center">Email<input type="name" value={user?.email} disabled placeholder="alex@email.com" className="col-span-2 customShadow h-12 px-4 rounded-lg border border-[#D9D9D9] outline-none"/></div>
              </div>
              </>
            )}
          </div>

          <div
            aria-label="footer"
            className="border-t  px-4 md:px-10 pt-8 flex "
          >
            <button onClick={addData} disabled={firstName===""||lastName===""}  className={`${firstName===""||lastName==="" ? 'bg-[#BEADFF]' : ''} ml-auto customShadow py-3 px-7 text-white bg-[#633CFF] rounded-lg hover:bg-[#BEADFF] border-none`} >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
