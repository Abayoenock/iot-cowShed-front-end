import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import Logo from "../../Images/webImages/believeLogo.png"
import ImageWithBlurhash from "../ImageWithBlurhash"
function NavBar() {
  const [navToggle, setNavToggle] = useState(false)
  useEffect(() => {
    // Get all the links with href starting with "#"
    const links = document.querySelectorAll('a[href^="#"]')

    // Add click event listeners to each link
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault() // Prevent the default link behavior

        // Get the target section ID from the link's href attribute
        const targetId = link.getAttribute("href").substring(1)

        // Find the target section element
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
          // Calculate the target section's position relative to the viewport
          let targetOffset =
            targetSection.getBoundingClientRect().top + window.pageYOffset

          // Subtract 40 pixels for small devices
          if (window.innerWidth <= 768) {
            targetOffset -= 90
            // Uncheck the checkbox input
            const checkboxInput = document.getElementById("menu")
            if (checkboxInput && checkboxInput.checked) {
              checkboxInput.checked = false
              setNavToggle(false)
            }
          }

          // Scroll smoothly to the target section
          window.scrollTo({
            top: targetOffset,
            behavior: "smooth",
          })
        }
      })
    })
  }, [])

  return (
    <>
      <div className="w-full flex justify-end md:px-4 md:py-4            ">
        <ul
          className={` z-[999] fixed  md:relative h-full top-0 left-0 flex flex-col gap-y-8 pt-20 md:pt-0 md:justify-end md:flex-row gap-x-8 text-white items-center text-2xl md:text-sm bg-blue-500 md:bg-transparent bg-opacity-80 md:bg-opacity-100 backdrop-blur-sm md:backdrop-blur-none md:h-fit w-[100%] transition-all duration-300  md:pr-4  ${
            navToggle ? "translate-x-0" : "-translate-x-full"
          }  md:translate-x-0 `}
        >
          <li className=" font-semibold">
            <a href="#Home" className="active-link">
              Home
            </a>
          </li>
          <li className=" font-semibold">
            <a href="#Rooms" className=" ">
              Rooms
            </a>
          </li>

          <li className=" font-semibold">
            <a href="#Amenities" className=" ">
              Amenities
            </a>
          </li>
          <li className=" font-semibold">
            <a href="#Contacts" className=" ">
              Contact Us
            </a>
          </li>
          <li className=" font-semibold">
            <a href="#Gallery" className=" ">
              Gallery
            </a>
          </li>

          <li className=" font-semibold">
            <a
              href="https://www.booking.com/hotel/rw/believe-residence.html"
              target="_blank"
              className=" bg-gradient-to-r from-red-900 to-red-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md flex gap-2 items-center"
            >
              {" "}
              <FontAwesomeIcon icon={faCalendarDays} />
              Book Now
            </a>
          </li>
        </ul>

        <input
          type="checkbox"
          id="menu"
          onChange={() => {
            setNavToggle(() => {
              return !navToggle
            })
          }}
        />
        <label htmlFor="menu" className="icon  md:hidden ">
          <div className="menu"></div>
        </label>
      </div>
      <div className="flex items-end  pb-2 pt-4 pl-4  fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-sm z-[99] md:hidden">
        <ImageWithBlurhash
          imageUrl={Logo}
          altImage="Logo"
          blurhash={"LEGbh.9h3Y^ZPXa1wHXQ?sxoIBNg"}
          className=" w-12 h-12 object-cover "
          parentClassName="w-12 h-12"
        />
        <h1 className="flex flex-col font-extrabold -gap-1">
          <span className="text-blue-900 ">Believe</span>{" "}
          <span className="text-red-900">Residence</span>
        </h1>
      </div>
    </>
  )
}

export default NavBar
