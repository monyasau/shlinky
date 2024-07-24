"use client";
import React, {useState, useEffect } from "react";
import signIn from "../../firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();
    if(email === "" || password === ""){
      password ===""&&setError({...error, password:true})
      email ===""&&setError({...error, email:true})
    }
    if(error.email === false && error.password === false){
      const { result, error } = await signIn(email, password);
      if (error) {
        return console.log(error);
      }
      // else successful
      console.log(result);
      return router.push("/dashboard");
    }
    else{
      validateEmail();
      validatePassword();
    }
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length>0){

      if(emailRegex.test(email)){
      setError({...error, email: false})
    }else{
      setError({...error, email: true})
    }
    }
  };
  // const validatePassword = () => {
  //   if (password.length > 7) {
  //     setError({...error, password: false})
      
  //   } else {
  //     setError({...error, password: true})

  //   }
  // };
  const validatePassword = () => {
    setError((prev) => ({ ...prev, password: password.length > 0 && password.length < 8 }));
  };
  
  useEffect(() => {
    validateEmail()
  },[email])
  useEffect(() => {
    validatePassword()
  },[password])
    
  return (
    <div className="w-full">
      <div className="mx-auto  flex-col flex items-center h-screen justify-center">
      <div className="max-w-[490px] w-[95%] lg:w-[100%] mx-auto rounded-xl p-6 md:px-0 md:py-6 ">

<img className=" mr-auto" src="/logoWithText.svg" alt="logo" />
</div>
        <div className="max-w-[490px] w-[95%] lg:w-[100%] mx-auto rounded-xl p-6 md:p-10 bg-white">
          <div aria-label="form wrapper" className=" flex gap-y-10 flex-wrap">
            <div className="flex flex-wrap gap-y-2 w-full">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-base text-[#737373]">
              Add your details below to get back into the app
              </p>
            </div>
            <form
            method="post"
              onSubmit={handleForm}
              className="flex w-full flex-col gap-y-6"
            >
              <label htmlFor="email">
                <p className="text-sm text-[#333333] mb-1">Email</p>
                <div
                  className={
                    !error.email
                      ? "flex customShadow  rounded-lg  px-4 border justify-between items-center"
                      : "border-red-600 border  px-4 justify-between items-center rounded-lg flex"
                  }
                >
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 0H1C0.867392 0 0.740215 0.0526785 0.646447 0.146447C0.552678 0.240215 0.5 0.367392 0.5 0.5V9C0.5 9.26522 0.605357 9.51957 0.792893 9.70711C0.98043 9.89464 1.23478 10 1.5 10H12.5C12.7652 10 13.0196 9.89464 13.2071 9.70711C13.3946 9.51957 13.5 9.26522 13.5 9V0.5C13.5 0.367392 13.4473 0.240215 13.3536 0.146447C13.2598 0.0526785 13.1326 0 13 0ZM12.5 9H1.5V1.63688L6.66187 6.36875C6.75412 6.45343 6.87478 6.50041 7 6.50041C7.12522 6.50041 7.24588 6.45343 7.33813 6.36875L12.5 1.63688V9Z"
                      fill="#737373"
                    />
                  </svg>

                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="e.g. alex@email.com"
                    className={error.email?" py-3 outline-none":"w-[90%]  py-3 outline-none"}
                  />
                  {error.email && <p className="text-red-600 text-sm">Can’t be empty</p>}
                </div>
              </label>
              <label htmlFor="password">
                <p className="text-sm text-[#333333] mb-1">Password</p>
                <div
                  className={
                    !error.password
                      ? "flex customShadow  rounded-lg  px-4 border justify-between items-center"
                      : "border-red-600 border  px-4 justify-between items-center rounded-lg flex"
                  }
                >
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 5H9V3.5C9 2.70435 8.68393 1.94129 8.12132 1.37868C7.55871 0.81607 6.79565 0.5 6 0.5C5.20435 0.5 4.44129 0.81607 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6.5 9.91438V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12C5.86739 12 5.74021 11.9473 5.64645 11.8536C5.55268 11.7598 5.5 11.6326 5.5 11.5V9.91438C5.16639 9.79643 4.88522 9.56434 4.70618 9.25914C4.52715 8.95393 4.46177 8.59526 4.5216 8.24651C4.58144 7.89776 4.76264 7.58139 5.03317 7.35332C5.3037 7.12525 5.64616 7.00016 6 7.00016C6.35384 7.00016 6.6963 7.12525 6.96683 7.35332C7.23736 7.58139 7.41856 7.89776 7.4784 8.24651C7.53823 8.59526 7.47285 8.95393 7.29382 9.25914C7.11478 9.56434 6.83361 9.79643 6.5 9.91438ZM8 5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5Z"
                      fill="#737373"
                    />
                  </svg>

                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="At least 8 characters"
                    className={error.password?" py-3 outline-none":"w-[90%]  py-3 outline-none"}
                  />
                  {error.password && <p className="text-red-600 text-sm">Please check again</p>}

                </div>
              </label>
              <button type="submit" className="rounded-lg p-3 text-white hover:bg-[#BEADFF] bg-[#633CFF]">
                Login
              </button>
              <p className="mx-auto text-[#737373]">
              Don’t have an account?{" "}
                <Link className="text-[#633CFF]" href="/signup">
                  {" "}
                  Create account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
