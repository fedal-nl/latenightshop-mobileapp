import { FlatList } from 'react-native'
import React from 'react'
import useStore from '../store/cartStore';
import { HStack } from '../components/ui/hstack';
import { VStack } from '../components/ui/vstack';
import { Text } from '../components/ui/text';
import { Button } from '../components/ui/button';

const CartScreen = () => {
    const cartItems = useStore((state: any) => state.cart);
    console.log("cart items => ", JSON.stringify(cartItems, null, 2));
    // const totalItems = cartItems.reduce((acc: number, item: any) => acc + item.quantity, 0);
    const totalItems = useStore((state: any) => state.getTotalItems());
    console.log("total items => ", totalItems);

    const emptyCart = useStore((state: any) => state.clearCart);

    const checkout = async () => {
        console.log("Checkout clicked");
        await emptyCart()
    }
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
                <Button onPress={checkout} className='ml-auto'>
                    <Text className='color-white font-roboto'>Checkout</Text>
                </Button>
            </HStack>
        )}
    />
  )
}

export default CartScreen