import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { z } from "zod"

import { ItemPublic, ItemsService } from "../../client"
import {AddItem} from "../../components/Items/AddItem"
import { Content, Header, HeaderLayout, useDialog } from "@pautena/react-design-system"
import { DataGrid, GridActionsCellItem, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EditItem } from "../../components/Items/EditItem"
import { DeleteItem } from "../../components/Items/DeleteItem"

const itemsSearchSchema = z.object({
  page: z.number().catch(0),
})

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

const PAGE_SIZE = 5

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: page * PAGE_SIZE, limit: PAGE_SIZE }),
    queryKey: ["items", { page }],
  }
}


function Items() {
  const {open: openAdd,close: closeAdd,isOpen: isOpenAdd} = useDialog();
  const [selectedItem,setSelectedItem] = useState<ItemPublic|null>(null);
  const {open: openEdit,close: closeEdit,isOpen: isOpenEdit} = useDialog();
  const {open: openDelete,close: closeDelete,isOpen: isOpenDelete} = useDialog();

  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const handlePaginationModelChange = (paginationModel:GridPaginationModel) =>
    navigate({ search: (prev) => ({ ...prev, page:paginationModel.page }) })

  const {
    data: items,
    isPending,
    isPlaceholderData,
  } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const hasNextPage = !isPlaceholderData && items?.data.length === PAGE_SIZE

  useEffect(() => {
    if (hasNextPage) {
      queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 }))
    }
  }, [page, queryClient, hasNextPage])

  const columns:GridColDef<ItemPublic>[] =[{
    field:'id',
    width:350,
  },{
    field:'title',
    width:200,
  },{
    field:'description',
    width:500
  },{
    field:'actions',
    type:'actions',
    getActions:(params)=>[
      <GridActionsCellItem icon={<EditIcon/>} label="Edit" onClick={()=>{
        setSelectedItem(params.row);
        openEdit();
      }} showInMenu/>,
      <GridActionsCellItem icon={<DeleteIcon/>} label="Delete" onClick={()=>{
        setSelectedItem(params.row);
        openDelete();
      }} showInMenu/>,
    ],
  }]

  return (
    <HeaderLayout>
      <Header title="Items Management" actions={[{id:"add","text":"Add Item", onClick:openAdd}]}/>
      <Content>
        <DataGrid columns={columns} loading={isPending} paginationMode="server"
          rows={items?.data} rowCount={items?.count} pageSizeOptions={[PAGE_SIZE]}
          paginationModel={{page:page,pageSize:PAGE_SIZE}} onPaginationModelChange={handlePaginationModelChange}/>
        <AddItem isOpen={isOpenAdd} onClose={closeAdd}/>
        {selectedItem && (
          <>
            <EditItem item={selectedItem} isOpen={isOpenEdit} onClose={closeEdit}/>
            <DeleteItem item={selectedItem} isOpen={isOpenDelete} onClose={closeDelete}/>
          </>
        )}
      </Content>
    </HeaderLayout>
  )
}
