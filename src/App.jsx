import { useState, useEffect } from "react";
import "./App.css";
import { Tasks } from "./Tasks";
import "bootstrap/dist/css/bootstrap.min.css";
import { Notes } from "./Notes";
import { PopUp } from "./PopUp";

export default function App() {
  const [allTask, setAllTask] = useState([]);
  const [singleTask, setSingleTask] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseAlert = () => {
    setError(false);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  }, [error]);

  useEffect(() => {
    const localTask = localStorage.getItem("todo");
    if (localTask) {
      const parsedTasks = JSON.parse(localTask);
      setAllTask(parsedTasks);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (singleTask.trim() == "") {
      setErrorMessage("Please enter a task to be added");
      setError(true);
    } else if (
      allTask.filter(
        (task) => task.title.toLowerCase() == singleTask.toLowerCase()
      ).length != 0
    ) {
      setErrorMessage("Task alreadt exist");
      setError(true);
    } else {
      const finalTask = [...allTask, { title: singleTask }];
      localStorage.setItem("todo", JSON.stringify(finalTask));
      setAllTask(finalTask);
    }
  };

  const taskOnChange = (e) => {
    setSingleTask(e.target.value);
  };

  const handleDeleteTask = (tasktitle) => {
    const updatedTasks = allTask.filter(
      (taskObj) => taskObj.title != tasktitle
    );
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setAllTask(updatedTasks);
  };

  const updateTask = (taskTitle, event) => {
    const updatedContent = event.target.textContent;
    if (updatedContent.trim() == "") {
      event.target.textContent = taskTitle;
    } else if (
      allTask.filter(
        (task) => task.title.toLowerCase() == updatedContent.toLowerCase()
      ).length != 0
    ) {
      event.target.textContent = taskTitle;
    } else {
      const updatedTasks = allTask.map((taskObj) => {
        if (taskObj.title === taskTitle) {
          return { ...taskObj, title: updatedContent };
        }
        return taskObj;
      });

      localStorage.setItem("todo", JSON.stringify(updatedTasks));
      setAllTask(updatedTasks);
    }
  };

  return (
    <>
      <div>
        <h2 class="center"> Easy Todo and Notes</h2>
      </div>

      <div class="row no-gutters">
        <div class="col-12 col-sm-6 col-md-8" style={{ minHeight: "100px" }}>

        </div>
        <div class="col-6 col-md-4">
          {error && (
            <PopUp
              handleCloseAlert={handleCloseAlert}
              errorMessage={errorMessage}
            />
          )}
        </div>
      </div>


      <div className="container-fluid">
        <div
          className="grid text-center"
          style={{ "--bs-columns": 18, "--bs-gap": ".5rem" }}
        >
          <Notes />
          <div style={{ gridColumn: "span 6" }}>
            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="text"
                id="taskInput"
                value={singleTask}
                onChange={taskOnChange}
                className="form-control me-2"
                placeholder="Enter a task"
              />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
            <div>
              {allTask.map((taskObj) => {
                return (
                  <Tasks
                    oneTask={taskObj}
                    deleteTask={handleDeleteTask}
                    onUpdate={updateTask}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
