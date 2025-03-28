import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { z } from "zod"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Box, useTheme } from "@mui/material"
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid"
import {
  Content,
  Header,
  HeaderLayout,
  Label,
  useDialog,
} from "@pautena/react-design-system"
import { type UserPublic, UsersService } from "../../client"
import { AddUser } from "../../components/Admin/AddUser"
import { DeleteUser } from "../../components/Admin/DeleteUser"
import EditUser from "../../components/Admin/EditUser"

const usersSearchSchema = z.object({
  page: z.number().catch(1),
})

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  validateSearch: (search) => usersSearchSchema.parse(search),
})

const PAGE_SIZE = 5

function getUsersQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      UsersService.readUsers({ skip: page * PAGE_SIZE, limit: PAGE_SIZE }),
    queryKey: ["users", { page }],
  }
}

function Admin() {
  const { palette } = useTheme()
  const [selectedUser, setSelectedUser] = useState<UserPublic | null>(null)
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const { open: openAdd, close: closeAdd, isOpen: isOpenAdd } = useDialog()
  const { open: openEdit, close: closeEdit, isOpen: isOpenEdit } = useDialog()
  const {
    open: openDelete,
    close: closeDelete,
    isOpen: isOpenDelete,
  } = useDialog()

  const handlePaginationModelChange = (paginationModel: GridPaginationModel) =>
    navigate({ search: (prev) => ({ ...prev, page: paginationModel.page }) })

  const {
    data: users,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getUsersQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && users?.data.length === PAGE_SIZE

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getUsersQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  const columns: GridColDef<UserPublic>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "full_name",
      headerName: "Full Name",
      width: 200,
      renderCell: (params) => (
        <Box>
          {params.value}
          {currentUser?.id === params.row.id && (
            <Label text="You" sx={{ ml: 1 }} color={palette.secondary.main} />
          )}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "is_superuser",
      headerName: "Role",
      width: 150,
      renderCell: (params) => (params.value ? "Superuser" : "User"),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 70,
      renderCell: (params) => (
        <Label
          color={params.value ? palette.success.main : palette.error.main}
          text={params.value ? "Active" : "Inactive"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedUser(params.row)
            openEdit()
          }}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedUser(params.row)
            openDelete()
          }}
          showInMenu
        />,
      ],
    },
  ]

  return (
    <HeaderLayout
      title="Users Management"
      slotProps={{
        header: {
          actions: [{ id: "add", text: "Add user", onClick: openAdd }],
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={users?.data}
        loading={isPending}
        paginationMode="server"
        rowCount={users?.count}
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={{ page: page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={handlePaginationModelChange}
      />
      <AddUser isOpen={isOpenAdd} onClose={closeAdd} />
      {selectedUser && (
        <>
          <EditUser
            user={selectedUser}
            isOpen={isOpenEdit}
            onClose={closeEdit}
          />
          <DeleteUser
            user={selectedUser}
            isOpen={isOpenDelete}
            onClose={closeDelete}
          />
        </>
      )}
    </HeaderLayout>
  )
}
