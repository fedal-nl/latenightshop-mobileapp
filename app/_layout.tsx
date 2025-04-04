import React from "react";
import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";


/*
    Layout component that wraps the entire app
*/
export default function RootLayout() {
  return (
        <GluestackUIProvider mode="light">
            <Stack>
                <Stack.Screen name="index" options={{ title: "Products" }} />
            </Stack>
        </GluestackUIProvider>
  );
}
