"use client";

import { Ban, MoreHorizontal, UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateUserStatusByAdmin } from "../_actions/updateUserStatusByAdmin";
import { toast } from "sonner";

export type ActiveStatus = "ACTIVE" | "BANNED";

interface UserActionsProps {
  userId: string;
  activeStatus: ActiveStatus;
}

export default function UserActionsInAdminDashboard({
  userId,
  activeStatus,
}: UserActionsProps) {
  const handleStatusUpdate = async (status: ActiveStatus) => {
    try {
      const result = await updateUserStatusByAdmin(userId, status);
      if (result.success) {
        toast.success(`User status updated to ${status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user status");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {activeStatus !== "BANNED" && (
          <DropdownMenuItem onClick={() => handleStatusUpdate("BANNED")}>
            <Ban className="mr-2 h-4 w-4" />
            Ban
          </DropdownMenuItem>
        )}

        {activeStatus === "BANNED" && (
          <DropdownMenuItem onClick={() => handleStatusUpdate("ACTIVE")}>
            <UserCheck className="mr-2 h-4 w-4" />
            Unban
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
