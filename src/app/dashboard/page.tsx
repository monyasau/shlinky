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
  updateDoc
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { userType, linkType } from "@/types/type";
import Link from "@/components/Link";

const Page = () => {
  const [linksAvailable, setLinksAvailable] = useState(false);
  const [userLinks, setUserLinks] = useState<linkType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const addLinkButton: any = useRef();

  const { user } = useAuthContext() as { user: userType | null };
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (user == null) {
      router.push("/login");
    } else {
      readLinks();
    }
  }, [user]);

  const platforms = [
    "Github",
    "FrontendMentor",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "Facebook",
    "Twitch",
    "Dev",
    "Codewars",
    "Codepen",
    "freeCodeCamp",
    "GitLab",
    "Hashnode",
    "StackOverflow",
  ];

  const getRandomPlatform = () => {
    const randomIndex = Math.floor(Math.random() * platforms.length);
    return platforms[randomIndex];
  };

  const addLink = async () => {
    const randomPlatform = getRandomPlatform();
    try {
      if (user) {

      await addDoc(collection(db, "links"), {
        url: randomPlatform + ".com", // Replace this with the appropriate link if needed
        platform: randomPlatform,
        title: randomPlatform + " home",
        userId: user.uid,
      });
      readLinks(); // Refresh the list of links after adding a new one
    }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const readLinks = async () => {
    // setLinksAvailable(true);
    setIsLoading(true);

    try {
            if (user) {

      const q = query(collection(db, "links"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const linksData: linkType[] = [];
      querySnapshot.forEach((doc) => {
        linksData.push({ id: doc.id, ...doc.data() } as linkType);
      });
      setUserLinks(linksData);
      setLinksAvailable(linksData.length > 0);
      setLinksAvailable(linksData.length > 0);
    }
    } catch (e) {
      console.log("error getting links", e);
      setLinksAvailable(false);
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
  const removeLink = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, "links", id));
      const updatedLinks = userLinks.filter((link) => link.id !== id); // Update state
      setUserLinks(updatedLinks);
      setLinksAvailable(updatedLinks.length > 0);
    } catch (e) {
      console.error("Error removing document: ", e);
    } finally {
      setIsLoading(false);
    }
  };
  const editLink = async (id: string, updatedLink: linkType) => {
   
  }
  useEffect(() => {
    readLinks();
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
            ) : linksAvailable ? (
              <>
                {userLinks.map((link) => (
                  <Link removeLink={removeLink} link={link} userLinks={userLinks}/>
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

          <div
            aria-label="footer"
            className="border-t  px-4 md:px-10 pt-8 flex "
          >
            <button disabled={userLinks.length===0}   className={`${userLinks.length === 0 ? 'bg-[#BEADFF]' : ''} ml-auto customShadow py-3 px-7 text-white bg-[#633CFF] rounded-lg hover:bg-[#BEADFF] border-none`}            >
              Saves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
