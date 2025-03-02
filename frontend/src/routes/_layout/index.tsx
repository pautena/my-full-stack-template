import { createFileRoute } from "@tanstack/react-router"
import {Content, Label} from '@pautena/react-design-system'

import useAuth from "../../hooks/useAuth"
import { Grid2, Typography } from "@mui/material"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <Content>
      <Grid2 container>
        <Grid2 size={12}>
          <Typography variant="caption">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Typography>Welcome back, nice to see you again!</Typography>
        </Grid2>
      </Grid2>
    </Content>
  )
}
