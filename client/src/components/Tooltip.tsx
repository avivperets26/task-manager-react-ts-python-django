import styles from "../styles/Tooltip.module.css";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
}

// Tooltip component that displays a tooltip with a title when the user hovers over the children element

const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltiptext}>{title}</span>
    </div>
  );
};

export default Tooltip;
