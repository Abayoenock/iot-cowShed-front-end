import React, { useContext, useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
import {
  faCheck,
  faClock,
  faExclamationTriangle,
  faHomeUser,
  faTimes,
  faUserClock,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons"

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"
import "../SettingsPage/tableStyles.css"
const ReportList = React.forwardRef(({ year, month, reFetch = true }, ref) => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [vehicleData, setVehicleData] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogLock, setOpenDialogLock] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [selectedVehicleDelete, setSelectedVehicleDelete] = useState(null)
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=report&year=${year}&month=${month}`
  const { isLoading, isError, data: roomsData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setVehicleData)
  }

  useEffect(() => {
    fetchData(token, setVehicleData)
    setIsDataLoading(false)
  }, [year, month])
  const urlDelete = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=delete&tbl=medtime&col_Name=timeTableID&dataID=${selectedVehicleDelete}`
  const [success, setSuccess] = useState([])
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    data,
    fetchData: fetchDataDelete,
  } = useFetch(urlDelete)
  const deleteUser = () => {
    fetchDataDelete(token, setSuccess)
    handleCloseDialog()
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000) // Convert seconds to milliseconds
    const hours = String(date.getHours()).padStart(2, "0") // Get hours and pad with leading zeros if needed
    const minutes = String(date.getMinutes()).padStart(2, "0") // Get minutes and pad with leading zeros if needed
    const seconds = String(date.getSeconds()).padStart(2, "0") // Get seconds and pad with leading zeros if needed
    return `${hours}:${minutes}:${seconds}`
  }
  useEffect(() => {
    handleCloseDialog()
    if (success.valid) {
      toast.success(
        ` Reminder set at ${selectedVehicle?.timeSet}  successfuly deleted `,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      mYcallBackFunction()
    } else if (success.valid == false) {
      toast.success(` Failed to delete reminder , please try again later `, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [success])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const columns = [
    {
      name: "Day",
      selector: (row) => row["label"],
      sortable: true,
    },

    {
      name: "Time",
      selector: (row) => {
        return (
          <div className="flex flex-col gap-2">
            {row["data"]?.map((data, index) => {
              return <span key={index}>{formatTimestamp(data.dateFeed)}</span>
            })}
          </div>
        )
      },
    },

    {
      name: "Food",
      selector: (row) => {
        return (
          <div className="flex flex-col gap-2">
            {row["data"]?.map((data, index) => {
              return (
                <span key={index}>
                  {!data.foodReport ? (
                    <FontAwesomeIcon icon={faTimes} className="text-red-400" />
                  ) : (
                    `${data.foodReport}  Kgs`
                  )}
                </span>
              )
            })}
          </div>
        )
      },
    },

    {
      name: "Water",
      selector: (row) => {
        return (
          <div className="flex flex-col gap-2">
            {row["data"]?.map((data, index) => {
              return (
                <span key={index}>
                  {!data.waterReport ? (
                    <FontAwesomeIcon icon={faTimes} className="text-red-400" />
                  ) : (
                    `${data.waterReport}  Ltrs`
                  )}
                </span>
              )
            })}
          </div>
        )
      },
    },
    {
      name: "Trigger Mode",
      selector: (row) => {
        return (
          <div className="flex flex-col gap-2">
            {row["data"]?.map((data, index) => {
              return (
                <span className="flex flex-col gap-2" key={index}>
                  {data.mode == 1 ? (
                    <span className="text-green-800 p-0 text-[16px]  flex gap-2 ">
                      {" "}
                      <FontAwesomeIcon
                        icon={faUserClock}
                        className="text-green-800"
                      />
                    </span>
                  ) : (
                    <span className="text-yellow-600 p-0 text-[16px]  flex gap-2 ">
                      {" "}
                      <FontAwesomeIcon
                        icon={faUserCog}
                        className="text-yellow-600"
                      />
                    </span>
                  )}
                </span>
              )
            })}
          </div>
        )
      },
    },
  ]

  return (
    <>
      {isLoading && (
        <div className="flex w-full min-h-[calc(100vh-400px)] justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoading && (
        <div
          className=" mt-0 px-2 no-header"
          ref={ref}
          style={{ width: "auto", height: "auto" }}
        >
          <DataTable
            title=" "
            columns={columns}
            data={vehicleData}
            pointerOnHover="false"
            pagination
            button="false"
            rtl="false"
            visible="false"
            striped="true"
            direction="auto"
            responsive="true"
            progressPending={isDataLoading}
          />
        </div>
      )}
    </>
  )
})
export default ReportList
