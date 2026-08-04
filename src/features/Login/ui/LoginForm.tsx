import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "shared/model/authContext";
import { type AuthInfo } from "shared/model/auth";

export const LoginForm = () => {
  const { login } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  // const history = useHistory();

  const { register, handleSubmit } = useForm<AuthInfo>();

  const onSubmit = async (data: AuthInfo) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      const { user, accessToken } = result;

      localStorage.setItem("accessToken", accessToken);
      login(user);
      // history.push("/dashboard");
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
