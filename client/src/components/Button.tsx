import styles from "../styles/Button.module.css";
import { Color } from "../types/types";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  color?: Color;
  fontColor?: Color;
  borderColor?: Color;
  hoverColor?: Color;
  hoverBorderColor?: Color;
  hoverFontColor?: Color;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "white",
  fontColor = "black,",
  borderColor = "black",
  hoverColor = "black",
  hoverBorderColor = "white",
  hoverFontColor = "white",
}) => {
  return (
    <button
      className={styles.Button}
      onClick={onClick}
      style={
        {
          "--color": color,
          "--font-color": fontColor,
          "--border-color": borderColor,
          "--hover-color": hoverColor,
          "--hover-border-color": hoverBorderColor,
          "--hover-font-color": hoverFontColor,
        } as React.CSSProperties
      }
    >
      {children}
    </button>
  );
};

export default Button;
