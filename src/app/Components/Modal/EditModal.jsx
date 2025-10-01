"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const EditModal = ({
  isOpen,
  onClose,
  handleSubmitEditTodo,
  editTaskValue,
  setEditTaskValue,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitEditTodo();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-[32px]" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
              <Dialog.Title className="text-lg font-bold mb-4 text-start">
                Edit Task
              </Dialog.Title>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  value={editTaskValue?.task || ""}
                  onChange={(e) =>
                    setEditTaskValue((prev) => ({
                      ...prev,
                      task: e.target.value,
                    }))
                  }
                  placeholder="Update your task"
                  className="input w-full border px-3 py-2 focus:outline-none rounded outline-0"
                  required
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn hover:bg-gray-200 bg-gray-100 border-none text-sm font-medium px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-[linear-gradient(272.99deg,_#3f5fff_2.72%,_#9255fd_125.7%)] hover:bg-[linear-gradient(272.99deg,_#435eff_2.72%,_#435eff_125.7%)] text-white text-sm font-medium px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
