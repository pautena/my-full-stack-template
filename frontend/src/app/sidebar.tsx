import { DrawerNavigation } from "@pautena/react-design-system";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useQueryClient } from "@tanstack/react-query";
import { UserPublic } from "../client";

export function useGetSidebarNav (): DrawerNavigation {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const items = [{
    id: "dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />,
    href: "/",
  },{
    id: "items",
    text: "Items",
    icon: <ListIcon />,
    href: "/items",
  },{
    id: "settings",
    text: "Settings",
    icon: <SettingsIcon />,
    href: "/settings",
  }];

  if(currentUser?.is_superuser){
    items.push({
      id: "admin",
      text: "Admin",
      icon: <AdminPanelSettingsIcon />,
      href: "/admin",
    })
  }

  return {
    items:[{
      items
    }]
  }
}
