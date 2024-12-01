// SidebarContext.js
"use client";
import React, { createContext, useContext, useState } from 'react';

// Create a context for the sidebar
const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Create a custom hook to use the SidebarContext
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
