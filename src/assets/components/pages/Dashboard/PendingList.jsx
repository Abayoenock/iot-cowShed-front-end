import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import nodata from "../../../Lotties/nodata.json"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
import {
  faAnglesRight,
  faTrashCan,
  faEdit,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"

import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"
import "../SettingsPage/tableStyles.css"
import LottiePlayer from "../../lottiePlayer/LottiePlayer"
const PendingList = () => {
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
  }/api/requestData.php?t=feedList`
  const { isLoading, isError, data: roomsData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setVehicleData)
  }
  useEffect(() => {
    fetchData(token, setVehicleData)
    setIsDataLoading(false)
    const intVal = setInterval(() => {
      fetchData(token, setVehicleData)
    }, 2000)
    return () => {
      clearInterval(intVal)
    }
  }, [])
  const urlDelete = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=delete&tbl=feed_commands&col_Name=commandID&dataID=${selectedVehicleDelete}`
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
  useEffect(() => {
    handleCloseDialog()
    if (success.valid) {
      toast.success(
        ` Feeding time  set at ${selectedVehicle?.time} was   successfuly deleted `,
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
      name: "Food",
      selector: (row) => row["food"],
      sortable: true,
    },
    {
      name: "Water",
      selector: (row) => row["water"],
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faTrashCan}
            title="delete user"
            onClick={() => {
              const user = vehicleData.filter((user) => {
                return user.timeTableID === row.commandID
              })
              setSelectedVehicleDelete(row.commandID)
              setSelectedVehicle(user[0])
              handleClickOpenDialog()
            }}
            className=" p-2 px-3 rounded-sm bg-red-400 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  return (
    <>
      <>
        {vehicleData.length > 0 ? (
          <div className="w-full mt-0 px-4">
            <div className=" mb-2 font-semibold text-green-900">
              <h1>Pending Manual Feeding </h1>
            </div>
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
              <DialogTitle>
                <span className=" font-semibold text-lg text-textColor">{`Delete  Pending Feed`}</span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <span className="text-sm text-lightBlack">
                    Are you sure you want to delete this pending feef from the
                    system Keep in mind that this process can not be reversed
                  </span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleCloseDialog}
                  className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="border-none bg-green-500 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-green-600 "
                >
                  Confirm
                </button>
              </DialogActions>
            </Dialog>
          </div>
        ) : (
          ""
        )}
      </>
    </>
  )
}

export default PendingList
