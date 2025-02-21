import React from "react";

const FormError = ({ error, id }) => {
  return (
    <>
      {error && (
        <span id={id} className="text-red-500 text-xs pl-1">
          {error}
        </span>
      )}
    </>
  );
};

export default FormError;
