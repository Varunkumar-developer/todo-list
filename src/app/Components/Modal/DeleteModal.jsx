'use client';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const DeleteModal = ({ isOpen, onClose, handleDeleteTask}) => {
  const handleDelete = () => {
    handleDeleteTask();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Background Overlay */}
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

        {/* Modal Panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl">
              <Dialog.Title className="text-lg font-medium text-center">
                Are you sure you want to delete this task?
              </Dialog.Title>

              <div className="flex justify-center gap-3 mt-6">
              
                <button
                  onClick={onClose}
                  className="btn bg-gray-100 border-none cursor-pointer hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                  <button
                  onClick={handleDelete}
                  className="bg-[linear-gradient(272.99deg,_#3f5fff_2.72%,_#9255fd_125.7%)] hover:bg-[linear-gradient(272.99deg,_#435eff_2.72%,_#435eff_125.7%)] cursor-pointer text-white text-sm font-medium px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
