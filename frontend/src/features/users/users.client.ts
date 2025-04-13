import {
  type UpdatePassword,
  type UserCreate,
  type UserPublic,
  type UserRegister,
  type UserUpdate,
  type UserUpdateMe,
  UsersService,
} from "@/client";
import { isLoggedIn } from "@/features/auth/useAuth";
import { type UseMutationArgs, handleError } from "@/utils";
import { useNotificationCenter } from "@pautena/react-design-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function getUsersQueryOptions({
  page,
  pageSize,
}: { page: number; pageSize: number }) {
  return {
    queryFn: async () => {
      const response = await UsersService.readUsers({
        query: { skip: page * pageSize, limit: pageSize },
      });
      return response.data;
    },
    queryKey: ["users", { page }],
  };
}

export const useGetUsersQuery = ({
  page,
  pageSize,
}: { page: number; pageSize: number }) => {
  return useQuery({
    ...getUsersQueryOptions({ page, pageSize }),
    placeholderData: (prevData) => prevData,
  });
};

export const useAddUserMutation = ({
  onSuccess = () => {},
}: UseMutationArgs = {}) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: UserCreate) => UsersService.createUser({ body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User added",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUserMutation = ({
  id,
  onSuccess = () => {},
}: UseMutationArgs<{ id: string }>) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: () => UsersService.deleteUser({ path: { user_id: id } }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User deleted",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUserMutation = ({
  id,
  onSuccess = () => {},
}: UseMutationArgs<{ id: string }>) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: UserUpdate) =>
      UsersService.updateUser({ path: { user_id: id }, body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User updated",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUserPasswordMeMutation = ({
  onSuccess = () => {},
}: UseMutationArgs) => {
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Password updated successfully",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
  });
};

export const useDeleteUserMeMutation = ({
  onSuccess = () => {},
}: UseMutationArgs) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Your account has been successfully deleted.",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUpdateUserMeMutation = ({
  onSuccess = () => {},
}: UseMutationArgs = {}) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User updated successfully",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });
};

export const useRegisterUser = ({
  onSuccess = () => {},
}: UseMutationArgs = {}) => {
  const { show } = useNotificationCenter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserRegister) =>
      UsersService.registerUser({ body: data }),

    onSuccess: () => {
      show({
        severity: "success",
        title: "Account created",
        message: "Your account has been created successfully.",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useReadUserMeQuery = () => {
  return useQuery<UserPublic | null, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await UsersService.readUserMe();
      return response.data || null;
    },
    enabled: isLoggedIn(),
  });
};
