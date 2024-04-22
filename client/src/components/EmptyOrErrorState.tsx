import styles from "../styles/EmptyOrErrorState.module.css";

interface EmptyOrErrorStateProps {
  error: boolean;
}

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
