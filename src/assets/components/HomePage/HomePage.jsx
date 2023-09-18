import React from "react"
import bgImage from "../../Images/webImages/cow.webm"
import cow from "../../Images/webImages/cow.png"
import LottiePlayer from "../lottiePlayer/LottiePlayer"

import farmer from "../../Lotties/farmer.json"

import LoginForm from "../LogIn/LoginForm"
import { Route, Routes } from "react-router-dom"

import ForgotPassword from "../LogIn/ForgotPassword"
function Home() {
  return (
    <>
      <header>
        <div className="w-full min-h-screen relative flex items-center justify-center   ">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            poster={cow}
          >
            <source src={bgImage} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className=" absolute top-0 left-0 w-full h-full bg-green-500 bg-opacity-20 "></div>
          <div className=" flex md:flex-row flex-col w-[95%] md:w-1/2 bg-transparent rounded-lg  shadow-sm backdrop-blur-[1px] overflow-hidden">
            <div className="bg-white w-[350px] py-3 hidden md:block ">
              <div className=" text-green-500 text-2xl font-bold text-center uppercase">
                Sign In
              </div>
              <LottiePlayer src={farmer} />
            </div>
            <div className="w-full p-3 px-5 bg-green-600 bg-opacity-70 backdrop-blur-sm">
              <h2 className="text-white font-bold text-lg">
                IoT cow shed Monitoring system
              </h2>
              <Routes>
                <Route path="/" element={<LoginForm />} />

                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home
