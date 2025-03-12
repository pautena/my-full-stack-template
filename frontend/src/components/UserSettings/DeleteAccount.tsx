import { Button, DialogContentText, Grid2, Typography } from "@mui/material"
import {
  ConfirmDialog,
  useDialog,
  useNotificationCenter,
} from "@pautena/react-design-system"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ApiError, UsersService } from "../../client"
import useAuth from "../../hooks/useAuth"

const DeleteAccount = () => {
  const queryClient = useQueryClient()
  const { isOpen, open, close } = useDialog()
  const { show } = useNotificationCenter()
  const { logout } = useAuth()

  const mutation = useMutation({
    mutationFn: () => UsersService.deleteUserMe(),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Your account has been successfully deleted.",
      })
      logout()
      close()
    },
    onError: (err: ApiError) => {
      show({
        severity: "error",
        message: err.message,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Typography>
            Permanently delete your data and everything associated with your
            account.
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Button onClick={open} variant="contained" color="error">
            Delete Account
          </Button>
        </Grid2>
      </Grid2>
      <ConfirmDialog
        open={isOpen}
        onCancel={close}
        onConfirm={mutation.mutate}
        loading={mutation.isPending}
        title="Delete Account"
      >
        <DialogContentText>
          Are you sure you want to delete your account?
        </DialogContentText>
      </ConfirmDialog>
    </>
  )
}
export default DeleteAccount
