import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Grid2 } from "@mui/material"
import {
  FormDialog,
  TextField,
  useNotificationCenter,
} from "@pautena/react-design-system"
import { type ApiError, type ItemCreate, ItemsService } from "../../client"

interface AddItemProps {
  isOpen: boolean
  onClose: () => void
}

export const AddItem = ({ isOpen, onClose }: AddItemProps) => {
  const queryClient = useQueryClient()
  const { show } = useNotificationCenter()

  const mutation = useMutation({
    mutationFn: (data: ItemCreate) =>
      ItemsService.createItem({ requestBody: data }),
    onSuccess: () => {
      show({
        severity: "success",
        message: "Item created",
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
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })

  const handleSubmit = (data: any) => mutation.mutate(data)

  return (
    <FormDialog
      open={isOpen}
      onCancel={onClose}
      title="Add Item"
      onSubmit={handleSubmit}
      loading={mutation.isPending}
    >
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            required
            variant="outlined"
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            name="description"
            label="Description"
            fullWidth
            required
            variant="outlined"
          />
        </Grid2>
      </Grid2>
    </FormDialog>
  )
}
