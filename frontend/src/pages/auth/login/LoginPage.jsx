import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import XSvg from "@/components/svgs/X";
import FormInput from "@/components/form/FormInput";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormSubmit from "@/components/form/FormSubmit";

const LoginPage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
  } = useForm({
    mode: "onSubmit",
  });

  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    error,
    mutateAsync: loginMutation,
  } = useMutation({
    mutationFn: async ({ username, password }) => {
      try {
        await new Promise(( res, rej ) => {
          setTimeout(() => {}, 10000);
          res("");
        });
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      // refetch the authUser
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const onSubmit = async (formData) => await loginMutation(formData);

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
          <h1 className="text-4xl font-extrabold text-white">{"Let's"} go</h1>

          <FormInput
            PrefixIcon={MdOutlineMail}
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
            error={errors?.username?.message}
          />

          <div>
            <FormInput
              PrefixIcon={MdPassword}
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              password
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
              error={errors?.password?.message}
            />
            <Link to="/forgotpassword">
              <button
                type="button"
                className="text-blue-500 text-end w-full text-lg hover:underline"
              >
                Forgot your password?
              </button>
            </Link>
          </div>
          <FormSubmit color="" control={control} isPending={isPending} text={"Login"} />
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex w-full max-w-sm flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-white text-center text-lg">
            {"Don't"} have an account?
          </p>
          <Link to="/signup" className="relative">
            <button
              type="button"
              className="btn rounded-full btn-primary text-white btn-outline w-full"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
