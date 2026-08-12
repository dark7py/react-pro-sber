import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "shared/model/authContext";
import { signIn } from "shared/api/auth";
import { useNavigate } from "react-router-dom";
import { type SignInFormValues } from "../model";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<SignInFormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await signIn(data);

      const { user, accessToken } = response.data;

      if (response.status === 201) {
        login({
          accessToken: accessToken,
          userId: user.id,
          name: "",
        });

        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to log in. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Email" />
      <input {...register("password")} type="password" placeholder="Password" />
      {error && <p>{error}</p>}
      <button type="submit">Log in</button>
    </form>
  );
};
