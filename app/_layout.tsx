import React from "react";
import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


/*
    Layout component that wraps the entire app
*/
export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <Stack>
                    <Stack.Screen name="index" options={{ title: "Products" }} />
                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
  );
}
