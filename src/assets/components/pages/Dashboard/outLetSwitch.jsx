import React, { useContext, useEffect, useState } from "react"
import "./outletSwitch.css"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { toast } from "react-toastify"
function OutLetSwitch() {
  const [state, setState] = useState({ state: false })
  const [switchState, setSwitchState] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [serverResponse, setServerResponse] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=switchState`

  const urlUpdate = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=changeState`
  const { isLoading, isError, data: roomsData, fetchData } = useFetch(url)

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    data,
    SubmitData,
  } = useSubmitData(urlUpdate, token, setServerResponse)
  useEffect(() => {
    fetchData(token, setState)
    setIsDataLoading(false)
    const intVal = setInterval(() => {
      fetchData(token, setState)
    }, 3000)
    return () => {
      clearInterval(intVal)
    }
  }, [])
  useEffect(() => {
    console.log(state)
    setSwitchState(state?.state)
  }, [state])

  const handleSwitch = () => {
    setSwitchState((prev) => !prev)
    console.log(switchState)
    handleSubmit()
  }

  const handleSubmit = () => {
    setIsSubmit(true)
    let formBody = JSON.stringify({ state: !switchState })
    console.log(formBody)
    SubmitData(formBody)
  }

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (!serverResponse?.success) {
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
      if (serverResponse?.success) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 5000,
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
    }
    updateResponse()
  }, [serverResponse])

  return (
    <div>
      <label className="switch">
        <div className="round">
          <input
            name="onoff"
            id="onoff"
            type="checkbox"
            className="Input"
            checked={switchState}
            onChange={handleSwitch}
          />
          <div className="back">
            <label htmlFor="onoff" className="but">
              <span className="on">0</span>
              <span className="off">I</span>
            </label>
          </div>
        </div>
      </label>
    </div>
  )
}

export default OutLetSwitch
