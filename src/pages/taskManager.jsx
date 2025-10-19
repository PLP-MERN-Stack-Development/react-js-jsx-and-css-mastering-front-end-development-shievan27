import React, { useState, useEffect } from 'react';
import Button from "../components/button";
import Card from "../components/card";

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Task Manager
      </h1>

      {/* Add Task Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          onClick={addTask}
          variant="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </Button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task, index) => (
            <Card
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="w-5 h-5 accent-blue-500 cursor-pointer"
                />
                <span
                  className={`text-gray-800 ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                onClick={() => deleteTask(index)}
                variant="danger"
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
              >
                Delete
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskManager;
