import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { Drawer, DrawerAppBar, DrawerContent, DrawerLayout, LoadingArea } from "@pautena/react-design-system"
import { useGetSidebarNav } from "../app/sidebar"
import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react"
import AccountCircle from '@mui/icons-material/AccountCircle';

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
  const { isLoading,logout } = useAuth()
  const sidebarNav = useGetSidebarNav();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <DrawerLayout drawerProviderProps={{variant:"mini"}}>
      <Drawer>
        <DrawerContent nav={sidebarNav}/>
      </Drawer>
      <DrawerAppBar title="My Full Stack Template" >
        <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>

      </DrawerAppBar>
      {isLoading ? <LoadingArea/>:<Outlet/>}
    </DrawerLayout>
  )
}
