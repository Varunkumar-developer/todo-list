"use client";
import React, { useEffect, useState } from "react";
import AddTask from "../AddTask";
import TodoList from "../TodoList";
import { getAllTodos } from "../../../../api";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getAllTodos();
    setTasks(data);
  };

  return (
    <main className="min-h-[100vh]">
      <div className="p-4 border-b border-solid border-gray-100 bg-[linear-gradient(244.17deg,_#11222d_31.32%,_#4f3d91_137.05%)]">
        <h1 className="text-2xl font-bold text-center text-white">Todo List App</h1>
      </div>
      <div className="text-center mb-5 flex flex-col gap-4 max-w-3xl mx-auto p-[16px]">
        <AddTask fetchTodos={fetchTodos} />
        <TodoList tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
};

export default HomePage;
