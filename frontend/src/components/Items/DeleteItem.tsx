import { useMutation, useQueryClient } from "@tanstack/react-query"

import { type ApiError, ItemPublic, ItemsService } from "../../client"
import { ConfirmDialog,  useNotificationCenter } from "@pautena/react-design-system"
import { DialogContentText } from "@mui/material"

interface EditItemProps {
  isOpen: boolean
  item: ItemPublic;
  onClose: () => void
}

export const DeleteItem = ({ isOpen,item, onClose }: EditItemProps) => {
  const queryClient = useQueryClient()
  const {show} = useNotificationCenter();

  const mutation = useMutation({
    mutationFn: () =>
      ItemsService.deleteItem({ id: item.id }),
    onSuccess: () => {
      show({
        severity:"success",
        message:"Item deleted",
      })
      onClose()
    },
    onError: (err: ApiError) => {
      show({
        severity:"error",
        message:err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  return (
    <ConfirmDialog open={isOpen} onCancel={onClose} onConfirm={() => mutation.mutate()} title="Delete Item" loading={mutation.isPending}>
      <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
    </ConfirmDialog>
  )
}
