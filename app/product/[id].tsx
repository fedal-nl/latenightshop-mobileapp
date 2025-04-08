import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router'
import { Card } from '../../components/ui/card';
import { Image } from '../../components/ui/image';
import { VStack } from '../../components/ui/vstack';
import { Heading } from '../../components/ui/heading';
import { Text } from '../../components/ui/text';
import { Button, ButtonText } from '../../components/ui/button';
import { Box } from '../../components/ui/box';
import { getProduct } from '../../api/products';
import { useQuery } from '@tanstack/react-query';


const ProductDetails = () => {
  const { id } = useLocalSearchParams();

  // Find the product by id
  // const productDetails = product.find((product) => product.id === Number(id));
  const {data, isLoading, error} = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(Number(id)),
  });
  console.log("product details found => ", data);
  
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
      return <Text>Error: {error.message}</Text>;
  }

  if (!data) {
    return <Text>Product not found</Text>
  }

  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3 mx-auto flex-1">
      <Stack.Screen options={{ title: data.name }} />
      <Image
      source={{
          uri: data.image,
      }}
      className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
      alt={`${data.name} image`}
      resizeMode='contain'
      />

      <Text className="text-sm font-normal mb-2 text-typography-700">
      {data.name}
      </Text>
      <VStack className="mb-6">
        <Heading size="md" className="mb-4">
        {/* using JSX interpolation */}
          {`$${data.price}`}
        </Heading>
        <Text size="sm">
          {data.description}
        </Text>
      </VStack>
      <Box className="flex-col sm:flex-row">
        <Button className="px-1 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1" >
          <ButtonText size="sm">Add to cart</ButtonText>
        </Button>
        <Button
          variant="outline"
          className="px-4 py-2 border-outline-300 sm:flex-1"
        >
          <ButtonText size="sm" className="text-typography-600">
          Wishlist
          </ButtonText>
        </Button>
      </Box>
  </Card>
  )
}

export default ProductDetails