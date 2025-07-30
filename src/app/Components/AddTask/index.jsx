"use client";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import AddModal from "../Modal/AddModal";

const AddTask = ({nodata}) => {
  return (
    <div>
      <button
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className={`w-fit ms-auto flex items-center leading-0 gap-2 rounded   cursor-pointer duration-150 transition-all ${!nodata && 'p-[6px_12px] hover:bg-gray-100 '} `}
      >
       {!nodata && <IoAddOutline className="text-xl font-medium rounded-full grid place-items-center" /> } 
        <span className={`${ !nodata ? 'text-sm font-medium' : 'underline text-[#1b1718] font-medium text-sm '}`}>Add New Task</span>
      </button>
      <AddModal />
    </div>
  );
};

export default AddTask;
