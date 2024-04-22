import { useCallback, useState } from "react";
import styles from "../styles/Navbar.module.css";
import Modal from "./Modal";
import TaskCreator from "./TaskCreator";
import Button from "./Button";
import debounce from "lodash.debounce";
import { setSearchTerm } from "../store/taskSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [isTaskCreatorOpen, setIsTaskCreatorOpen] = useState(false); // This is a state variable that is used to determine if the task creator modal is open or not
  const dispatch = useDispatch();

  const handleOpenTaskCreator = () => {
    // This function is used to open the task creator modal
    setIsTaskCreatorOpen(true);
  };

  const handleCloseTaskCreator = () => {
    // This function is used to close the task creator modal
    setIsTaskCreatorOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // This function is used to handle the search input change
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = useCallback(
    // This function is used to debounce the search input
    debounce((newSearchTerm: string) => {
      dispatch(setSearchTerm(newSearchTerm)); // This function is used to set the search term in the redux store
    }, 300),
    [dispatch]
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.searchContainer}>
        <input // This input field is used to search for tasks
          type="text"
          placeholder="Search Tasks"
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <img
          className={styles.seachIcon}
          src="/SearchIcon.svg"
          alt="Search Icon"
          style={{ height: "30px", width: "30px" }}
        />
      </div>

      <div className={styles.titleContainer}>
        <img
          className={styles.logo}
          src="/TaskManagerLogo.svg"
          alt="Task Manager Logo"
          style={{ height: "50px" }}
        />
        <h1 className={styles.title}>Task Manager</h1>
      </div>
      <div className={styles.buttonsContainer}>
        <Button onClick={handleOpenTaskCreator}>New Task</Button>
      </div>
      <Modal // This modal is used to create a new task
        isOpen={isTaskCreatorOpen}
        onClose={handleCloseTaskCreator}
        cancelText="Done"
      >
        <TaskCreator />
      </Modal>
    </nav>
  );
};

export default Navbar;
