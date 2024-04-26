import styles from "../styles/EmptyOrErrorState.module.css";

interface EmptyOrErrorStateProps {
  error: boolean;
}
// EmptyOrErrorState component that displays a message when the list is empty or when there is an error
const EmptyOrErrorState = ({ error }: EmptyOrErrorStateProps) => {
  return (
    <div className={styles.loadingContainer}>
      <p>
        {error
          ? "It seems we have a problem to get your tasks"
          : "The list is empty"}
      </p>
    </div>
  );
};

export default EmptyOrErrorState;
