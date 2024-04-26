import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Loading from "./Loading";
import { fetchTasks } from "../store/taskSlice";
import Pagination from "./Pagination";
import EmptyOrErrorState from "./EmptyOrErrorState";
import { getCurrentPage } from "../helpers/helpers";

// TaskList component that displays a list of tasks and handles pagination and search filtering of tasks based on the search term entered by the user

const TaskList = () => {
  const { tasks, searchTerm, loading } = useSelector(
    (state: RootState & { status: boolean }) => ({
      // This line is used to get the tasks, current page, total tasks, search term, and loading status from the redux store
      tasks: state.taskSlice.tasks, // This line is used to get the tasks from the redux store
      searchTerm: state.taskSlice.searchTerm, // This line is used to get the search term from the redux store
      loading: state.status, // This line is used to get the loading status from the redux store
      currentPage: getCurrentPage(
        state.taskSlice.tasks.next,
        state.taskSlice.tasks.previous
      ), // This line is used to get the current page from the redux store
      totalTasks: state.taskSlice.tasks.count, // This line is used to get the total number of tasks from the redux store
    })
  );
  const dispatch = useDispatch<AppDispatch>();
  const handlePageChange = (page: number) => {
    // Fetch the tasks for the new page
    dispatch(fetchTasks(page));
  };

  const filteredTasks = tasks.results.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // This line is used to filter the tasks based on the search term

  const isFiltered = () => {
    if (filteredTasks.length === 5) {
      return true;
    } else if (searchTerm.length === 0) {
      return true;
    } else false;
  };

  return (
    <div className={styles.taskList}>
      {loading ? ( // This line is used to check if the tasks are loading
        <Loading />
      ) : filteredTasks.length > 0 ? ( // This line is used to check if there are tasks
        <>
          {filteredTasks.map((task) => (
            <TaskItem key={task.task_id} taskId={task.task_id!} /> // This line is used to map the tasks to the TaskItem component
          ))}
          {isFiltered() && (
            <Pagination
              next={tasks.next}
              previous={tasks.previous}
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <EmptyOrErrorState error={false} /> // This line is used to show the empty state
      )}
    </div>
  );
};

export default TaskList;
