"use client"

import Link from "next/link"
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
              url: "/dashboard",
              icon: Home,
              isActive: false,
              items: [],
            },
            {
              title: "Setup",
              url: "/setup",
              icon: Settings,
              items: [],
            },
            {
              title: "Historical Predictions",
              url: "/view",
              icon: BarChart3,
              items: [],
            },
          ]}
        />
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <User2 className="mr-2" />
                <span>Log out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
