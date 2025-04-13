import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

import type { ItemPublic } from "@/client";
import { AddItem } from "@/features/items/components/AddItem";
import { DeleteItem } from "@/features/items/components/DeleteItem";
import { EditItem } from "@/features/items/components/EditItem";
import {
  readItemsQueryOptions,
  useReadItemsQuery,
} from "@/features/items/items.client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
  type GridPaginationModel,
} from "@mui/x-data-grid";
import { HeaderLayout, useDialog } from "@pautena/react-design-system";

const itemsSearchSchema = z.object({
  page: z.number().catch(0),
});

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
});

const PAGE_SIZE = 5;

function Items() {
  const { open: openAdd, close: closeAdd, isOpen: isOpenAdd } = useDialog();
  const [selectedItem, setSelectedItem] = useState<ItemPublic | null>(null);
  const { open: openEdit, close: closeEdit, isOpen: isOpenEdit } = useDialog();
  const {
    open: openDelete,
    close: closeDelete,
    isOpen: isOpenDelete,
  } = useDialog();

  const queryClient = useQueryClient();
  const { page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const handlePaginationModelChange = (paginationModel: GridPaginationModel) =>
    navigate({ search: (prev) => ({ ...prev, page: paginationModel.page }) });

  const {
    data: items,
    isPending,
    isPlaceholderData,
  } = useReadItemsQuery({
    page: page,
    pageSize: PAGE_SIZE,
  });

  const hasNextPage = !isPlaceholderData && items?.data.length === PAGE_SIZE;

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(
        readItemsQueryOptions({ page: page + 1, pageSize: PAGE_SIZE }),
      );
    }
  }, [page, queryClient, hasNextPage]);

  const columns: GridColDef<ItemPublic>[] = [
    {
      field: "id",
      width: 350,
    },
    {
      field: "title",
      width: 200,
    },
    {
      field: "description",
      width: 500,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => {
            setSelectedItem(params.row);
            openEdit();
          }}
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            setSelectedItem(params.row);
            openDelete();
          }}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <HeaderLayout
      title="Items Management"
      slotProps={{
        header: {
          actions: [{ id: "add", text: "Add Item", onClick: openAdd }],
        },
      }}
    >
      <DataGrid
        columns={columns}
        loading={isPending}
        paginationMode="server"
        rows={items?.data}
        rowCount={items?.count}
        pageSizeOptions={[PAGE_SIZE]}
        paginationModel={{ page: page, pageSize: PAGE_SIZE }}
        onPaginationModelChange={handlePaginationModelChange}
      />
      <AddItem isOpen={isOpenAdd} onClose={closeAdd} />
      {selectedItem && (
        <>
          <EditItem
            item={selectedItem}
            isOpen={isOpenEdit}
            onClose={closeEdit}
          />
          <DeleteItem
            item={selectedItem}
            isOpen={isOpenDelete}
            onClose={closeDelete}
          />
        </>
      )}
    </HeaderLayout>
  );
}
