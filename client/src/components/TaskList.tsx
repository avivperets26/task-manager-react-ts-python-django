import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Loading from "./Loading";
import { fetchTasks } from "../store/taskSlice";
import Pagination from "./Pagination";
import EmptyOrErrorState from "./EmptyOrErrorState";

const TaskList = () => {
  const { tasks, currentPage, totalTasks, searchTerm, loading } = useSelector(
    (state: RootState & { status: boolean }) => ({
      // This line is used to get the tasks, current page, total tasks, search term, and loading status from the redux store
      tasks: state.tasks.tasks, // This line is used to get the tasks from the redux store
      searchTerm: state.tasks.searchTerm, // This line is used to get the search term from the redux store
      loading: state.status, // This line is used to get the loading status from the redux store
      currentPage: state.tasks.currentPage, // This line is used to get the current page from the redux store
      totalTasks: state.tasks.totalTasks, // This line is used to get the total number of tasks from the redux store
    })
  );
  const dispatch = useDispatch<AppDispatch>();
  const handlePageChange = (page: number) => {
    // This function is used to handle the page change
    if (page !== currentPage) {
      // Check to prevent unnecessary fetching
      dispatch(fetchTasks(page));
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // This line is used to filter the tasks based on the search term

  return (
    <div className={styles.taskList}>
      {loading ? ( // This line is used to check if the tasks are loading
        <Loading />
      ) : filteredTasks.length > 0 ? ( // This line is used to check if there are tasks
        <>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} taskId={task.id!} /> // This line is used to map the tasks to the TaskItem component
          ))}
          <Pagination
            currentPage={currentPage}
            totalTasks={totalTasks}
            pageSize={8}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyOrErrorState error={false} /> // This line is used to show the empty state
      )}
    </div>
  );
};

export default TaskList;
