import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "@/components/svgs/X";
import FormInput from "@/components/form/FormInput";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import FormSubmit from "@/components/form/FormSubmit";
import { useForm } from "react-hook-form";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const {control, register, formState:{errors}, handleSubmit} = useForm({mode:"onSubmit"});

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create account");
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");

      {
        /* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
      }
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // page won't reload
  //   mutate(formData);
  // };
  const onSubmit = (formData)=> {
    console.log(formData);
  }

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  return (
    <div className="w-full md:max-w-screen-sm px-10 md:px-0 md:mx-auto flex h-screen items-center justify-center">
      <div className="hidden md:flex items-center justify-center">
        <XSvg className="lg:w-2/3 fill-white" />
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <form
          className="lg:w-2/3 max-w-sm w-full mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-extrabold text-white">Join today</h1>
          <FormInput
            PrefixIcon={MdOutlineMail}
            type="email"
            id='email'
            className="grow"
            placeholder="Email"
            name="email"
            {...register("email", {required:{
              value:true,
              message:"Email is required"
            }})}
            error={errors?.email?.message}
          />

          <div className="flex gap-4 flex-wrap md:flex-col">
            <FormInput
              PrefixIcon={FaUser}
              type="text"
              id='username'
              className="grow"
              labelClassName="flex-1"
              placeholder="Username"
              name="username"
              {...register("username", {required:{
                value:true,
                message:"Username is required"
              }})}
              error={errors?.username?.message}
            />
            <FormInput
              PrefixIcon={MdDriveFileRenameOutline}
              labelClassName="flex-1"
              type="text"
              id='fullName'
              className="grow"
              placeholder="Full Name"
              name="fullName"
              {...register("fullName", {required:{
                value:true,
                message:"Full name is required"
              }})}
              error={errors?.fullName?.message}
            />
          </div>

          <FormInput
            PrefixIcon={MdPassword}
            type="password"
            className="grow"
            password
            placeholder="Password"
            name="password"
            {...register("password", {required:{
              value:true,
              message:"Password is required"
            }, minLength:{
              value:6,
              message:"Weak password"
            }})}
            error={errors?.password?.message}
          />
          <FormSubmit text="Sign up" control={control} isPending={isPending}/>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-lg text-center">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
