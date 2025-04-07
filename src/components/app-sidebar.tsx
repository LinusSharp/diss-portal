"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Home, Settings, BarChart3, RefreshCw, User2 } from "lucide-react"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"

const venues = [
  { name: "Brew House", logo: Home, plan: "Swap Venue" },
  { name: "Coffee Corner", logo: Home, plan: "Swap Venue" },
  { name: "Green Bar", logo: Home, plan: "Swap Venue" },
]

export function AppSidebar() {
  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r"
    >
      <SidebarHeader>
        <TeamSwitcher teams={venues} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={[
            {
              title: "Dashboard",
              url: "/(app)",
              icon: Home,
              isActive: false,
              items: [],
            },
            {
              title: "Setup",
              url: "/(app)/setup",
              icon: Settings,
              items: [],
            },
            {
              title: "View Predictions",
              url: "/(app)/view",
              icon: BarChart3,
              items: [],
            },
          ]}
        />

        <SidebarGroup>
          <SidebarGroupLabel>Other Sections</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <RefreshCw className="mr-2" />
                    <span>Refresh Data</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <User2 className="mr-2" />
                <span>My Account</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
