import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    const task = {
      id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
      name: newTask,
      completed: false,
    };
  
    setTodoList([...todoList, task]);
    setNewTask(""); // Clear the input field after adding the task
  };

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => {
      return task.id !== id
    });
    setTodoList(newTodoList);
  };

  const toggleComplete = (id) => {
    const updatedTodoList = todoList.map((task) => {
      return task.id === id ? { ...task, completed: !task.completed} : task;
    })
    setTodoList(updatedTodoList);
  }

  const startEditing = (id) => {
    const task = todoList.find((task) => task.id === id);
    setEditingTaskId(id);
    setEditingTaskName(task.name);
  }

  const saveEditedTask = () => {
    const updatedTodoList = todoList.map((task) => {
      return task.id === editingTaskId ? { ...task, name: editingTaskName} : task;
    });
    setTodoList(updatedTodoList);
    setEditingTaskId(null);
    setEditingTaskName("");
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskName("");
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>Noah's Todo List</h1>
      </div>

      <div className="current-time">
        The current time is: {currentTime}
      </div>

      <div className="add Task"> 
        <div>
          <input className="task-input" onChange={handleChange} value={newTask}/>
          <button className="add-task-button" onClick={addTask}> Add Task</button>
        </div>
      </div>

      <div className="list">
        {todoList.map((task) => {
          return (
            <div key={task.id} className="task">
              {editingTaskId === task.id ? (
                <>
                  <input
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                  />
                  <div className="task-buttons">
                    <button onClick={saveEditedTask}>💾</button>
                    <button onClick={cancelEditing}>❌</button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className={task.completed ? "completed" : ""}>{task.name}</h1>
                  <div className="task-buttons">
                    <button onClick={() => toggleComplete(task.id)}>✅</button>
                    <button onClick={() => deleteTask(task.id)}>🗑️</button>
                    <button onClick={() => startEditing(task.id)}>✏️</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
