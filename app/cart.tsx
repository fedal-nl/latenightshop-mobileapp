import { FlatList, Pressable, Platform } from 'react-native'
import React from 'react';
import { Link } from 'expo-router';
import useStore from '../store/cartStore';
import { HStack } from '../components/ui/hstack';
import { VStack } from '../components/ui/vstack';
import { Text } from '../components/ui/text';
import { Button, ButtonText } from '../components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { useAuth } from '@/store/authStore';


const CartScreen = () => {
    const cartItems = useStore((state: any) => state.cart);
    console.log("cart items => ", JSON.stringify(cartItems, null, 2));
    const totalItems = useStore((state: any) => state.getTotalItems());
    console.log("total items => ", totalItems);

    const emptyCart = useStore((state: any) => state.clearCart);
    const isLoggedIn = useAuth((state: any) => state.isLoggedIn);

    const handleCheckout = async () => {
        console.log("Checkout clicked");
        if (!isLoggedIn) {
            console.log("User is not logged in");
            return;
        }
        createOrderMutation.mutate(cartItems);
    }

    const createOrderMutation = useMutation({
        mutationFn: (items: any) => {
            /**
             * Construct the items array to match the API requirements.
             * the current items array is like this:
             * [
                {
                    "product": {
                    "id": 22,
                    "name": "Italiaanse pizza",
                    "description": "Pizza Margherita,",
                    "image": "https://Italy-Pizza.jpg",
                    "price": 12.11
                    },
                    "quantity": 1
                },
                {
                    "product": {
                    "id": 22,
                    "name": "Italiaanse pizza",
                    "description": "Pizza Margherita",
                    "image": "https://Pizza.jpg",
                    "price": 12.11
                    },
                    "quantity": 1
                }
                ]
            * has to be like this:
            * [
                {
                    "productId": 22,
                    "quantity": 1,
                    "price": 12.11
                },
                {
                    "productId": 22,
                    "quantity": 1,
                    "price": 12.11
                }
                ]
            */
            const constructedItems = items.map((item: any) => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.price,
            }));
            console.log("Creating order with items: ", constructedItems);
            return createOrder(constructedItems)
        },
        onSuccess: (data) => {
            console.log("Order created successfully: ", data);
            emptyCart();
            // Handle successful order creation
        },
        onError: (error: any) => {
            console.log("Error creating order: ", error);
            // Handle error
        },
    });

  return (
    <FlatList 
        data={cartItems}
        contentContainerStyle={{ gap: 2, maxWidth:960, width: '100%', marginHorizontal: 'auto'}}
        renderItem={({ item }) => (
            <HStack className='bg-white p-3'>
                <VStack space='sm'>
                    <Text>{item.product.name}</Text>
                    <Text>{item.product.price}</Text>
                </VStack>
                <Text className='ml-auto'>Quantity: {item.quantity}</Text>
            </HStack>
        )}
        ListHeaderComponent={() => (
            <Text className='ml-auto'>Total Items: {totalItems}</Text>
        )}
        ListEmptyComponent={() => (
            <Text>Your cart is empty</Text>
        )}
        ListFooterComponent={() => (
            <HStack className='bg-white p-3'>
                <Text className='ml-auto'>{`Total: ${cartItems.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0)}`}</Text>
                <Button onPress={handleCheckout} className='ml-auto'>
                    <Text className='color-white font-roboto'>Checkout</Text>
                </Button>
                {!isLoggedIn ? (
                        <Link href={'/login'} asChild>
                            <Button
            className="flex-1"
            onPress={() => {
                console.log("Register button pressed")
            }}
            >
            <ButtonText className="text-typography-0">Login</ButtonText>
            </Button>        
                        </Link>
                ) : null }
            </HStack>
        )}
    />
  )
}

export default CartScreen