const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  placeholder,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input border-2 border-blue-950"
        defaultValue={defaultValue || ""}
        required
        onChange={onChange}
        placeholder={placeholder || ""}
      />
    </div>
  );
};
export default FormRow;
