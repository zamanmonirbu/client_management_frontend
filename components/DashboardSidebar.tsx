"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Badge,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Store as StoreIcon,
  PersonOutline as PersonOutlineIcon,
  Settings as SettingsIcon,
  Home as HomeIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material"
import Image from "next/image"

const DRAWER_WIDTH = 240

const menuItems = [
  { label: "Dashboard", icon: DashboardIcon, href: "/#" },
  { label: "Account Managers", icon: PeopleIcon, href: "/#" },
  { label: "Tasks", icon: AssignmentIcon, href: "/#" },
  { label: "Sales Team", icon: GroupIcon, href: "/#" },
  { label: "Vendors", icon: StoreIcon, href: "/#" },
  { label: "Clients", icon: PersonOutlineIcon, href: "/clients" },
  { label: "Settings", icon: SettingsIcon, href: "/settings" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "#f8f9f8" }}>
      {/* Logo */}
      {/* <Box
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          bgcolor: "#8b9d8a",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            px: 2,
            py: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              bgcolor: "#8b9d8a",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            R xx
          </Box>
          <Box>
            <Box sx={{ fontSize: "16px", fontWeight: "bold", color: "#2d3a2d", lineHeight: 1 }}>
              REAL<span style={{ color: "#8b9d8a" }}>SEO</span>
            </Box>
            <Box sx={{ fontSize: "8px", color: "#666", letterSpacing: "0.5px" }}>
              THE POWER BEHIND YOUR ONLINE PRESENCE
            </Box>
          </Box>
        </Box>
      </Box> */}

<div className="bg-[#8b9d8a] p-1 h-[90px]">
     <Image className="h-[50px] mt-5"  src="/seologo.png" alt="Dashboard Illustration" width={240} height={120} style={{ objectFit: "cover", width: "100%", marginBottom: 16 }} />
</div>

 

      {/* Menu Items */}
      <List sx={{ px: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          const Icon = item.icon

          return (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 1,
                  bgcolor: isActive ? "#8b9d8a" : "transparent",
                  color: isActive ? "white" : "#5a6b59",
                  "&:hover": {
                    bgcolor: isActive ? "#7a8c79" : "#e8ede8",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "white" : "#5a6b59",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: "#8b9d8a",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar className=" h-[90px]" sx={{ justifyContent: "space-between" }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>

          <Box sx={{ flex: 1 }} />

          {/* Right side icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" size="small">
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit" size="small">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" size="small">
              <SettingsIcon />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#6d7e6c",
                  fontSize: "14px",
                }}
              >
                DC
              </Avatar>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Box sx={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.2 }}>David K. Croxton</Box>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWER_WIDTH,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
