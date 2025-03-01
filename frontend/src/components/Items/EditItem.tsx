import { useMutation, useQueryClient } from "@tanstack/react-query"

import { type ApiError, type ItemCreate, ItemPublic, ItemsService, ItemUpdate } from "../../client"
import { FormDialog, TextField, useNotificationCenter } from "@pautena/react-design-system"
import { Grid2 } from "@mui/material"

interface EditItemProps {
  isOpen: boolean
  item: ItemPublic;
  onClose: () => void
}

export const EditItem = ({ isOpen,item, onClose }: EditItemProps) => {
  const queryClient = useQueryClient()
  const {show} = useNotificationCenter();

  const mutation = useMutation({
    mutationFn: (data: ItemUpdate) =>
      ItemsService.updateItem({ id: item.id, requestBody: data }),
    onSuccess: () => {
      show({
        severity:"success",
        message:"Item updated",
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

  const handleSubmit = (data:any) => mutation.mutate(data)

  return (<FormDialog open={isOpen} onCancel={onClose} title="Edit Item" onSubmit={handleSubmit} loading={mutation.isPending}>
    <Grid2 container spacing={2}>
          <Grid2 size={12}>
            <TextField name="title" label="Title" fullWidth required variant="outlined" defaultValue={item.title} />
          </Grid2>
          <Grid2 size={12}>
            <TextField name="description" label="Description" fullWidth required variant="outlined" defaultValue={item.description} />
          </Grid2>
        </Grid2>
  </FormDialog>)
}
