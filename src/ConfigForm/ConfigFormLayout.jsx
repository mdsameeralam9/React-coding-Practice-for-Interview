import React, { useState } from "react";
import { formDataConfig } from "./formData";

const getFormKey = (config) => {
  let st = {};
  for (const item of config) {
    st[item.name] = false;
  }

  return st;
};

const ConfigFormLayout = () => {
  const [formConfigData] = useState(structuredClone(formDataConfig));
  const [formData, setFormData] = useState({});
  const [errForm, setErrForm] = useState(getFormKey(formDataConfig));

  const handleChange = (e) => {
    const { name = "", value = "" } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    // setErrForm(e => ({...e, [name]: value}))
  };

  const handleSubmit = (e) => {
    e?.preventDefaut();

    // validate form
    let errState = {};
    for (const key in formData) {
      const val = formData[key];
      if (!val) {
        errState[key] = true;
      }
    }

    setErrForm(errState);
  };

  console.log(errForm);

  return (
    <div className="border w-100 p-1 flex justify-center items-center flex-col gap-2 m-4">
      <h1>User Form</h1>

      <form
        className="formWrapper w-100 gap-1 flex flex-col p-4"
        onSubmit={handleSubmit}
      >
        {formConfigData.map((form) => (
          <div className="itemWrap flex flex-col gap-0.5" key={form.name}>
            <label>{form.label}</label>
            <input
              name={form.name}
              className="border w-[100%]"
              onChange={handleChange}
              value={formData[form.name]}
              required={form.required}
              placeholder={form.placeholder}
            />
            {errForm[form.name] && (
              <p className="text-red-600">{`${form.label} is Required`}</p>
            )}
          </div>
        ))}

        <button type="submit" className="border bg-blue-500 cursor-pointer">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default ConfigFormLayout;
