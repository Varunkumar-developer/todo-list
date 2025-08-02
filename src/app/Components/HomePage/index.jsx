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
    <main className="max-w-3xl mx-auto p-[16px]">
      <div className="text-center mb-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask fetchTodos={fetchTodos} />
      </div>
      <TodoList tasks={tasks} setTasks={setTasks} />
    </main>
  );
};

export default HomePage;
