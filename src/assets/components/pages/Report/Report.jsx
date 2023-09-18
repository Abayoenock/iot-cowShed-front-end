import React, { useContext, useEffect, useRef, useState } from "react"
import { exportComponentAsPNG } from "react-component-export-image"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import generatePDF, { Resolution, Margin } from "react-to-pdf"
import { LineChartAdmin } from "../../charts/LineChart/LineChartAdmin"
import Select from "react-select"
import ReminderList from "../SettingsPage/RemindersList"
import ReportList from "./ReportList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilePdf, faImage, faPrint } from "@fortawesome/free-solid-svg-icons"
import ReactToPrint from "react-to-print"
function Report() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)

  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const tableRef = useRef()
  const optionsMonth = [
    {
      value: "",
      label: "Select Month",
    },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "Septemper" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const optionsYear = [
    {
      value: "",
      label: "Select Year",
    },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ]

  return (
    <div className="w-full flex  flex-col p-3 ">
      <div className=" w-full grid grid-cols-1  ">
        <div className=" w-full ">
          <div className="w-full   p-6  ">
            <div className="w-full flex gap-3">
              <div className="flex flex-col text-[12px] w-fit  gap-2">
                <label htmlFor="Month" className="text-white">
                  Month
                </label>
                <Select
                  className="basic-single focus:border-cyan-300"
                  classNamePrefix="select"
                  defaultValue={optionsMonth[new Date().getMonth() + 1]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="Month"
                  options={optionsMonth}
                  onChange={(selected) => {
                    setMonth(selected.value)
                  }}
                />
              </div>
              <div className="flex flex-col text-[12px] w-fit  gap-2">
                <label htmlFor="Month" className="text-white">
                  Year
                </label>
                <Select
                  className="basic-single focus:border-cyan-300"
                  classNamePrefix="select"
                  defaultValue={optionsYear[2]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="Year"
                  options={optionsYear}
                  onChange={(selected) => {
                    setYear(selected.value)
                  }}
                />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 mt-8  ">
              <div className="w-full ">
                <div className="w-full flex justify-end pb-4 gap-3 ">
                  <button
                    className="p-2 px-3 text-xs text-gray-100 bg-gray-700 rounded-md transition-all duration-300 hover:bg-gray-900 hover:translate-y-1 flex gap-2 items-center"
                    onClick={() =>
                      generatePDF(tableRef, {
                        filename: "report.pdf",
                        page: { margin: Margin.MEDIUM },
                        method: "save",
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faFilePdf} />
                    Download PDF
                  </button>

                  <button
                    className="p-2 px-3 text-xs text-gray-100 bg-gray-700 rounded-md transition-all duration-300 hover:bg-gray-900 hover:translate-y-1 flex gap-2 items-center"
                    onClick={() =>
                      exportComponentAsPNG(tableRef, {
                        fileName: "report.png",
                      })
                    }
                  >
                    {" "}
                    <FontAwesomeIcon icon={faImage} />
                    Export Image
                  </button>
                  <ReactToPrint
                    trigger={() => (
                      <button className=" p-2 px-3 text-xs text-gray-100 bg-gray-700 rounded-md transition-all duration-300 hover:bg-gray-900 hover:translate-y-1 flex gap-2 items-center ">
                        {" "}
                        <FontAwesomeIcon icon={faPrint} /> Print
                      </button>
                    )}
                    content={() => tableRef.current}
                  />
                </div>
                <ReportList year={year} month={month} ref={tableRef} />
              </div>
              {/* <div className=" w-full min-h-[400px] bg-homeBgImg bg-cover rounded-md overflow-hidden bg-right ">
                <div className=" w-full h-full bg-gray-700 bg-opacity-70 backdrop-blur-[1px] p-4">
                  <LineChartAdmin year={year} month={month} reFetch={false} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
