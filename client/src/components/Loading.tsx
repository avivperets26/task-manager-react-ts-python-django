import styles from "../styles/Loading.module.css";
// Loading component that displays a loading message with a logo icon while the data is being fetched
const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <img
        src="../../public/TaskManagerLogo.svg"
        style={{ height: "50px", width: "50px" }}
        alt="Logo"
        className={styles.logoIcon}
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
