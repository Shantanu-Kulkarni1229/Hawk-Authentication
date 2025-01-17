import React from "react";

const InputField = React.memo(({ label, type, name, value, onChange }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label style={{ display: "block", marginBottom: "0.5rem" }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{ padding: "0.5rem", width: "100%" }}
      required
    />
  </div>
));

export default InputField;
