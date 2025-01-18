const Button = ({ text, onClick, type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "0.7rem 1.2rem",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
  
  export default Button;
  