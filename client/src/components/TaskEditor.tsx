import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTaskById, updateTask } from "../store/taskSlice";
import styles from "../styles/TaskCreator.module.css";
import { AppDispatch, RootState } from "../store/store";

type TaskEditorProps = {
  taskId: number;
  onClose: () => void;
};

const TaskEditor = ({ taskId, onClose }: TaskEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const task = useSelector((state: RootState) => selectTaskById(state, taskId));
  // State for form fields, initialized from the task object
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  useEffect(() => {
    // Update the form fields when the task changes
    if (task) {
      setTitle(task.title); // Set the title from the task object
      setDescription(task.description); // Set the description from the task object
      setCreatedBy(task.createdBy || ""); // Set the createdBy from the task object
    }
  }, [task]);

  const handleUpdateTask = () => {
    // Handle the update task action
    const errorMessages: { title?: string; description?: string } = {};
    if (!title.trim()) {
      // Check if the title is empty
      errorMessages.title = "Title cannot be empty.";
    }
    if (!description.trim()) {
      // Check if the description is empty
      errorMessages.description = "Description cannot be empty.";
    }
    if (Object.keys(errorMessages).length > 0) {
      // Check if there are any errors
      setErrors(errorMessages as { title: string; description: string });
      return; // Stop the function if there are errors
    }
    if (task) {
      // Check if the task exists
      const updatedTask = {
        // Create an updated task object
        id: taskId,
        title,
        description,
        createdBy: createdBy || "Anonymous",
        createdAt: task.createdAt || "", // Provide a default value
        type: task.type,
      };
      dispatch(updateTask(updatedTask));
    }
    onClose(); // Close the editor modal after updating
  };

  return (
    <div className={styles.taskCreator}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors({ ...errors, title: "" });
        }}
        className={styles.inputField}
      />
      <div
        className={styles.errorText}
        style={{ visibility: errors.title ? "visible" : "hidden" }}
      >
        {errors.title || " "}
      </div>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setErrors({ ...errors, description: "" });
        }}
        className={styles.textArea}
      />
      <div
        className={styles.errorText}
        style={{ visibility: errors.title ? "visible" : "hidden" }}
      >
        {errors.title || " "}
      </div>
      <input
        type="text"
        placeholder="Author (optional)"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        className={styles.inputField}
      />
      <button onClick={handleUpdateTask} className={styles.submitButton}>
        Update
      </button>
    </div>
  );
};

export default TaskEditor;
