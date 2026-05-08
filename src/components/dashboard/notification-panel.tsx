"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bell, CheckCheck, AlertTriangle, FileText,
  Home, X,
} from "lucide-react"
import { toast } from "sonner"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "alert" | "offer" | "booking" | "system"
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "High-Risk Alert",
    description: "Candidate Sarah Johnson flagged as high backout risk (78%)",
    time: "2m ago",
    read: false,
    type: "alert",
  },
  {
    id: "2",
    title: "Offer Accepted",
    description: "Marcus Rivera accepted offer for Memorial Hospital",
    time: "15m ago",
    read: false,
    type: "offer",
  },
  {
    id: "3",
    title: "Booking Confirmed",
    description: "Housing booking #BK-2847 confirmed by Vendor",
    time: "1h ago",
    read: false,
    type: "booking",
  },
  {
    id: "4",
    title: "System Update",
    description: "AI model updated - Retention Risk predictions improved by 12%",
    time: "3h ago",
    read: true,
    type: "system",
  },
  {
    id: "5",
    title: "New Candidate",
    description: "Alex Morgan completed profile registration",
    time: "5h ago",
    read: true,
    type: "offer",
  },
]

const typeIcons = {
  alert: AlertTriangle,
  offer: FileText,
  booking: Home,
  system: Bell,
}

const typeColors = {
  alert: "text-orange-500 bg-orange-50",
  offer: "text-blue-500 bg-blue-50",
  booking: "text-purple-500 bg-purple-50",
  system: "text-slate-500 bg-slate-100",
}

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  return (
    <div className="w-[380px] rounded-xl border bg-white shadow-xl">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E63946] px-1.5 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={markAllRead}>
              <CheckCheck className="h-3.5 w-3.5 mr-1" />
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[340px]">
        <div className="divide-y">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type]
            const colorClass = typeColors[notification.type]

            return (
              <button
                key={notification.id}
                onClick={() => {
                  markAsRead(notification.id)
                  toast.info(`Opening: ${notification.title}`)
                }}
                className={cn(
                  "flex w-full gap-3 p-3.5 text-left transition-colors hover:bg-slate-50",
                  !notification.read && "bg-blue-50/30"
                )}
              >
                <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", colorClass)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm leading-snug", !notification.read ? "font-semibold" : "font-medium")}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0B3C5D]" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </button>
            )
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full h-8 text-xs text-[#0B3C5D] hover:text-[#0B3C5D]"
          onClick={() => toast.info("All notifications page coming soon")}
        >
          View all notifications
        </Button>
      </div>
    </div>
  )
}
