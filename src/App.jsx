import { useState, useEffect } from "react";
import "./App.css";
import { Tasks } from "./Tasks";
// import master from './masterTask'
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from 'react-bootstrap';
import { Notes } from './Notes';
import { PopUp } from "./PopUp";

export default function App() {
  const [allTask, setAllTask] = useState([]);
  const [singleTask, setSingleTask] = useState("");
  const [updatedContent, setUpdatedContent] = useState('');
  const [error, setError] = useState(false);

  
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
      console.log("Enter a valid Todo - Empty");
    } else if (
      allTask.filter(
        (task) => task.title.toLowerCase() == singleTask.toLowerCase()
      ).length != 0
    ) {
      console.log("Enter a valid Todo");
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
      const updatedContent = event.target.textContent
    if (updatedContent.trim() == "") {
      event.target.textContent = taskTitle
    } else if (
      allTask.filter(
        (task) => task.title.toLowerCase() == updatedContent.toLowerCase()
      ).length != 0
    ) {
      event.target.textContent = taskTitle
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
  }

    

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="grid text-center" style={{ "--bs-columns": 18, "--bs-gap": ".5rem" }} >
          <Notes />
          <div style={{ gridColumn: "span 6" }}>
          {error && <PopUp />}
            <form className="d-flex" onSubmit={handleSubmit}>
              <input type="text" id="taskInput" value={singleTask} onChange={taskOnChange} className="form-control me-2"
                placeholder="Enter a task" />
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
            <div>
              {allTask.map((taskObj) => {
                return (
                  <Tasks oneTask={taskObj} deleteTask={handleDeleteTask} onUpdate={updateTask}/>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
