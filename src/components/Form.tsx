"use client";
import { FormEvent, useState } from "react";
import { apiRequest } from "@/lib/apiRequest";
import ProductsCatalog from "./ProductsCatalog";
import { Item } from "@/types/product";
import { Option, Col, FormProps } from "@/types/form";

interface CustomDimensions {
  length: string;
  height: string;
  notes: string;
  weightCapacity: string;
  width: string;
}

type Errors = {
  quantities?: string;
};

const Form = ({
  inputs,
  submitType,
  setIsSubmitting,
  setSubmitStatus,
  path,
  products = false,
  options = {},
}: FormProps) => {
  const formKeys = inputs.map((input) => [input.key, input.default]);
  const formObject = Object.fromEntries(
    formKeys.map((m) => (m[1] ? [m[0], m[1]] : [m[0], ""])),
  );

  const [form, setForm] = useState(formObject);
  const [items, setItems] = useState<Item[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const customProduct = items?.find((p) => p.isCustom);
  const showCustomSection = customProduct
    ? (items.find((i) => i.id === customProduct.id)?.quantity || 0) > 0
    : false;
  const [customDimensions, setCustomDimensions] = useState<CustomDimensions>({
    length: "",
    width: "",
    height: "",
    weightCapacity: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (products && items.length === 0) {
      newErrors.quantities = "Please select at least one product";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await apiRequest(`/api/${path}`, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          items,
          ...(showCustomSection && { customDimensions }),
          ...(options && options),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      setSubmitStatus("success");
      setForm(
        Object.fromEntries(
          formKeys.map((m) => (m[1] ? [m[0], m[1]] : [m[0], ""])),
        ),
      );
      setItems([]);
      setCustomDimensions({
        length: "",
        width: "",
        height: "",
        weightCapacity: "",
        notes: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("User registration error: ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-5 w-full ">
      {inputs.map((col: Col) => (
        <div key={col.key} className="flex flex-col items-center">
          {col.type !== "comparison" && (
            <label
              htmlFor={col.key}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {col.label}
            </label>
          )}
          {col.type === "text" && (
            <input
              type="text"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "number" && (
            <input
              type="number"
              id={col.key}
              name={col.key}
              min={0}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
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
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "date" && (
            <input
              type="date"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
            />
          )}
          {col.type === "password" && (
            <input
              type="password"
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              placeholder={col?.placeholder}
            />
          )}
          {col.type === "textarea" && (
            <textarea
              id={col.key}
              name={col.key}
              onChange={handleChange}
              value={form[`${col.key}`]}
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
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
              className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
            >
              {col!.options.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {col.type === "radio" &&
            (col.options as Option[]).map((option) => (
              <div key={option.key} className="flex items-center py-1">
                <input
                  type="radio"
                  id={option.key}
                  name={col.key}
                  onChange={handleChange}
                  value={option.value}
                  checked={form[col.key] === option.value}
                  className=""
                />
                <label htmlFor={option.key} className="pl-2">
                  {option.label}
                </label>
                {option.value && (
                  <>
                    <input type="text" />
                  </>
                )}
              </div>
            ))}
          {col.type === "comparison" &&
            form[col.leftOperand] === col.rightOperand && (
              <>
                <label
                  htmlFor={col.key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {col.label}
                </label>

                {col.inputType === "select" ? (
                  <select
                    id={col.key}
                    name={col.key}
                    onChange={handleChange}
                    value={form[`${col.key}`]}
                    className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                  >
                    {col!.options.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    id={col.key}
                    name={col.key}
                    onChange={handleChange}
                    value={form[`${col.key}`]}
                    className="w-2/3 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-600 focus:outline-none transition"
                  />
                )}
              </>
            )}
          {col.message && (
            <p className="text-xs text-gray-400 mt-1">{col.message}</p>
          )}
        </div>
      ))}

      {products && (
        <>
          <ProductsCatalog
            items={items}
            onItemsChange={setItems}
            customDimensions={customDimensions}
            onCustomDimensionsChange={setCustomDimensions}
            showCustomSection={showCustomSection}
          />
          {errors.quantities && (
            <p className="text-sm text-red-600">{errors.quantities}</p>
          )}
        </>
      )}
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
