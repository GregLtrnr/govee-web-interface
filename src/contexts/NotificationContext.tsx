// src/context/NotificationContext.tsx
import React, { createContext, useContext } from "react";
import { notification } from "antd";

// Infer the type of the notification API from useNotification()
export type NotificationAPI = ReturnType<typeof notification.useNotification>[0];

// Create the context
const NotificationContext = createContext<NotificationAPI | null>(null);

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

// NotificationProvider component
export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
