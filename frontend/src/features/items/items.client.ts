import { type ItemCreate, type ItemUpdate, ItemsService } from "@/client";
import { type UseMutationArgs, handleError } from "@/utils";
import { useNotificationCenter } from "@pautena/react-design-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export const useReadItemsQuery = ({
  page,
  pageSize,
}: { page: number; pageSize: number }) => {
  return useQuery({
    ...readItemsQueryOptions({ page, pageSize }),
    placeholderData: (prevData) => prevData,
  });
};

export function readItemsQueryOptions({
  page,
  pageSize,
}: { page: number; pageSize: number }) {
  return {
    queryFn: async () => {
      const response = await ItemsService.readItems({
        query: { skip: page * pageSize, limit: pageSize },
      });
      return response.data;
    },
    queryKey: ["items", { page }],
  };
}

export const useAddItemMutation = ({
  onSuccess = () => {},
}: UseMutationArgs = {}) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: ItemCreate) => ItemsService.createItem({ body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Item added",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useDeleteItemMutation = ({
  id,
  onSuccess = () => {},
}: UseMutationArgs<{ id: string }>) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: () => ItemsService.deleteItem({ path: { id } }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Item deleted",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

export const useUpdateItemMutation = ({
  id,
  onSuccess = () => {},
}: UseMutationArgs<{ id: string }>) => {
  const queryClient = useQueryClient();
  const { show } = useNotificationCenter();

  return useMutation({
    mutationFn: (data: ItemUpdate) =>
      ItemsService.updateItem({ path: { id }, body: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Item updated",
      });
      onSuccess();
    },
    onError: (err) => {
      handleError(err, show);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
