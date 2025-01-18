const FileUpload = ({ label, name, onChange }) => (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem" }}>{label}</label>
      <input type="file" name={name} onChange={onChange} />
    </div>
  );
  
  export default FileUpload;
  