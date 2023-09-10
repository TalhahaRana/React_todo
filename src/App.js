



import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false); // Separate state for edit popup
  const [popupMode, setPopupMode] = useState("add");
  const [editedTodoId, setEditedTodoId] = useState(null);
  const [todoText, setTodoText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Separate state for delete popup
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleAddTodo = () => {
    if (todoText.trim() !== "") {
      if (popupMode === "add") {
        setTodos([...todos, { text: todoText, priority }]);
      } else if (popupMode === "edit" && editedTodoId !== null) {
        const updatedTodos = todos.map((todo, index) => {
          if (index === editedTodoId) {
            return { text: todoText, priority };
          }
          return todo;
        });
        setTodos(updatedTodos);
      }
      closePopup();
    }
  };

  const addNewTodo = () => {
    if (popupMode === "add" && todoText.trim() !== "") {
      setTodos([...todos, { text: todoText, priority, progress: 0 }]);
      closePopup();
    }
  };

  const handleButtonClick = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      const currentProgress = updatedTodos[index].progress;

      if (currentProgress === 0) {
        updatedTodos[index].progress = 50;
      } else if (currentProgress === 50) {
        updatedTodos[index].progress = 100;
      } else {
        updatedTodos[index].progress = 0;
      }

      return updatedTodos;
    });
  };

  const handleDeleteTodo = (index) => {
    setDeletingIndex(index);
    setShowDeletePopup(true);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    closeDeletePopup();
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setDeletingIndex(null);
  };

  const setPriorityClass = (p) => {
    return priority === p ? "selected" : "";
  };

  const handleEditTodo = (index) => {
    setPopupMode("edit");
    setEditedTodoId(index);
    setTodoText(todos[index].text);
    setPriority(todos[index].priority);
    setShowEditPopup(true);
  };

  const openAddTodoPopup = () => {
    setPopupMode("add");
    setTodoText("");
    setPriority("medium");
    setShowEditPopup(true);
  };

  const closePopup = () => {
    setShowEditPopup(false);
    setShowDeletePopup(false);
    setEditedTodoId(null);
  };

  

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="todo">
            <h1>Todo List</h1>
            <button className="addtask" onClick={openAddTodoPopup}>
              {" "}
              <i className="fas fa-plus"></i> Add Todo
            </button>
          </div>
        </div>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <div className="all  col">
              <div className="task col-3">
                <h5>task</h5>
                <p>{todo.text}</p>
              </div>

              <div className="Priority-list col-3">
                <h5>Priority</h5>
                <p className={todo.priority}>{todo.priority}</p>
              </div>

              <div className="progress-container col-4">
                <div className="button-container">
                  <Button onClick={() => handleButtonClick(index)}>
                    {todo.progress === 0
                      ? "Todo"
                      : todo.progress === 50
                      ? "In Progress"
                      : "Done"}
                  </Button>
                </div>
                <div className="circle">
                  <CircularProgress
                    color="secondary"
                    variant="determinate"
                    value={todo.progress}
                  />
                </div>
              </div>

              <div className="feature col-2">
                <button onClick={() => handleEditTodo(index)}>
                  {" "}
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="trash"
                  onClick={() => handleDeleteTodo(index)}
                >
                  {" "}
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {showEditPopup && (
        <div className="poprow">
          <div className="popup">
            <div className="popup-content">
              <div className="stat">
                <h2>{popupMode === "add" ? "Add Task" : "Edit Todo"}</h2>
                <button className="close-button" onClick={closePopup}>
                  X
                </button>
              </div>
              <input
                type="text"
                placeholder="Todo text"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
              />
              <div className="addmid">
                <h4>priorty</h4>
                <div className="priority-buttons">
                  <button
                    className={`priority-button high ${priority === "high" ? "selectedred" : ""}`}
                    onClick={() => setPriority("high")}
                  >
                    High
                  </button>
                  <button
                    className={`priority-button medium ${priority === "medium" ? "selectedyellow" : ""}`}
                    onClick={() => setPriority("medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`priority-button low ${priority === "low" ? "selectedgreen" : ""}`}
                    onClick={() => setPriority("low")}
                  >
                    Low
                  </button>
                </div>
              </div>
              <div className="addbottom">
                <button onClick={handleAddTodo}>
                  {popupMode === "add" ? "Add" : "Update Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="poprow">
          <div className="popup">
            <div className="popup-content">
              <h2>Are you sure you want to delete this task?</h2>
              <div className="button-containers">
                <button
                  className="trashs"
                  onClick={() => deleteTodo(deletingIndex)}
                >
                  Delete
                </button>
                <button className="no" onClick={closeDeletePopup}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
