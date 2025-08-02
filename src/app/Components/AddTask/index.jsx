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
          !nodata && "p-[6px_12px] hover:bg-gray-100"
        }`}
      >
        {!nodata && (
          <IoAddOutline className="text-xl font-medium rounded-full grid place-items-center" />
        )}
        <span
          className={`${
            !nodata
              ? "text-sm font-medium"
              : "underline text-[#1b1718] font-medium text-sm"
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
