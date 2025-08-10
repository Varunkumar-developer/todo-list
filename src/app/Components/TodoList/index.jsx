"use client";
import React, { useEffect, useState } from "react";
import { deleteTodo, editTodo, getAllTodos } from "../../../../api";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditModal from "../Modal/EditModal";
import AddTask from "../AddTask";
import DeleteModal from "../Modal/DeleteModal";

const TodoList = ({ tasks, fetchTodos, setTasks }) => {
  const [editTaskValue, setEditTaskValue] = useState({ id: "", task: "" });
  const [deleteTaskValue, setDeleteTaskValue] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  // Headless UI modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSubmitEditTodo = async () => {
    await editTodo({
      id: editTaskValue.id,
      task: editTaskValue.task,
    });

    setTasks((prev) =>
      prev.map((val) =>
        val.id === editTaskValue.id ? { ...val, task: editTaskValue.task } : val
      )
    );

    setIsEditModalOpen(false);
  };

  const handleDeleteTask = async () => {
    await deleteTodo(deleteTaskValue);
    setTasks((prev) =>
      prev.filter(
        (task) =>
          !(Array.isArray(deleteTaskValue)
            ? deleteTaskValue.includes(task.id)
            : task.id === deleteTaskValue)
      )
    );
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (id) => {
    console.log([id], "idid");
    setDeleteTaskValue(id);
    setIsDeleteModalOpen(true);
  };

  console.log("deleteTaskValue", deleteTaskValue);
  const openEditModal = (task) => {
    setEditTaskValue(task);
    setIsEditModalOpen(true);
  };

  const handleAllCheckBox = (e) => {
    setCheckedList([]);
    tasks.map((val, index) => {
      setCheckedList(
        (prev) =>
          e.target.checked
            ? [...prev, val.id] // Add ID if checked
            : prev.filter((id) => id !== val.id) // Remove ID if unchecked
      );
    });
  };

  const nodata = true;
  console.log("checkedList", checkedList);
  console.log("tasks[0].id", tasks);
  return (
    <>
      <div className="overflow-x-auto w-full mb-[50px]">
        <table className="table">
          <thead>
            <tr>
              <th className="w-[20px] p-[6px_12px]  border-b border-solid border-[#e2d0eb]">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      onChange={(e) => handleAllCheckBox(e)}
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md bg-white border border-slate-300 checked:bg-indigo-600 checked:border-indigo-600"
                      id="check6"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                {/* <input
                  type="checkbox"
                  className="accent-gray-900 cursor-pointer block"
                  onChange={(e) => handleAllCheckBox(e)}
                /> */}
              </th>
              <th className="p-[6px_12px] text-[#233556] font-medium text-base  border-b border-solid border-[#e2d0eb]">
                Task
              </th>
              <th className="w-[70px] p-[6px_12px] text-[#233556] font-medium text-base  border-b border-solid border-[#e2d0eb]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-[40px_16px]">
                  <div className="flex flex-col gap-2 items-center justify-center text-gray-500">
                    <div className="w-[60px]">
                      <img src="/no-data.png" alt="no data" />
                    </div>
                    <div className="flex items-center gap-1">
                      <p className="text-lg font-medium">No tasks found</p>
                      <AddTask nodata={nodata} />
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map((val) => (
                <tr className="hover:bg-[#f6f5ff]" key={val.id}>
                  <td className="p-[6px_12px] border-b text-[#414d61] text-sm border-solid border-[#e2d0eb]">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        checked={checkedList.includes(val.id)}
                        id={val.id}
                        onChange={(e) =>
                          setCheckedList(
                            (prev) =>
                              e.target.checked
                                ? [...prev, e.target.id] // Add ID if checked
                                : prev.filter((id) => id !== e.target.id) // Remove ID if unchecked
                          )
                        }
                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md bg-white border border-slate-300 checked:bg-indigo-600 checked:border-indigo-600"
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                    </label>
                  </td>
                  <td className="p-[6px_12px]  text-[#414d61] text-sm font-normal border-b border-solid border-[#e2d0eb]">
                    {val.task}
                  </td>
                  <td className="p-[6px_12px] border-b text-[#414d61] text-sm border-solid border-[#e2d0eb]">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEditModal(val)}
                        className="cursor-pointer p-[6px] rounded-full hover:bg-[#ffffff] hover:shadow grid place-items-center group"
                      >
                        <FiEdit className="text-gray-900" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(val.id)}
                        className="cursor-pointer p-[6px] rounded-full hover:bg-[#ffffff] hover:shadow grid place-items-center group"
                      >
                        <FiTrash className="text-gray-900" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {checkedList.length > 0 && (
        <div className="p-[16px]  bg-[#f6f5ff] rounded shadow-sm flex justify-center gap-1.5 fixed w-[100%] left-0 bottom-0 ">
          <a
            onClick={() => openDeleteModal(checkedList)}
            className=" text-sm cursor-pointer text-gray-900 hover:text-red-500 flex items-center gap-1 justify-center group"
          >
            <FiTrash className="group-hover:text-red-500 text-gray-900" /> Delete checked List
          </a>
        </div>
      )}

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        handleSubmitEditTodo={handleSubmitEditTodo}
        editTaskValue={editTaskValue}
        setEditTaskValue={setEditTaskValue}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        handleDeleteTask={handleDeleteTask}
        taskId={deleteTaskValue.id}
      />
    </>
  );
};

export default TodoList;
