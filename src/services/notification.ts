// src/utils/notificationService.ts
import { NotificationAPI } from "../contexts/NotificationContext"; // Import the type

type NotificationArgs = {
  message: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
  duration?: number;
};

// Accept api as a parameter instead of using the hook inside
export const openNotification = (api: NotificationAPI, { message, description, type = "info", duration = 4.5 }: NotificationArgs) => {
  api[type]({
    message,
    description,
    duration,
  });
};
