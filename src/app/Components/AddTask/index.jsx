"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import AddModal from "../Modal/AddModal";
import { addTodo } from "../../../../api";
import { v4 as uuidv4 } from "uuid";

const AddTask = ({ nodata, fetchTodos }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmitNewTodo = async () => {
    if (!newTaskValue.trim()) return;
    await addTodo({ id: uuidv4(), task: newTaskValue });
    setNewTaskValue("");
    setIsAddModalOpen(false); // ✅ Close modal
    fetchTodos(); // ✅ Refresh tasks in HomePage
  };

  return (
    <div>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className={`w-fit ms-auto flex items-center leading-0 gap-2 rounded cursor-pointer duration-150 transition-all ${
          !nodata &&
          "p-[6px_12px] bg-[linear-gradient(272.99deg,_#3f5fff_2.72%,_#9255fd_125.7%)] rounded hover:bg-[linear-gradient(272.99deg,_#435eff_2.72%,_#435eff_125.7%)]"
        }`}
      >
        {!nodata && (
          <IoAddOutline className="text-xl font-bold rounded-full grid place-items-center text-white" />
        )}
        <span
          className={`${
            !nodata
              ? "text-sm font-medium text-white"
              : "border-b border-solid border-[#3f5fff] font-medium text-sm bg-[linear-gradient(272.99deg,_#3f5fff_2.72%,_#9255fd_125.7%)] bg-clip-text text-transparent"
          }`}
        >
          Add New Task
        </span>
      </button>

      {/* Headless UI Add Modal */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        handleSubmitNewTodo={handleSubmitNewTodo}
        newTaskValue={newTaskValue}
        setNewTaskValue={setNewTaskValue}
      />
    </div>
  );
};

export default AddTask;
