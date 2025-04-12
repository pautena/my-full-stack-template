import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  Content,
  Header,
  HeaderLayout,
  type HeaderTab,
  TabPanel,
} from "@pautena/react-design-system";
import type { UserPublic } from "../../client";
import Appearance from "../../components/UserSettings/Appearance";
import ChangePassword from "../../components/UserSettings/ChangePassword";
import DeleteAccount from "../../components/UserSettings/DeleteAccount";
import UserInformation from "../../components/UserSettings/UserInformation";

const tabsConfig: HeaderTab[] = [
  { id: "profile", label: "My profile" },
  { id: "password", label: "Password" },
  { id: "appearance", label: "Appearance" },
  { id: "danger-zone", label: "Danger zone" },
];

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
});

function UserSettings() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"]);
  const finalTabs = currentUser?.is_superuser
    ? tabsConfig.slice(0, 3)
    : tabsConfig;

  return (
    <HeaderLayout
      title="User Setttings"
      slotProps={{
        header: {
          tabs: finalTabs,
          tabsMode: "panel",
        },
      }}
    >
      <TabPanel index={0}>
        <UserInformation />
      </TabPanel>
      <TabPanel index={1}>
        <ChangePassword />
      </TabPanel>
      <TabPanel index={2}>
        <Appearance />
      </TabPanel>
      <TabPanel index={3}>
        <DeleteAccount />
      </TabPanel>
    </HeaderLayout>
  );
}
