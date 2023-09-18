import React, { useEffect, useState } from "react"
import useSubmitData from "../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import DotMin from "../loaders/minDotLoader/DotMin"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import avatar from "../../Lotties/avatar.json"
function RegisterUser() {
  const [serverResponse, setServerResponse] = useState([])
  const url = `${import.meta.env.VITE_REACT_API_URL}/api/create-account.php`
  const [isSubmit, setIsSubmit] = useState(false)
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    "",
    setServerResponse
  )

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (serverResponse?.status == false) {
        toast.error(serverResponse?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)
        return
      }
      if (serverResponse.status) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        return
      }
    }
    updateResponse()
  }, [serverResponse])
  const handleSubmit = (event) => {
    event.preventDefault()
    setServerResponse([])
    setIsSubmit(true)
    const form = document.getElementById("loginForm")
    const formData = new FormData(form)
    let formBody = JSON.stringify(Object.fromEntries(formData))
    SubmitData(formBody)
  }

  return (
    <>
      {serverResponse?.status && <Navigate to="../" replace={true} />}

      <div className="flex-1 justify-self-start ">
        <div className="w-full flex justify-center  h-[50px]">
          <span className=" w-[180px] absolute -top-[100px] bg-cyan-50 bg-opacity-90  rounded-full">
            <LottiePlayer src={avatar} loop={true} />
          </span>
        </div>

        <div className="mt-8">
          <form
            method="post"
            onSubmit={() => handleSubmit(event)}
            id="loginForm"
            className="grid grid-cols-2 gap-2"
          >
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm text-gray-600 "
              >
                firstname
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your first name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm text-gray-600 "
              >
                lastname
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your first name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-600 "
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm text-gray-600 "
              >
                phoneNumber
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your Phone Number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>

            <div className="">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600 ">
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div className="">
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="serialNumber"
                  className="text-sm text-gray-600 "
                >
                  Confirm Password
                </label>
              </div>

              <input
                type="password"
                name="Cpassword"
                id="Cpassword"
                placeholder="Confirm Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>

            <div className=" col-span-2">
              <div className="flex justify-between mb-2">
                <label htmlFor="Cpassword" className="text-sm text-gray-600 ">
                  Serial Number
                </label>
              </div>

              <input
                type="text"
                name="serialNumber"
                id="serialNumber"
                placeholder="Serial Number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40 text-sm"
                required
              />
            </div>
            <div className=" col-span-2 mt-6 w-full">
              <button
                type="submit"
                disabled={isSubmit}
                className={`  text-white transition-all duration-300 ${
                  !isSubmit
                    ? "bg-cyan-700 hover:bg-cyan-800"
                    : "bg-cyan-500 cursor-wait "
                }  focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm w-full px-5 
                      py-2.5 text-center  `}
              >
                {!isSubmit ? (
                  "Create Account"
                ) : (
                  <div className="flex items-center justify-center gap-1 h-full ">
                    {" "}
                    <span>Creating account </span> <DotMin />
                  </div>
                )}
              </button>
              <p className="text-[14px] mt-2">
                Already have account{" "}
                <NavLink to={"../"}>
                  {" "}
                  <span className="text-cyan-500">SignIn</span>{" "}
                </NavLink>{" "}
                ?{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterUser
