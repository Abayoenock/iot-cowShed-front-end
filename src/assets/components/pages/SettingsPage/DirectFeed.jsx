import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useSubmitData from "../../useSubmitData/useSubmitData"
import useFetch from "../../useFetch"
import { toast } from "react-toastify"
import DotMin from "../../loaders/minDotLoader/DotMin"
function DirectFeed({ setOpenDialog }) {
  const { token } = useContext(AuthContext)
  const [isSubmit, setIsSubmit] = useState(false)
  const [serverResponse, setServerResponse] = useState({})
  const [listKey, setListKey] = useState(0)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [inputValues, setInPutValues] = useState({
    food: "",
    water: "",
  })

  const url = `${import.meta.env.VITE_REACT_API_URL}/api/requestData.php?t=feed`
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
        setOpenDialog(false)
        setInPutValues({
          food: "",
          water: "",
        })

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
      <form
        className="w-full backdrop-blur-sm text-gray-600  relative  flex flex-col gap-8  min-w-[350px]  "
        method="post"
        onSubmit={handleSubmit}
      >
        <div className=" border-[0px] border-dashed border-cyan-200 p-2 pt-4 relative">
          <div className={`  relative z-0 mb-6 w-full group`}>
            <input
              type="number"
              name="food"
              min={0}
              className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
              placeholder=" "
              value={inputValues.food}
              onChange={handleInputChange}
              required
            />
            <label
              htmlFor="food"
              className="absolute text-xs text-gray-800  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Food in Kgs
            </label>
          </div>
          <div className={` relative z-0 mb-6 w-full group`}>
            <input
              type="number"
              name="water"
              className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 peer"
              min={0}
              placeholder=" "
              required
              value={inputValues.water}
              onChange={handleInputChange}
            />
            <label
              htmlFor="water"
              className="absolute text-xs text-gray-800  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Water in Ltrs
            </label>
          </div>
        </div>

        <div className="w-full flex  ">
          <button
            type="submit"
            disabled={(inputValues.water == 0 && inputValues.food) || isSubmit}
            className={`${
              inputValues.food == 0 && inputValues.water == 0
                ? "bg-green-700/50 cursor-not-allowed "
                : "bg-green-700 hover:bg-green-800"
            }  w-full  text-gray-100 transition-all duration-300    font-medium rounded-lg text-sm   px-5 py-2.5 text-center `}
          >
            {!isSubmit ? (
              "Feed"
            ) : (
              <div className="flex items-center justify-center gap-1 h-full ">
                {" "}
                <span>Scheduling </span> <DotMin />
              </div>
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default DirectFeed
