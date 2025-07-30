import React, { useEffect, useMemo, useState } from "react";
import { addTodo } from "../../../../api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddModal = () => {
  const router = useRouter();

  const [newTaskValue, setNewTaskValue] = useState("");

  const handleSubmitNewTodo = async (e) => {
    await addTodo({ id: uuidv4(), task: newTaskValue });
    console.log(newTaskValue);
    setNewTaskValue("");
    document.getElementById("my_modal_3").close();
    router.push("/");
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Add new task</h3>
        <div className="modal-action">
          <input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input w-full"
          />
          <button
            className="btn btn-primary"
            onClick={(e) => handleSubmitNewTodo()}
          >
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddModal;
