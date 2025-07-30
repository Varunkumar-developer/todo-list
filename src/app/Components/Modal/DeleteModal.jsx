"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const DeleteModal = ({
  deleteTaskValue,
  setDeleteTaskValue,
  handleDeleteTask,
  deleteModalRef,
}) => {
  const router = useRouter();
  const [newTaskValue, setNewTaskValue] = useState("");

  return (
    <dialog id="delete_modal" className="modal" ref={deleteModalRef}>
      <div className="modal-box p-[16px_16px_24px_16px]">
        <h3 className="font-medium text-lg text-center max-w-[300px] mx-auto">
          Are you sure, you want to delete this task?
        </h3>
        <div className="modal-action justify-center mt-4">
          <button
            className="btn bg-red-600 text-sm font-medium text-white"
            onClick={(e) => handleDeleteTask(deleteTaskValue.id)}
          >
            Delete
          </button>
          <form method="dialog">
            <button className="btn bg-[#1b1718] text-sm font-medium text-white">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;
