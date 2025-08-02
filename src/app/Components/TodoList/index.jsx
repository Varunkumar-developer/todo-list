"use client";
import React, { useEffect, useState } from "react";
import { deleteTodo, editTodo, getAllTodos } from "../../../../api";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditModal from "../Modal/EditModal";
import AddTask from "../AddTask";
import DeleteModal from "../Modal/DeleteModal";

const TodoList = ({tasks , fetchTodos , setTasks}) => {
  const [editTaskValue, setEditTaskValue] = useState({ id: "", task: "" });
  const [deleteTaskValue, setDeleteTaskValue] = useState({ id: "" });

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

  const handleDeleteTask = async (id) => {
    await deleteTodo(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setIsDeleteModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setDeleteTaskValue({ id });
    setIsDeleteModalOpen(true);
  };

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
