import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { Content, Drawer, DrawerAppBar, DrawerContent, DrawerLayout, DrawerNavigation, DrawerNavigationItem, DrawerNavigationItemLink, LoadingArea } from "@pautena/react-design-system"
import { useGetSidebarNav } from "../app/sidebar"


export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  const { isLoading } = useAuth()
  const sidebarNav = useGetSidebarNav();

  return (
    <DrawerLayout drawerProviderProps={{variant:"mini"}}>
      <Drawer>
        <DrawerContent nav={sidebarNav}/>
      </Drawer>
      <DrawerAppBar title="My Full Stack Template" />
      <Content>
        {isLoading ? (
          <LoadingArea/>
        ):<Outlet/>}
      </Content>
    </DrawerLayout>
  )
}
