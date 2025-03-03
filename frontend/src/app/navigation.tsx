import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import { Navigation } from "@toolpad/core/AppProvider";

export function useGetNavigation (): Navigation {


  return [{
    title: 'Dashboard',
    icon: <DashboardIcon/>,
    kind: 'page',
    segment:'',
  },{
    title: 'Items',
    icon: <ListIcon/>,
    kind: 'page',
    segment:'items',
  }]
}
