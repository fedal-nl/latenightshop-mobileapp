import React from "react";
import { Link, Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon} from "../components/ui/icon";
import { Text } from "../components/ui/text";
import { ShoppingCart } from "lucide-react-native";
import { Pressable, Platform, View } from "react-native";
import useStore from "../store/cartStore";

/*
    Layout component that wraps the entire app
*/
export default function RootLayout() {
    const queryClient = new QueryClient();
    const totalItems = useStore((state: any) => state.getTotalItems());

    return (
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider>
                <Stack screenOptions={{ headerRight: () => (
                    <Link href={'/cart'} asChild>
                        <Pressable style={ Platform.select({
                            ios: { marginRight: 5},
                            android: { marginRight: 5},
                            web: { marginRight: 16},
                            default: { marginRight: 16}
                            })}>
                            <View style={{ flex: 2, flexDirection: 'row', gap: 10, alignContent: 'space-evenly' }}>
                                <Icon as={ShoppingCart} size="md" />
                                {totalItems > 0 && (
                                    <Text className=" bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                        {totalItems}
                                    </Text>
                                )}
                            </View>
                        </Pressable>
                    </Link>
                    ),
                    headerLeft: () => (
                        <Link href={'/login'} asChild>
                            <Pressable style={ Platform.select({
                                ios: { marginRight: 5},
                                android: { marginRight: 5},
                                web: { marginRight: 16},
                                default: { marginRight: 16}
                                })}>
                                    <Text className=" bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                        Login
                                    </Text>
                            </Pressable>
                        </Link>
                ) }}>
                    <Stack.Screen name="index" options={{ title: "Products" }} />
                    <Stack.Screen name="(auth)/login" options={{ title: "Login" }} />
                    <Stack.Screen name="cart" options={{ title: "Cart" }} />
                    <Stack.Screen name="product/[id]" options={{ title: "Product Details" }} />
                </Stack>
            </GluestackUIProvider>
        </QueryClientProvider>
  );
}
