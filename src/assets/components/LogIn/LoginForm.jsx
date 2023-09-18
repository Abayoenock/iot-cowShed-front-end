import React, { useEffect, useState } from "react"
import useSubmitData from "../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import DotMin from "../loaders/minDotLoader/DotMin"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import avatar from "../../Lotties/avatar.json"
function LoginForm() {
  const [serverResponse, setServerResponse] = useState([])
  const url = `${import.meta.env.VITE_REACT_API_URL}/api/login.php`
  const [isSubmit, setIsSubmit] = useState(false)
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    "",
    setServerResponse
  )

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (serverResponse?.login == false) {
        toast.error("Login Failed username or password wrong", {
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
      if (serverResponse.login) {
        if (serverResponse.jwt != "") {
          localStorage.setItem(
            "iot-car-tracker",
            JSON.stringify(serverResponse)
          )
          toast.success("Login success", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        }
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
      {serverResponse.login && serverResponse.jwt != "" && (
        <Navigate to="../my-portal/dashboard" replace={true} />
      )}

      <div className="flex-1 relative pb-[10px] ">
        <div className="mt-8">
          <form
            method="post"
            onSubmit={() => handleSubmit(event)}
            id="loginForm"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm text-gray-100 "
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-100 ">
                  Password
                </label>
                <NavLink to={"forgot-password"}>
                  <span className="text-[12px] text-gray-300 focus:text-cyan-500 hover:text-cyan-800 ">
                    Forgot password?
                  </span>
                </NavLink>
              </div>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-cyan-400 dark:focus:border-cyan-400 focus:ring-cyan-400 focus:outline-none focus:ring focus:ring-opacity-40"
                required
              />
            </div>

            <div className="mt-6 w-full">
              <button
                type="submit"
                disabled={isSubmit}
                className={`  text-white transition-all duration-300  ${
                  !isSubmit
                    ? "bg-green-950 hover:bg-green-800"
                    : "bg-green-700 cursor-wait "
                }  focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 
                      py-2.5 text-center  `}
              >
                {!isSubmit ? (
                  "Sign In"
                ) : (
                  <div className="flex items-center justify-center gap-1 h-full ">
                    {" "}
                    <span>Verifying </span> <DotMin />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
