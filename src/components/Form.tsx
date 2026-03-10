"use client";
import { useState } from "react";
import { apiRequest } from "@/lib/apiRequest";

type Option = {
  key: string;
  label: string;
  value: string;
};

type Col = {
  key: string;
  label: string;
  type: string;
  options?: Option[] | string[];
  placeholder?: string;
};

interface FormProps {
  inputs: Col[];
  // handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void | Promise<void>;
  submitType: string;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitStatus: React.Dispatch<React.SetStateAction<string>>;
  path: string;
}

const Form = ({
  inputs,
  submitType,
  setIsSubmitting,
  setSubmitStatus,
  path,
}: FormProps) => {
  const formKeys = inputs.map((input) => input.key);
  const formObject = Object.fromEntries(formKeys.map((m) => [m, ""]));
  const [form, setForm] = useState(formObject);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log(form);
    try {
      const res = await apiRequest(`/api/${path}`, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      console.log("submitted successfully");
      setForm(Object.fromEntries(formKeys.map((m) => [m, ""])));
    } catch (error) {
      setSubmitStatus("error");
      console.error("User registration error: ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      {inputs.map((col: Col) => (
        <div key={col.key}>
          <label
            htmlFor={col.key}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {col.label}
          </label>
          {col.type === "text" && (
            <input
              type="text"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "email" && (
            <input
              type="email"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "password" && (
            <input
              type="password"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "textarea" && (
            <textarea
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
              rows={4}
            />
          )}
          {col.type === "select" && (
            <select
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
            >
              {col!.options.map((option) => (
                <option key={option} value={option}>
                  {option.replace(/^./, (char) => char.toUpperCase())}
                </option>
              ))}
            </select>
          )}

          {col.type === "radio" &&
            col.options.map((option) => (
              <>
                <input
                  key={option.key}
                  type="radio"
                  id={option.key}
                  name={col.key}
                  onChange={handleChange}
                  value={option.value}
                  className=""
                />
                <label htmlFor={option.key} className="pl-2">
                  {option.label}
                </label>
                <br />
              </>
            ))}
        </div>
      ))}
      {/* Button */}
      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
      >
        {submitType}
      </button>
    </form>
  );
};

export default Form;
