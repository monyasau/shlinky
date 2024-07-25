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
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { userType, linkType } from "@/types/type";
import Link from "@/components/Link";

const Page = () => {
  const [userLinks, setUserLinks] = useState<linkType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const addLinkButton: any = useRef();

  const { user } = useAuthContext() as { user: userType | null };
  const router = useRouter();

  const addLink = async () => {
    const dummyLink: linkType = {
      url: "",
      platform: "",
      userId: user?.uid + "",
      id: crypto.randomUUID(),
    };
    setUserLinks([...userLinks, { ...dummyLink }]);
  };

  const readLinks = async () => {
    setIsLoading(true);

    try {
      if (user) {
        const q = query(
          collection(db, "links"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const linksData: linkType[] = [];
        querySnapshot.forEach((doc) => {
          linksData.push({ id: doc.id, ...doc.data() } as linkType);
        });

        setUserLinks(linksData);
      }
    } catch (e) {
      console.log("error getting links", e);
    } finally {
      setIsLoading(false);
    }
  };
  const removeLink = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, "links", id));
      const updatedLinks = userLinks.filter((link) => link.id !== id); // Update state
      setUserLinks(updatedLinks);
    } catch (e) {
      console.error("Error removing document: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    readLinks();
  }, []);

  useEffect(() => {
    if (user == null) {
      router.push("/login");
    } else {
      readLinks();
    }
  }, [user]);

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
              Customize your links
            </h1>
            <p className="text-base text-[#737373]">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <div
            aria-label="bottom content"
            className="flex px-4 md:px-10 flex-col gap-6"
          >
            <button
              ref={addLinkButton}
              disabled={isLoading}
              onClick={addLink}
              className="py-3 px-7 w-full border border-[#633CFF] rounded-lg"
            >
              + Add new link
            </button>
            {isLoading ? (
              <div className="flex justify-center">
                <div className="loader">Loading...</div>
              </div>
            ) : userLinks.length ? (
              <>
                {userLinks.map((link, i) => (
                  <Link key={i} index={i} link={link} removeLink={removeLink} />
                ))}
              </>
            ) : (
              <div className="bg-[#fafafa] rounded-xl p-5 ">
                <div className="flex  items-center flex-col gap-10">
                  <img className="w-fit" src="/userHand.png" alt="" />
                  <div className=" px-4 md:px-10 text-center">
                    <h1 className="text-[#333333] mb-6 text-4xl font-bold">
                      Let’s get you started
                    </h1>
                    <p className="text-base text-[#737373]">
                      Use the “Add new link” button to get started. Once you
                      have more than one link, you can reorder and edit them.
                      We’re here to help you share your profiles with everyone!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 
          <div
            aria-label="footer"
            className="border-t  px-4 md:px-10 pt-8 flex "
          >
            <button disabled={userLinks.length===0}   className={`${userLinks.length === 0 ? 'bg-[#BEADFF]' : ''} ml-auto customShadow py-3 px-7 text-white bg-[#633CFF] rounded-lg hover:bg-[#BEADFF] border-none`}            >
              Saves
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
