import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import FormError from "./FormError";

const FormInput = React.forwardRef(
  (
    {
      id,
      PrefixIcon,
      type = "text",
      className,
      name,
      onChange,
      value,
      placeholder = "",
      labelClassName,
      inputClassName,
      label,
      password,
      error,
    },
    ref
  ) => {
    const [eye, setEye] = useState(password);
    console.log(password);
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className={`text-lg font-medium ${labelClassName}`}>
            {label}
          </label>
        )}
        <div
          className={`input input-bordered relative border focus-within:border-blue-600 rounded flex items-center gap-2, ${className}`}
        >
          {PrefixIcon && <PrefixIcon />}
          <input
            ref={ref}
            id={id ? id : name}
            type={!eye ? "text" : type}
            className={`ml-2 w-full,${error?"input-error":""}, ${inputClassName}`}
            placeholder={placeholder}
            name={name}
            onCopy={(e) => (password ? e.preventDefault() : null)}
            onPaste={(e) => (password ? e.preventDefault() : null)}
            onChange={onChange}
            value={value}
          />
          {password && (
            <button
              type="button"
              onClick={() => setEye((prev) => !prev)}
              className="z-20 absolute right-5 items-center"
            >
              {!eye && <IoMdEye size={18} />}
              {eye && <IoMdEyeOff size={18} />}
            </button>
          )}
        </div>
        <FormError error={error} id={id} />
      </div>
    );
  }
);

export default FormInput;
