import React from "react";
import FormInput from "@/components/form/FormInput";
import { MdOutlineMail } from "react-icons/md";
import XSvg from "@/components/svgs/X";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  let isPending = false;
  const navigate = useNavigate();
  return (
    <section className="max-w-screen-xl mx-auto flex h-screen justify-center">
      <button
        className="absolute top-20 left-[20%]"
        onClick={() => navigate(-1)}
      >
        <IoArrowBack size={25} />
      </button>
      <div className="flex-1 w-full flex px-10 flex-col justify-center items-center">
        <div className="flex flex-col w-full gap-1 items-start">
          <XSvg className="h-20 fill-white" />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white">
            Reset your password
          </h1>
        </div>
        <form className="flex w-full flex-col gap-8 mt-10 ">
          <FormInput
            PrefixIcon={MdOutlineMail}
            name="email"
            placeholder="Enter your email..."
            label="Enter your email address"
            className="grow"
          />
          <button
            type="submit"
            className="btn rounded-full w-full btn-primary text-white"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
