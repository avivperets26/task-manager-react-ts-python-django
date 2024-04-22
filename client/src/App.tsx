import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTasks, fetchCsrfToken } from "./store/taskSlice";
import styles from "./styles/App.module.css";
import Navbar from "./components/Navbar";
import { AppDispatch } from "./store/store";
import TaskList from "./components/TaskList";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCsrfToken());
    dispatch(fetchTasks(1));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Navbar />
      <TaskList />
    </div>
  );
}

export default App;
