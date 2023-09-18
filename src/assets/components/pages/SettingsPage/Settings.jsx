import React, { useContext, useEffect, useState } from "react"
import { useSubmit } from "react-router-dom"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import DotMin from "../../loaders/minDotLoader/DotMin"
import { toast } from "react-toastify"
import ReminderList from "./RemindersList"
import SettingsForm from "./SettingsForm"
function Settings() {
  const { token } = useContext(AuthContext)
  const [isSubmit, setIsSubmit] = useState(false)
  const [serverResponse, setServerResponse] = useState({})
  const [listKey, setListKey] = useState(0)
  const [inputValues, setInPutValues] = useState({
    time: "",
  })
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=add-time`
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    token,
    setServerResponse
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmit(true)
    let formBody = JSON.stringify(inputValues)
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

        setInPutValues({
          time: "",
        })
        setListKey((prev) => prev + 1)
        return
      }
    }
    updateResponse()
  }, [serverResponse])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInPutValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-5">
        <div className=" col-span-3 mt-[30px] no-header ">
          <div className="mb-[10px] flex justify-end mr-[20px]">
            <form
              action=" "
              className="flex h-fit border-[1px] border-gray-500 w-fit rounded-md overflow-hidden"
              onSubmit={handleSubmit}
            >
              <input
                type="time"
                className="px-3 p-2 h-[40px]  "
                name="time"
                value={inputValues.time}
                onChange={handleInputChange}
              />
              <button
                className={`px-4 h-[40px]   text-white 
              font-semibold outline-none transition-all duration-300  ${
                !inputValues.time
                  ? " cursor-not-allowed bg-gray-600"
                  : " bg-gray-900"
              }  `}
                disabled={!inputValues.time || isSubmit}
              >
                {!isSubmit ? (
                  "Save"
                ) : (
                  <div className="flex items-center justify-center gap-1 h-full ">
                    {" "}
                    <span>Saving </span> <DotMin />
                  </div>
                )}
              </button>
            </form>
          </div>
          <ReminderList key={listKey} />
        </div>
        <div className="w-full  col-span-2 px-4 p-6 pt-[40px]  ">
          <div className="w-full  rounded-lg overflow-hidden bg-homeBgImg bg-cover bg-right ">
            <SettingsForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
