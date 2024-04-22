import styles from "../styles/Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltiptext}>{title}</span>
    </div>
  );
};

export default Tooltip;
