import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

import type { UserPublic } from "../../client"
import Appearance from "../../components/UserSettings/Appearance"
import ChangePassword from "../../components/UserSettings/ChangePassword"
import DeleteAccount from "../../components/UserSettings/DeleteAccount"
import UserInformation from "../../components/UserSettings/UserInformation"
import { Content, Header, HeaderLayout, HeaderTab,TabPanel } from "@pautena/react-design-system"

const tabsConfig:HeaderTab[] = [
  { id:'profile', label: "My profile" },
  { id:'password', label: "Password" },
  { id:'appearance', label: "Appearance" },
  { id:'danger-zone', label: "Danger zone"},
]

export const Route = createFileRoute("/_layout/settings")({
  component: UserSettings,
})

function UserSettings() {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const finalTabs = tabsConfig//currentUser?.is_superuser
    // ? tabsConfig.slice(0, 3)
    // : tabsConfig

  return (
    <HeaderLayout>
      <Header title="User Settings" tabs={finalTabs}/>
      <Content>
        <TabPanel index={0}>
          <UserInformation/>
        </TabPanel>
        <TabPanel index={1}>
          <ChangePassword/>
        </TabPanel>
        <TabPanel index={2}>
          <Appearance/>
        </TabPanel>
        <TabPanel index={3}>
          <DeleteAccount/>
        </TabPanel>
      </Content>
    </HeaderLayout>
  )
}
