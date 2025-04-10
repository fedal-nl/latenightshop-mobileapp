import React from "react";
import { Link, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon} from "../components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { Pressable, Platform } from "react-native";


/*
    Layout component that wraps the entire app
*/
export default function RootLayout() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <Stack screenOptions={{ headerRight: () => (
                    <Link href={'/cart'} asChild>
                        <Pressable style={ Platform.select({
                            ios: { marginRight: 5},
                            android: { marginRight: 5},
                            web: { marginRight: 16},
                            default: { marginRight: 16}
                            })}>
                            <Icon as={ShoppingCart} />
                        </Pressable>
                    </Link>
                ) }}>
                    <Stack.Screen name="index" options={{ title: "Products" }} />
                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
  );
}
