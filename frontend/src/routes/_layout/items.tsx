import { useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

import { ItemsService } from "../../client"
import AddItem from "../../components/Items/AddItem"
import { Content, Header, HeaderLayout, useDialog } from "@pautena/react-design-system"
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';

const columns:GridColDef[] =[{
  field:'id',
},{
  field:'title',
},{
  field:'description',
}]

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
  const {open,close,isOpen} = useDialog();
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

  return (
    <HeaderLayout>
      <Header title="Items Management" actions={[{id:"add","text":"Add Item", onClick:open}]}/>
      <Content>
        <DataGrid columns={columns} loading={isPending} paginationMode="server"
          rows={items?.data} rowCount={items?.count} pageSizeOptions={[PAGE_SIZE]}
          paginationModel={{page:page,pageSize:PAGE_SIZE}} onPaginationModelChange={handlePaginationModelChange}/>
        <AddItem isOpen={isOpen} onClose={close}/>
      </Content>
    </HeaderLayout>
  )
}
