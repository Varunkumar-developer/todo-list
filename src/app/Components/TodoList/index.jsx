"use client";
import React, { useEffect, useRef, useState } from "react";
import { deleteTodo, editTodo, getAllTodos } from "../../../../api";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditModal from "../Modal/EditModal";
import DeleteModal from "../Modal/DeleteModal";
import AddTask from "../AddTask";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskValue, setEditTaskValue] = useState({ id: "", task: "" });
  const [deleteTaskValue, setDeleteTaskValue] = useState({ id: "" });
  const editModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const nodata = true;

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos();
      setTasks(data);
    };
    fetchTodos();
  }, [tasks]);

  const handleSubmitEditTodo = async () => {
    await editTodo({
      id: editTaskValue.id,
      task: editTaskValue.task,
    });

    const updatedTasks = tasks.map((val) =>
      val.id === editTaskValue.id ? { ...val, task: editTaskValue.task } : val
    );

    setTasks(updatedTasks);
    editModalRef.current?.close();
  };

  const handleDeleteTask = async (id) => {
    await deleteTodo(id);
    deleteModalRef.current?.close();
  };



  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th className=" w-[70px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks == "" ? (
              <tr>
                <td colSpan="2" className="p-[40px_16px]">
                  <div className="flex flex-col gap-2 items-center justify-center text-gray-500 ">
                    <div className="w-[60px]">
                      <img src="/no-data.png" alt="no data" />{" "}
                    </div>
                    <div className="flex items-center gap-1"><p className="text-lg font-medium">No tasks found</p> <AddTask nodata={nodata} /> </div>
                  </div>
                </td>
              </tr>
            ) : (
              tasks.map((val, index) => (
                <tr className="hover:bg-gray-100" key={val.id}>
                  <td className="p-[6px_12px]">{val.task}</td>
                  <td className="p-[6px_12px]">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => {
                          setEditTaskValue((prev) => ({
                            ...prev,
                            id: val.id,
                            task: val.task,
                          }));
                          document.getElementById("edit_modal").showModal();
                        }}
                        className="cursor-pointer p-[6px] rounded-full hover:bg-gray-200 grid place-items-center"
                      >
                        <FiEdit className="text-green-800" />
                      </button>
                      <button
                        onClick={() => {
                          setDeleteTaskValue((prev) => ({
                            ...prev,
                            id: val.id,
                          }));
                          document.getElementById("delete_modal").showModal();
                        }}
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

      <EditModal
        editModalRef={editModalRef}
        handleSubmitEditTodo={handleSubmitEditTodo}
        editTaskValue={editTaskValue}
        setEditTaskValue={setEditTaskValue}
      />
      <DeleteModal
        deleteModalRef={deleteModalRef}
        handleDeleteTask={handleDeleteTask}
        setDeleteTaskValue={setDeleteTaskValue}
        deleteTaskValue={deleteTaskValue}
      />
    </>
  );
};

export default TodoList;
