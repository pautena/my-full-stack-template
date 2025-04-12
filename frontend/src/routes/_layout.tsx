import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import {
  Drawer,
  DrawerAppBar,
  DrawerContent,
  DrawerLayout,
  LoadingArea,
} from "@pautena/react-design-system";
import { useQueryClient } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createFileRoute,
  redirect,
} from "@tanstack/react-router";
import { useState } from "react";
import { useGetSidebarNav } from "../app/sidebar";
import type { UserPublic } from "../client";
import useAuth, { isLoggedIn } from "../hooks/useAuth";

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function Layout() {
  const { isLoading, logout } = useAuth();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
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

  const drawerAppBarContent = (
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
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} href="/settings" onClick={handleClose}>
          Settings
        </MenuItem>
        {currentUser?.is_superuser && (
          <MenuItem component={Link} href="/admin" onClick={handleClose}>
            Administration
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <DrawerLayout
      variant="mini"
      navigation={sidebarNav}
      title="My Full Stack Template"
      slotsProps={{
        drawerAppBar: {
          children: drawerAppBarContent,
        },
      }}
    >
      {isLoading ? <LoadingArea /> : <Outlet />}
    </DrawerLayout>
  );
}
