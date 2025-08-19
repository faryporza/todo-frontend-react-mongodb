import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 15000,
});

// Todos API
export const getTodos   = (params={}) => api.get("/todos", { params });
export const addTodo    = (payload)   => api.post("/todos", payload);
export const toggleTodo = (id)        => api.post(`/todos/${id}/toggle`);
export const updateTodo = (id, data)  => api.patch(`/todos/${id}`, data);
export const deleteTodo = (id)        => api.delete(`/todos/${id}`);
