//Compoenent: @compoenent/DashboardSidebar
"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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
  Menu,
  MenuItem,
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
  LogoutRounded,
  AdbOutlined,
} from "@mui/icons-material"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"

const DRAWER_WIDTH = 240
const APPBAR_HEIGHT = 64

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user: authUser, logout } = useAuth()
  const open = Boolean(anchorEl)

  if (!authUser) return null

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleProfileClose = () => setAnchorEl(null)

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  const drawer = (
    <Box sx={{ height: "100%", bgcolor: "white", pt: 2 }}>
      <List sx={{ px: 1 }}>
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
                  "&:hover": { bgcolor: isActive ? "#7a8c79" : "#e8ede8" },
                  "& .MuiListItemIcon-root": { color: isActive ? "white" : "#5a6b59" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: "14px", fontWeight: isActive ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}

        <ListItem disablePadding sx={{ mt: 1 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              color: "#d32f2f",
              "&:hover": { bgcolor: "#ffebee" },
              "& .MuiListItemIcon-root": { color: "#d32f2f" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutRounded fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "14px" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          bgcolor: "#8b9d8a",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: APPBAR_HEIGHT, px: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ mt: 1 }}> {/* Add margin top */}
              <Image
                src="/seologo.png"
                alt="Dashboard Logo"
                width={200}
                height={40}
                style={{ objectFit: "contain" }}
              />
            </Box>

            <Image
              src="/menu.png"
              alt="Menu"
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
            />
          </Box>


          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 34,
                height: 34,
                p: 1,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <AdbOutlined />
            </IconButton>

            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 34,
                height: 34,
                p: 1,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 34,
                height: 34,
                p: 1,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <SettingsIcon />
            </IconButton>

            {/* Profile Dropdown */}
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer", ml: 1 }}
              onClick={handleProfileClick}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#6d7e6c", fontSize: "14px", mr: 1 }}>
                {authUser?.name?.[0] || "U"}
              </Avatar>
              <span style={{ color: "white", fontSize: "14px", fontWeight: 500, marginRight: 4 }}>
                {authUser?.name || "User"}
              </span>
              <ExpandMoreIcon sx={{ color: "white", fontSize: 20 }} />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH, border: "none", mt: `${APPBAR_HEIGHT}px` },
          }}
        >
          {drawer}
        </Drawer>

        {/* Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH, border: "none", mt: `${APPBAR_HEIGHT}px` },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
          pt: 3,
          pb: 3,
        }}
      >
        <Toolbar /> {/* push content below AppBar */}
        {children}
      </Box>
    </Box>
  )
}
