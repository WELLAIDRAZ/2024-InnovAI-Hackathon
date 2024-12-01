"use client";

import * as React from "react";
import { Bell, CheckCircle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTimestamp, getNotificationAPI } from "@/utils/constants";
import { useRouter } from "next/navigation";

export function NotificationToggle() {
    const [loading, setLoading] = React.useState(false);
    const router=useRouter()
    const [data, setData] = React.useState([]);
    const [hasUnread, setHasUnread] = React.useState(false); // State to track unread notifications

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(getNotificationAPI, { cache: "no-store" });

            if (!response.ok) {
                throw new Error("Failed to fetch notifications");
            }

            const result = await response.json();

            // Transform the data into the desired structure
            const simplifiedNotifications = result.notifications.map((notification: any) => ({
                id: notification._id,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                isRead: notification.isRead,
                createdAt: formatTimestamp(notification.createdAt),
            }));

            setData(simplifiedNotifications);

            // Check if there are any unread notifications
            const unreadExists = simplifiedNotifications.some((notification) => !notification.isRead);
            setHasUnread(unreadExists);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const markAllAsRead = async () => {
        try {
            // Iterate over the notifications and call the updateStatus function for each
            const markAllRequests = data.map((notification) =>
                updateStatus(notification.id)
            );
            await Promise.all(markAllRequests); // Wait for all requests to complete

            // Update the state to reflect that all notifications are read
            setData((prevData) =>
                prevData.map((notification) => ({ ...notification, isRead: true }))
            );
            setHasUnread(false); // Since all are read, set unread flag to false
        } catch (error) {
            console.log("Error marking all as read:", error);
        }
    };

    const updateStatus = async (notificationId) => {
        try {
            // Make API call to update notification status
            const updateResult = await fetch(`/api/notification/updateNotificationRoute/${notificationId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ isRead: true }),
            });

            if (updateResult.ok) {
                // Update the specific notification's isRead status in the state
                setData((prevData) =>
                    prevData.map((notification) =>
                        notification.id === notificationId
                            ? { ...notification, isRead: true } // Update isRead to true
                            : notification
                    )
                );

                // Recalculate if there are unread notifications after marking as read
                const unreadExists = data.some((notification) => !notification.isRead && notification.id !== notificationId);
                setHasUnread(unreadExists);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-[1.2rem] w-[1.2rem]" />
                    {hasUnread && (
                        <div className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></div>
                    )}
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div  className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                        <Bell className="ml-2 h-[1rem] w-[1rem] hover:text-primary cursor-pointer" />
                        <DropdownMenuLabel className="hover:text-primary cursor-pointer">
                            Notifications
                        </DropdownMenuLabel>
                        <Button
                            onClick={() => markAllAsRead()}
                            variant="ghost"
                            size="sm"
                            disabled={data.every((notification) => notification.isRead)} // Disable if all are already read
                        >
                            <CheckCircle className="mr-2 h-[1rem] w-[1rem]" />
                            Mark All as Read
                        </Button>
                    </div>
                    <div className="justify-end items-center gap-2">
                        <Button
                            onClick={() => fetchData()}
                            variant="ghost"
                            size="sm"
                            disabled={loading}
                        >
                            <RefreshCcw
                                className={`h-[1rem] w-[1rem] justify-center hover:text-primary cursor-pointer ${loading ? "animate-spin" : ""
                                    }`}
                            />
                        </Button>
                    </div>
                </div>
                <DropdownMenuSeparator />

                {loading ? (
                    <DropdownMenuItem>
                        <div className="text-center w-full">Loading...</div>
                    </DropdownMenuItem>
                ) : data.length > 0 ? (
                    data.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex justify-between items-center space-y-1">
                            <div onClick={()=>{router.push("/orders/555f25eed24242e29036b71c"),notification.isRead=true}} className="flex-col justify-between items-start space-y-1">
                                <div
                                    className={`font-bold transition-all duration-1000 ${notification.type === "info" ? "text-primary" : "text-red-700"
                                        }`}
                                >
                                    {notification.title}
                                </div>
                                <div className="text-sm text-secondary-foreground">{notification.message}</div>
                                <div className="text-xs text-gray-500">{notification.createdAt}</div>
                            </div>
                            <div className="flex flex-col justify-end items-end gap-2">
                                <div
                                    className={`${notification.isRead === true
                                        ? "hidden"
                                        : "h-2 w-2 bg-red-600 rounded-full items-start"
                                        }`}
                                ></div>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent dropdown from closing
                                        updateStatus(notification.id);
                                    }}
                                    variant="outline"
                                    size="sm"
                                    disabled={notification.isRead} // Disable button if notification is already read
                                >
                                    {notification.isRead ? (
                                        <>
                                            <CheckCircle className="mr-2 h-[1rem] w-[1rem]" /> Read
                                        </>
                                    ) : (
                                        "Mark as Read"
                                    )} {/* Show icon and "Read" when marked as read */}
                                </Button>
                            </div>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <DropdownMenuItem>
                        <div className="text-center w-full">No notifications</div>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
