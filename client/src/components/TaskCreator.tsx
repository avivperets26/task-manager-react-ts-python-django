import { useState } from "react";
import styles from "../styles/TaskCreator.module.css";
import { createTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { AppDispatch } from "../store/store";

// TaskCreator component that allows the user to create a new task with a title, description, and author (optional) and set the status of the task

const TaskCreator = () => {
  const [title, setTitle] = useState(""); // This is a state variable that is used to store the title of the task
  const [description, setDescription] = useState(""); // This is a state variable that is used to store the description of the task
  const [author, setAuthor] = useState(""); // This is a state variable that is used to store the author of the task
  const [errors, setErrors] = useState({ title: "", description: "" }); // This is a state variable that is used to store the errors
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreateTask = () => {
    // This function is used to handle the creation of a new task
    const errorMessages: { title: string; description: string } = {
      title: "",
      description: "",
    };
    if (!title.trim()) {
      // This condition checks if the title is empty
      errorMessages.title = "Title cannot be empty.";
    }
    if (!description.trim()) {
      // This condition checks if the description is empty
      errorMessages.description = "Description cannot be empty.";
    }
    if (errorMessages.description !== "" || errorMessages.title !== "") {
      // This condition checks if there are any errors
      setErrors(errorMessages);
      return; // Stop the function if there are errors
    }

    const task = {
      title,
      description,
      created_by: author || "Anonymous",
      status,
      creation_ts: new Date().toISOString(),
      completed_ts: new Date().toISOString(),
      verdict: 2,
      analyzer: 3,
    };
    dispatch(createTask(task)); // This function is used to create a new task
    setTitle(""); // This function is used to reset the title
    setDescription(""); // This function is used to reset the description
    setAuthor(""); // This function is used to reset the author
  };

  return (
    <div className={styles.taskCreator}>
      <h2 className={styles.title}>Create a new task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors({ ...errors, title: "" });
        }}
        className={errors.title ? styles.inputError : styles.input}
      />
      {errors.title && <div className={styles.errorText}>{errors.title}</div>}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setErrors({ ...errors, description: "" });
        }}
        className={errors.description ? styles.inputError : styles.input}
      />
      {errors.description && (
        <div className={styles.errorText}>{errors.description}</div>
      )}
      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <select
        value={status}
        onChange={(e) => setStatus(Number(e.target.value))}
        className={styles.select}
      >
        <option value={0}>To Do</option>
        <option value={1}>In Progress</option>
        <option value={2}>Done</option>
      </select>
      <Button onClick={handleCreateTask}>Create</Button>
    </div>
  );
};

export default TaskCreator;
