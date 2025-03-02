import { DrawerNavigation } from "@pautena/react-design-system";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';

export function useGetSidebarNav (): DrawerNavigation {
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
  }];

  return {
    items:[{
      items
    }]
  }
}
