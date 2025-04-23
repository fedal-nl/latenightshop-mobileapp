import React from 'react'
import { StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Card } from './ui/card';
import { Image } from './ui/image';
import { VStack } from './ui/vstack';
import { Heading } from './ui/heading';
import { Text } from './ui/text';
import { Button, ButtonText } from './ui/button';
import { Box } from './ui/box';
import useStore from '@/store/cartStore';


// Define the ProductListItem component
type Product = {
    name: string;
    id: number;
    description: string;
    price: number;
    image: string;
    }

const ProductListItem = ({ product }: { product: Product }) => {
    // Get the addToCart function from the store and use it to the add the items from the product list
    const addItem = useStore((state: any) => state.addToCart);
    const handleAddToCart = (productItem: Product) => {
        addItem(productItem);
    }

    return (
              <Card className="p-5 rounded-lg flex-1">      
                <Link href={`/product/${product.id}`} asChild>
                  <Pressable style={{ flex: 1}}>
                    <Image
                    source={{
                        uri: product.image,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt={`${product.name} image`}
                    resizeMode='contain'
                    />
              
                    <Text className="text-sm font-normal mb-2 text-typography-700">
                    {product.name}
                    </Text>
                </Pressable>
              </Link>

                <VStack className="mb-6">
                <Heading size="md" className="mb-4">
                {/* using JSX interpolation */}
                {`$${product.price}`}
                </Heading>
                </VStack>
                <Box className="flex-col sm:flex-row">
                    <Button 
                      className="px-1 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" 
                      onPress={() => handleAddToCart(product)}
                      
                    >
                        <ButtonText size="sm">Add to cart</ButtonText>
                    </Button>
                </Box>
            </Card>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: 'blue',
  },
})

export default ProductListItem