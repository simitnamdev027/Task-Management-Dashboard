import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";


function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch()
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className=" py-10 px-10 absolute  left-0 right-0 bottom-[-100vh] top-24 rounded-xl dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}

      <div className=" bg-white dark:bg-zinc-900 shadow-md shadow-[#364e7e1a] h-[60vh] overflow-auto  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL SPACES ({boards?.length})
        </h3>

        <div className=" dropdown-borad p-7 flex flex-col gap-4 overflow-y-auto">
          {boards.map((board, index) => (
            <div
            style={{transitionDuration: "0.25s"}}
              className={` flex items-baseline space-x-2 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] hover:scale-[1.02] shadow-lg px-5 py-4 rounded-lg ${
                board.isActive &&
                " bg-black dark:bg-zinc-200 w-full shadow-xl rounded-lg text-yellow-600 dark:text-black mr-8 "
              } `}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
              }}
            >
              <img src={boardIcon} className="  filter-white  h-4 " />{" "}
              <p className=" text-lg font-bold  ">{board.name}</p>
            </div>
          ))}

          <div 
          onClick={() => {
            setIsBoardModalOpen(true);
            setOpenDropdown(false)
          }}
          className=" flex items-baseline space-x-2  text-yellow-600 px-5 py-4  ">
            <img src={boardIcon} className="   filter-white  h-4 " />
            <p className=" text-lg font-bold  ">Create New Board </p>
          </div>

          <div className=" mx-2  p-4  space-x-2 flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="sun indicating light mode" />

            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={` ${
                darkSide ? "bg-yellow-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>

            <img src={darkIcon} alt="moon indicating dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
