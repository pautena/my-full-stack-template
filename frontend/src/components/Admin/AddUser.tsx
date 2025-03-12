import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Checkbox, FormControlLabel, Grid2, TextField } from "@mui/material"
import { FormDialog, useNotificationCenter } from "@pautena/react-design-system"
import {
  type ApiError,
  type UserCreate,
  type UserUpdate,
  UsersService,
} from "../../client"

interface AddUserProps {
  isOpen: boolean
  onClose: () => void
}

interface UserUpdateForm extends UserUpdate {
  confirm_password: string
}

export const AddUser = ({ isOpen, onClose }: AddUserProps) => {
  const queryClient = useQueryClient()
  const { show } = useNotificationCenter()

  const mutation = useMutation({
    mutationFn: (data: UserCreate) =>
      UsersService.createUser({ requestBody: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "User added",
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

  const handleSubmit = (data: any) => {
    if (data.password === "") {
      data.password = undefined
    }

    mutation.mutate(data)
  }

  return (
    <FormDialog
      open={isOpen}
      onCancel={onClose}
      title="Edit User"
      onSubmit={handleSubmit}
      loading={mutation.isPending}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            required
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="full_name"
            label="Full Name"
            fullWidth
            required
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="password"
            label="Set Password"
            fullWidth
            type="password"
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="confirm_password"
            label="Confirm Password"
            fullWidth
            type="password"
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControlLabel
            control={<Checkbox />}
            label="Is superuser?"
            name="is_superuser"
          />
        </Grid2>
        <Grid2 size={6}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Is active?"
            name="is_active"
          />
        </Grid2>
      </Grid2>
    </FormDialog>
  )
}
