import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useLoginMutation } from "../features/auth/auth.service";
import {
  useReadUserMeQuery,
  useRegisterUser,
} from "../features/users/users.client";

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data: user, isLoading } = useReadUserMeQuery();

  const signUpMutation = useRegisterUser({
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });

  const loginMutation = useLoginMutation({
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate({ to: "/login" });
  };

  return {
    signUpMutation,
    loginMutation,
    logout,
    user,
    isLoading,
    error,
    resetError: () => setError(null),
  };
};

export { isLoggedIn };
export default useAuth;
