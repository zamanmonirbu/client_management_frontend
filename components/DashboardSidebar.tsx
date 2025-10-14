// Component: @component/DashboardSidebar
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
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          bgcolor: "#8b9d8a",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: APPBAR_HEIGHT,
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Left Section (Logo + Menu) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Logo - Always visible */}
            <Box sx={{ display: { xs: "flex", sm: "flex" }, alignItems: "center" }}>
              <Image
                src="/seologo.png"
                alt="Dashboard Logo"
                width={205}
                height={53.33}
                style={{
                  objectFit: "contain",
                  display: "block",
                  maxWidth: "100%",
                  marginTop: 6,
                }}
              />
            </Box>

            {/* Menu Icon - Always visible with responsive size */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "flex", sm: "flex" },
                color: "#FFFFFF",
                width: { xs: 34, sm: 48 },
                height: { xs: 34, sm: 48 },
                "&:hover": { bgcolor: "#3b4336" },
                ml: { xs: 0.5, sm: 1 }, // Adjusted margin-left for spacing
              }}
            >
              <Image
                src="/menu.png"
                alt="Menu"
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
            </IconButton>
          </Box>

          {/* Right Section (Icons + Profile) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
            }}
          >
            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <AdbOutlined fontSize="small" />
            </IconButton>

            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              size="small"
              sx={{
                bgcolor: "#4D5746",
                color: "#FFFFFF",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#3b4336" },
              }}
            >
              <SettingsIcon fontSize="small" />
            </IconButton>

            {/* Profile Dropdown */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ml: 0.5,
              }}
              onClick={handleProfileClick}
            >
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "#6d7e6c",
                  fontSize: "13px",
                  mr: 0.5,
                }}
              >
                {authUser?.name?.[0] || "U"}
              </Avatar>
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 500,
                  mr: 0.5,
                }}
              >
                {authUser?.name || "User"}
              </Box>
              <ExpandMoreIcon sx={{ color: "white", fontSize: 18 }} />
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
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}