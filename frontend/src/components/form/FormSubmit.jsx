import React from "react";
import { useFormState } from "react-hook-form";

const FormSubmit = ({ isPending, text, control, color }) => {
  const { isSubmitting } = useFormState({ control });
  console.log("isSubmitteding", isSubmitting);
  return (
    <button
      disabled={isSubmitting || isPending}
      type="submit"
      style={{
        backgroundColor: color,
      }}
      className={`btn rounded-full disabled:border-blue-300 disabled:opacity-40 disabled:text-blue-300 btn-primary text-white`}
    >
      {isSubmitting || isPending ? "Loading..." : text}
    </button>
  );
};

export default FormSubmit;
