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
    setDeleteTaskValue([id]);
    setIsDeleteModalOpen(true);
  };

  console.log("deleteTaskValue", deleteTaskValue);
  const openEditModal = (task) => {
    setEditTaskValue(task);
    setIsEditModalOpen(true);
  };

  const nodata = true;

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th className="w-[20px]"></th>
              <th>Task</th>
              <th className="w-[70px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-[40px_16px]">
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
                <tr className="hover:bg-gray-100" key={val.id}>
                  <td className="p-[6px_12px]">
                    <input
                      type="checkbox"
                      id={val.id}
                      onChange={(e) =>
                        setCheckedList(
                          (prev) =>
                            e.target.checked
                              ? [...prev, e.target.id] // Add ID if checked
                              : prev.filter((id) => id !== e.target.id) // Remove ID if unchecked
                        )
                      }
                    />
                  </td>
                  <td className="p-[6px_12px]">{val.task}</td>
                  <td className="p-[6px_12px]">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => openEditModal(val)}
                        className="cursor-pointer p-[6px] rounded-full hover:bg-gray-200 grid place-items-center"
                      >
                        <FiEdit className="text-green-800" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(val.id)}
                        className="cursor-pointer p-[6px] rounded-full hover:bg-gray-200 grid place-items-center"
                      >
                        <FiTrash className="text-red-500" />
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
        <div className="p-[16px] rounded shadow-sm flex gap-1.5 fixed w-[100%] max-w-3xl ">
          <a className="text-xs underline text-red-500 flex items-center gap-1"> <FiTrash className="text-red-500" /> Delete Selected List</a>
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
