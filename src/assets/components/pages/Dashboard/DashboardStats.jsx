import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faCow,
  faPills,
  faWeightScale,
  faWifi,
} from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
import { getTimeDifference } from "./LastSeen"
import WaterLevelIndicator from "./WaterLevelIndicator"
import OutLetSwitch from "./outLetSwitch"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import DirectFeed from "../SettingsPage/DirectFeed"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
function DashboardStats() {
  const [openDialog, setOpenDialog] = useState(false)
  const { token, userId, firstName, lastName } = useContext(AuthContext)
  const [summary, setSummary] = useState({})
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=summary`
  const { isLoading, isError, data: summaryData, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setSummary)
    const intID = setInterval(() => {
      fetchData(token, setSummary)
    }, 1000)
    return () => {
      clearInterval(intID)
    }
  }, [])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
      <div className="w-full p-2 px-4 pb-8 border-[0px] border-green-600 border-dotted grid grid-cols-2 gap-3 rounded-md bg-[#212121] shadow-lg relative transition-all  duration-300 hover:scale-105 cursor-pointer ">
        <div className=" col-span-2">
          <h1 className="text-gray-200 font-semibold text-[13px]">
            Water Consumption
          </h1>
        </div>
        <WaterLevelIndicator
          level={`${summary?.water ? summary?.water : 0}%`}
        />
        <div className=" absolute top-3 right-3">
          <OutLetSwitch />
          <p className="text-gray-200 text-[10px] text-center mt-1">Outlet</p>
        </div>
        <div className=" col-span-2 flex ">
          <div className=" text-gray-300 text-xs flex flex-col gap-1 pr-3 border-r-[1px] border-gray-400 border-dotted">
            <span>Today's consumption</span>
            <span>
              {summary?.waterTotal &&
                parseFloat(summary?.waterTotal.toFixed(1))}{" "}
              L
            </span>
          </div>
          <div className=" text-gray-300 text-xs flex pl-3 flex-col gap-1 ">
            <span>Last refill time</span>
            <span className="text-[9px]">
              {summary?.lastWaterRefill
                ? getTimeDifference(summary?.lastWaterRefill)
                : "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full shadow-lg rounded-md border-[1px] border-blue-100  relative bg-homeBgImg bg-cover text-white transition-all duration-300 hover:scale-105 cursor-pointer ">
        <div className=" w-full h-full p-2 px-4 bg-green-600/70 grid grid-cols-2 backdrop-blur-[1px]">
          <div className=" col-span-2 flex flex-col gap-3">
            <h2 className="font-semibold text-[13px]  ">Food Consumption</h2>
            <div className=" flex gap-4 font-bold text-3xl  items-center ">
              <FontAwesomeIcon icon={faWeightScale} className="text-[80px]" />
              <span>{summary?.food} Kgs</span>
            </div>
          </div>
          <div className=" col-span-2 flex h-fit">
            <div className=" text-gray-100 text-xs flex flex-col gap-1 pr-3 border-r-[1px] border-gray-400 border-dotted">
              <span>Today's consumption</span>
              <span>
                {summary?.foodTotal &&
                  parseFloat(summary?.foodTotal.toFixed(1))}{" "}
                Kgs
              </span>
            </div>
            <div className=" text-gray-100 text-xs flex pl-3 flex-col gap-1 ">
              <span>Last refill time</span>
              <span className="text-[9px]">
                {" "}
                {summary?.lastFoodRefill
                  ? getTimeDifference(summary?.lastFoodRefill)
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  rounded-md  p-2 px-4 relative  text-white transition-all duration-300  flex flex-col gap-4  ">
        <div className="w-full bg-gray-200 shadow-lg rounded-md border-dotted border-[1px] border-blue-100 p-2 px-4 relative  text-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer ">
          <div className="">
            <h2 className="font-semibold text-[13px] opacity-90 ">
              Device Active
            </h2>

            <p className="text-xs opacity-80 mt-2">
              {summary?.lastSeen
                ? getTimeDifference(summary?.lastSeen)
                : "No Data"}
              &nbsp;
            </p>
          </div>

          <FontAwesomeIcon
            icon={faWifi}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-gray-600 p-2 text-gray-100 animate-pulse rounded-md "
          />
        </div>

        <div className="w-full bg-blue-700/20 shadow-lg rounded-md border-dotted border-[1px] border-blue-100 p-2 px-4 relative  text-gray-800 transition-all duration-300 hover:scale-105 cursor-pointer ">
          <div className="">
            <h2 className="font-semibold text-[13px] opacity-90 ">
              Set Refill times
            </h2>

            <p className="text-[15px] font-semibold opacity-80 mt-2">
              {summary?.setTimes}
              &nbsp;
            </p>
          </div>

          <FontAwesomeIcon
            icon={faClock}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-blue-800/20 p-2 text-gray-800 rounded-md "
          />
        </div>
        <button
          className=" relative z-[1] bg-red-800 text-white w-full rounded-md p-3 font-semibold text-sm transition-all duration-300 hover:translate-y-1 hover:bg-opacity-90 hover:scale-105 flex justify-center items-center gap-3 before:absolute before:w-[10px] before:h-[10px] before:rounded-full before:bg-red-600 before:top-2  before:left-2 before:border-red-600 before:border-[1px] before:border-dotted before:-z-[2] before:animate-ping "
          onClick={handleClickOpenDialog}
        >
          <FontAwesomeIcon icon={faCow} className="text-2xl " />
          Manual feed{" "}
        </button>
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialog}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            color: "#fff",
            backgroundColor: "rgba(37,255,25,0.2)",
            backdropFilter: "blur(3px)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <DialogContent>
            <DirectFeed setOpenDialog={setOpenDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default DashboardStats
