import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/TaskItem.module.css";
import { deleteTask, selectTaskById } from "../store/taskSlice";
import { useState } from "react";
import Modal from "./Modal";
import Tooltip from "./Tooltip";
import TaskEditor from "./TaskEditor";
import { AppDispatch, RootState } from "../store/store";

interface TaskItemProps {
  taskId: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId }) => {
  const task = useSelector((state: RootState) => selectTaskById(state, taskId)); // This line is used to get the task by id from the redux store
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // This is a state variable that is used to determine if the delete modal is open or not
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // This is a state variable that is used to determine if the edit modal is open or not
  const [showDetails, setShowDetails] = useState(false); // This is a state variable that is used to determine if the task details are shown or not

  if (!task) {
    // This line is used to check if the task exists
    return <div>Task not found</div>;
  }
  const openDeleteModal = () => setIsDeleteModalOpen(true); // This function is used to open the delete modal
  const closeDeleteModal = () => setIsDeleteModalOpen(false); // This function is used to close the delete modal
  const openEditModal = () => setIsEditModalOpen(true); // This function is used to open the edit modal
  const closeEditModal = () => setIsEditModalOpen(false); // This function is used to close the edit modal

  const handleDelete = () => {
    // This function is used to handle the deletion of a task
    dispatch(deleteTask(task.id!));
    closeDeleteModal();
  };
  const handleExtendClick = () => {
    // This function is used to handle the expand/collapse of the task details
    setShowDetails((prev) => !prev);
  };
  return (
    <>
      <div
        className={`${styles.taskItem} ${
          showDetails ? styles.taskItemExpanded : ""
        }`}
      >
        <div className={styles.taskContent}>
          <div className={styles.taskTitle}>{task.title}</div>
        </div>
        <div className={styles.taskActions}>
          <Tooltip title="Edit Task">
            <button onClick={openEditModal} className={styles.actionButton}>
              <img
                src="/EditIcon.svg"
                alt="Edit Task"
                style={{ height: "40px" }}
              />
            </button>
          </Tooltip>
          <Tooltip title="Delete Task">
            <button onClick={openDeleteModal} className={styles.actionButton}>
              <img
                src="/DeleteIcon.svg"
                alt="Delete Task"
                style={{ height: "40px" }}
              />
            </button>
          </Tooltip>

          {/* ... */}
          <Tooltip title={showDetails ? "Collapse Task" : "Expand Task"}>
            <button onClick={handleExtendClick} className={styles.actionButton}>
              <img
                src={showDetails ? "/CollapseIcon.svg" : "/ExpandIcon.svg"}
                alt={showDetails ? "Collapse" : "Expand"}
                style={{ height: "40px" }}
              />
            </button>
          </Tooltip>
        </div>
      </div>
      {showDetails && ( // This line is used to show the task details
        <div
          className={`${styles.taskDetails} ${
            showDetails ? styles.taskItemExpanded : ""
          }`}
        >
          <p>Description: {task.description}</p>
          <p>Author: {task.createdBy || "None"}</p>
          <p>Created Date: {new Date(task.createdAt!).toLocaleDateString()}</p>
        </div>
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        approveText="Delete"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete task <span>{task.title}</span>?
        </p>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        approveText="Update"
        cancelText="Cancel"
      >
        <TaskEditor taskId={task.id!} onClose={closeEditModal} />
      </Modal>
    </>
  );
};

export default TaskItem;
