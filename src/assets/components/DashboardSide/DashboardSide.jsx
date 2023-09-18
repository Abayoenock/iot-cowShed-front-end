import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LottiePlayer from "../lottiePlayer/LottiePlayer"

import {
  faGauge,
  faUsers,
  faCar,
  faUserGear,
  faBell,
  faPowerOff,
  faFileShield,
  faCogs,
  faCow,
} from "@fortawesome/free-solid-svg-icons"

import { AuthContext } from "../AdminDashbard/Dashboard"

import { NavLink } from "react-router-dom"
import "./activeLinkStyles.css"
import CurrentDateTime from "../pages/Dashboard/CurrentDateTime"
function DashboardSide({ navToggle, setNavToggle, logOut }) {
  const { token, userId, firstName, lastName, role } = useContext(AuthContext)

  return (
    <>
      <aside
        className={` w-full transition-all duration-300 ${
          navToggle == false ? "-translate-x-full" : "translate-x-0"
        }  md:translate-x-0   md:w-[250px] fixed top-0 left-0 min-h-screen bg-homeBgImg bg-[80%] bg-cover z-[30]`}
      >
        <div className=" w-full h-screen bg-green-700 bg-opacity-80 backdrop-blur-[1px]   ">
          <NavLink
            to={"./dashboard"}
            className=" w-full p-2 px-1 flex items-center gap-2  border-opacity-5 "
          >
            <div className="flex  w-full  text-xs  text-white gap-3 font-bold ml-[12px] mt-[10px] rounded-sm overflow-hidden items-center">
              {" "}
              <FontAwesomeIcon icon={faCow} className="text-5xl" />{" "}
              <h2>
                Cow shed Minitoring <br /> system
              </h2>
            </div>
          </NavLink>
          <div className="">
            <CurrentDateTime />
          </div>
          <ul className=" flex flex-col gap-0  w-full  mt-4 text-[15px]">
            <NavLink
              to="./dashboard"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative pl-4  p-3  flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faGauge}
                  className=" text-xl opacity-90  "
                />
                Dashboard
              </li>
            </NavLink>

            <NavLink
              to="./report"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative pl-4  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faFileShield}
                  className=" text-xl opacity-90  "
                />{" "}
                Report
              </li>
            </NavLink>

            <NavLink
              to="./settings"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative pl-4 p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faCogs}
                  className=" text-xl  opacity-90  "
                />
                Settings
              </li>
            </NavLink>

            {role == 0 && (
              <NavLink
                to="./users"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "ActiveLink" : ""
                }
              >
                <li
                  className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                  onClick={() => {
                    if (window.innerWidth <= 500) {
                      setNavToggle(() => {
                        return !navToggle
                      })
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className=" text-xl  opacity-90  "
                  />{" "}
                  Users
                </li>
              </NavLink>
            )}

            <NavLink
              to="./profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUserGear}
                  className=" text-xl  opacity-90  "
                />{" "}
                Profile
              </li>
            </NavLink>
            <li
              className=" md:hidden  transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
              onClick={() => {
                logOut()
              }}
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                className=" text-xl  opacity-90  "
              />
              Logout
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default DashboardSide
