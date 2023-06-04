import React, { useState } from "react";
import { IProps } from "./interface";
import { initUser } from "./Constants";
import validator, { noErrors, FormErrors } from "../validator";

const AddUserForm: React.FunctionComponent<IProps> = (props: IProps) => {
  const [formValue, setFormValue] = useState(initUser);
  const [errors, setErrors] = useState<FormErrors>({});
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const onFormSubgitmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("onSubmit");
    const rules = [
      { key: "name", required: true, label: "Name" },
      { key: "profession", required: true, label: "Profession" },
      { key: "age", required: true, label: "Age" },
      { key: "name", maxLength: 16, label: "name" },
      { key: "name", minLength: 4, label: "name" },
      { key: "age", minValue: 18, label: "Age" },
      { key: "age", maxValue: 60, label: "Age" },
    ];
    validator(formValue, rules, (errors: any): any => {
      console.log(formValue);
      console.log(rules);
      console.log(errors);
      const checkErrors: boolean = noErrors(errors);

      console.log(checkErrors);

      if (checkErrors) {
        props.onAddUser(formValue);
        setFormValue(initUser);
        return false;
      }
      setErrors(errors);
    });
  };
  return (
    <div className="user-form">
      <h1>add users</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
          {errors["name"] && errors["name"].length > 0 && (
            <div className="form-error">{errors["name"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Profession</label>
          <input
            type="text"
            placeholder="please input profession"
            name="profession"
            value={formValue.profession}
            onChange={onInputChange}
          />
          {errors["profession"] && errors["profession"].length > 0 && (
            <div className="form-error">{errors["profession"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Age</label>
          <input
            type="number"
            placeholder="please input age"
            name="age"
            value={formValue.age}
            onChange={onInputChange}
          />
          {errors["age"] && errors["age"].length > 0 && (
            <div className="form-error">{errors["age"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <button>Add new user</button>
        </div>
      </form>
    </div>
  );
};
export default AddUserForm;
