import { useState } from "react";
import styles from "../styles/TaskCreator.module.css";
import { createTask } from "../store/taskSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";
import { AppDispatch } from "../store/store";

const TaskCreator = () => {
  const [title, setTitle] = useState(""); // This is a state variable that is used to store the title of the task
  const [description, setDescription] = useState(""); // This is a state variable that is used to store the description of the task
  const [author, setAuthor] = useState(""); // This is a state variable that is used to store the author of the task
  const [errors, setErrors] = useState({ title: "", description: "" }); // This is a state variable that is used to store the errors
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

    // const task = {
    //   // This object is used to store the task details
    //   title,
    //   description,
    //   createdBy: author || "Anonymous",
    //   type: 1,
    // };

    const task = {
      object: {
        title,
        description,
        createdBy: author || "Anonymous",
      },
      type: 1,
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
      <Button onClick={handleCreateTask}>Create</Button>
    </div>
  );
};

export default TaskCreator;
