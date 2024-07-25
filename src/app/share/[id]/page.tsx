"use client";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  where,
  doc,
  deleteDoc,
  query,
  collection,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { linkType } from "@/types/type";
import { toast } from "react-toastify";
type paramsProp = {
  params: {
    id: string;
  };
};

const Page: React.FC<paramsProp> = ({ params }) => {
  const [link, setLink] = useState<linkType | any>(null);
  const id = params.id;
 

  const fetchLink = async () => {
    try {
      const q = query(collection(db, "links"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      const linksData: linkType[] = [];
      querySnapshot.forEach((doc) => {
        setLink(doc.data());
      });
    } catch (e) {
      toast.error("No such document!");
    }
  }; 

  useEffect(() => {
    if (id) {
      fetchLink();
    }
  }, [id]);

  if (!link) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  const lowerCaseUrl = link.url.toLowerCase();
  return (
    <div className="w-full min-h-screen absolute top-0 ">
      <div className="bg-[#633CFF] absolute top-0 rounded-b-[32px] w-full h-[35vh]"></div>
      <div className="py-12 px-14 absolute shareShadow bg-white rounded-[24px] w-[570px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center flex-col items-center bg-[#fafafa] py-4 rounded-xl gap-4">
          <iframe
            className="rounded"
            src={"https://" + lowerCaseUrl}
            width="300"
            height="200"
            onError={(e) => {
              console.error("Failed to load iframe:", e);
            }}
            title={link.title}
          ></iframe>
          <h1 className="text-2xl font-bold ">{link.title}</h1>
          <p className="text-lg ">Platform: {link.platform}</p>
          <p className="text-lg">
            URL:{" "}
            <a
              href={`https://${lowerCaseUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" lowercase"
            >
              https://{link.url}
            </a>
          </p>
          <a
            href={`https://${lowerCaseUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[90%] text-white"
          >
            <button className="bg-[#633CFF] w-full hover:bg-[#BEADFF] py-2 rounded-lg px-7 ">
              Proceed
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
