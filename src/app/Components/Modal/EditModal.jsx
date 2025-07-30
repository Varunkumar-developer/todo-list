"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { editTodo } from "../../../../api";

const EditModal = ({
  handleSubmitEditTodo,
  editTaskValue,
  setEditTaskValue,
  editModalRef
}) => {

  return (
    <dialog ref={editModalRef} id="edit_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit task</h3>
        <div className="modal-action">
          <input
            value={editTaskValue?.task}
            onChange={(e) =>
              setEditTaskValue((prev) => ({ ...prev, task: e.target.value }))
            }
            type="text"
            placeholder="Type here"
            className="input w-full"
          />
          <button
            className="btn bg-[#1b1718] text-sm font-medium text-white"
            onClick={(e) => handleSubmitEditTodo()}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditModal;
