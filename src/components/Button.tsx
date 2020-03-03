import React from "react";

const Button: React.FC<IButtonProps> = props => {
  const { text, additionalClasses = [], onClick = () => {} } = props;
  return (
    <button
      type="button"
      className={["button"].concat(additionalClasses).join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
