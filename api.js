const baseUrl = "https://todo-backend-nosh.onrender.com";
// const baseUrl = "http://localhost:3001";

export const getAllTodos = async (setLoader) => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todos = await res.json();
  res.status === 200 && setLoader(false)
  return todos;
};

export const addTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editTodo = async (todo) => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await res.json();
  return updatedTodo;
};

// export const deleteTodo = async (id) => {
//   await fetch(`${baseUrl}/tasks/${id}`, {
//     method: "DELETE",
//   });
// };
// utils/deleteTodo.js
export const deleteTodo = async (ids) => {
  try {
    const results = await Promise.all(
      ids.map(async (val) => {
        const res = await fetch(`${baseUrl}/tasks/${val}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Failed to delete task ${val}`);
        }

        return true;
      })
    );

    return results.every(Boolean); // ✅ return true if all succeeded
  } catch (error) {
    console.error("Delete failed:", error);
    return false;
  }
};

