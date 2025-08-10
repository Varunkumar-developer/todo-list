"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const AddModal = ({
  isOpen,
  onClose,
  handleSubmitNewTodo,
  newTaskValue,
  setNewTaskValue,
}) => {
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
          <div className="fixed inset-0  backdrop-blur-[32px]" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-semibold">
                  Add New Task
                </Dialog.Title>

                <input
                  type="text"
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  placeholder="Enter task..."
                  className="input input-bordered w-full mt-4"
                />

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="btn bg-gray-100 border-none cursor-pointer hover:bg-gray-200 font-medium"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn bg-[linear-gradient(272.99deg,_#3f5fff_2.72%,_#9255fd_125.7%)] hover:bg-[linear-gradient(272.99deg,_#435eff_2.72%,_#435eff_125.7%)] text-white text-sm font-medium px-4 py-2 rounded"
                    onClick={handleSubmitNewTodo}
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddModal;
