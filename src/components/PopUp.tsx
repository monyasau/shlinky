import React, { useState, useEffect } from "react";

type popupProps={
    popupText: string
}
const PopUp:React.FC<popupProps> = ({popupText}) => {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  useEffect(() => {
        setOpen(true)
        setText(popupText)
  }, [popupText]);
  useEffect(() => {
    setTimeout(()=>{
        setOpen(false)
        setText("")
   },3000 )
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed py-4 px-6 bg-black/90 rounded-xl w-full sm:w-fit left-0 sm:left-1/2  -translate-x-1/2 bottom-4 text-white">Your changes have been successfully saved!</div>
      )}
    </>
  );
};

export default PopUp;
