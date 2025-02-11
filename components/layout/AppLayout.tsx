"use client";

import { persistor, store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";

const AppLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = new QueryClient();

  // State to track if the app is running in the browser
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after the component mounts (browser environment)
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {/* Only render PersistGate in the browser */}
      {isClient ? (
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
              <ToastContainer
                theme="dark"
                autoClose={3000}
                position="top-right"
                hideProgressBar
              />
              <Navbar />
              {children}
            </HeroUIProvider>
          </QueryClientProvider>
        </PersistGate>
      ) : (
        // Fallback UI for SSR
        <QueryClientProvider client={queryClient}>
          <HeroUIProvider>
            <ToastContainer
              theme="dark"
              autoClose={3000}
              position="top-right"
              hideProgressBar
            />
            {children}
          </HeroUIProvider>
        </QueryClientProvider>
      )}
    </Provider>
  );
};

export default AppLayout;
