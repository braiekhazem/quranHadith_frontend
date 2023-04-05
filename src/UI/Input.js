import { ErrorMessage, useField } from "formik";
import "./input.css";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="inputContainer">
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <input
        autoComplete="off"
        {...props}
        {...field}
        className={`${meta.touched && meta.error && "is-invalid"}`}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default Input;
