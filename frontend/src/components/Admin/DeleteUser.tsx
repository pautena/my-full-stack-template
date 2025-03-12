import { useMutation, useQueryClient } from "@tanstack/react-query"

import { DialogContentText } from "@mui/material"
import {
  ConfirmDialog,
  useNotificationCenter,
} from "@pautena/react-design-system"
import { type ApiError, type UserPublic, UsersService } from "../../client"

interface EditItemProps {
  isOpen: boolean
  user: UserPublic
  onClose: () => void
}

export const DeleteUser = ({ isOpen, user, onClose }: EditItemProps) => {
  const queryClient = useQueryClient()
  const { show } = useNotificationCenter()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUser({ userId: user.id }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User deleted",
      })
      onClose()
    },
    onError: (err: ApiError) => {
      show({
        severity: "error",
        message: err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return (
    <ConfirmDialog
      open={isOpen}
      onCancel={onClose}
      onConfirm={() => mutation.mutate()}
      title="Delete User"
      loading={mutation.isPending}
    >
      <DialogContentText>
        Are you sure you want to delete this user?
      </DialogContentText>
    </ConfirmDialog>
  )
}
