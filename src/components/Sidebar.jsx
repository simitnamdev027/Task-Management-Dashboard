import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";

import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";

import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[250px] bg-white dark:bg-zinc-900 h-screen  fixed mt-14  py-8 px-3 top-0 items-center left-0 z-20`
            : ` bg-[#635Fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-8 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full  `
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-zinc-900  w-full pt-8 rounded-xl">
              <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL SPACES ({boards?.length})
              </h3>

              <div className="  dropdown-borad overflow-y-auto h-[59vh] flex flex-col  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex gap-2 my-2 w-full items-center space-x-2 px-5 mr-8 rounded-lg duration-500 ease-in-out py-4 cursor-pointer hover:scale-[1.02] shadow-lg hover:bg-[#635fc71a] dark:hover:bg-white dark:hover:text-black dark:text-yellow-600  ${
                        board.isActive &&
                        " bg-black dark:bg-zinc-200 rounded-lg  text-yellow-600 dark:text-zinc-900 mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <img src={boardIcon} className="  filter-white  h-4 " />{" "}
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex w-full items-center space-x-2 gap-2  mr-8 rounded-lg duration-500 ease-in-out cursor-pointer text-zinc-600 px-5 py-4 hover:bg-black hover:text-yellow-600 dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <img src={boardIcon} className="   filter-white  h-4 " />
                    <p className=" text-lg font-bold  ">Create New Space</p>
                  </div>
                </div>

                
              </div>
              <div className=" mx-2  p-4  space-x-2   flex justify-center items-center rounded-lg">
                  <img src={lightIcon} alt="sun indicating light mode" />

                  <Switch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    className={`${
                      darkSide ? "bg-yellow-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        darkSide ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>

                  <img src={darkIcon} alt="moon indicating dark mode" />
                </div>
            </div>
          )}



          {/* Sidebar hide/show toggle */}
          {isSideBarOpen ? (
            <div
              onClick={() => toggleSidebar()}
              style={{transitionDuration: "0.25s"}}
              className=" flex  items-center mt-24 w-full   text-lg font-bold  rounded-full hover:text-yellow-600 cursor-pointer mr-6 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <img
                className=" min-w-[20px]"
                src={hideSidebarIcon}
                alt=" side bar show/hide"
              />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-5  " onClick={() => toggleSidebar()}>
              <img src={showSidebarIcon} alt="showSidebarIcon" />
            </div>
          )}
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;
