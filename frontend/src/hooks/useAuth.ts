import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useNotificationCenter } from "@pautena/react-design-system";
import { BodyLoginLoginAccessToken, loginAccessToken } from "../client";
import {
	loginAccessTokenMutation,
	readUserMeOptions,
	registerUserMutation,
} from "../client/@tanstack/react-query.gen";
import { handleError } from "../utils";

const isLoggedIn = () => {
	return localStorage.getItem("access_token") !== null;
};

const useAuth = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { show } = useNotificationCenter();
	const queryClient = useQueryClient();
	const { data: user, isLoading } = useQuery({
		...readUserMeOptions(),
		enabled: isLoggedIn(),
	});

	const signUpMutation = useMutation({
		...registerUserMutation(),
		onSuccess: () => {
			navigate({ to: "/login" });
			show({
				severity: "success",
				title: "Account created",
				message: "Your account has been created successfully.",
			});
		},
		onError: (err) => {
			handleError(err, show);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});

	const loginMutation = useMutation({
		...loginAccessTokenMutation(),
		onSuccess: (data) => {
			if (data?.access_token) {
				localStorage.setItem("access_token", data?.access_token);
			}
			navigate({ to: "/" });
		},
		onError: (err) => {
			handleError(err, show);
			setError("Invalid email or password");
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
