import React from "react";
import AddTask from "../AddTask";
import TodoList from "../TodoList";

const HomePage = async () => {

  return (
    <main className="max-w-3xl mx-auto p-[16px]">
      <div className="text-center mb-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask />
      </div>
      <TodoList />
    </main>
  );
};

export default HomePage;
