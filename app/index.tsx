import { StyleSheet, Text, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native'
import React from 'react';
import { useQuery} from '@tanstack/react-query';
import ProductListItem from '../components/ProductListItem';
import { getProducts } from '../api/products';


const index = () => {
    const { width } = useWindowDimensions();
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    const numColumns = width > 700 ? 3 : 2; // on mobile screen with less than 700px width, show 2 columns, else show 3 columns
    return (
        <FlatList
            data={data}
            key={numColumns} // change the key prop to force re-render
            numColumns={numColumns}
            contentContainerStyle={{ maxWidth: 960, marginHorizontal: "auto", width: "100%"}} //"gap-2 max-w-[960px] mx-auto w-full"
            columnWrapperStyle={{ gap: 5 }}
            renderItem={({ item }) => <ProductListItem product={item} />}
        >
        </FlatList>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default index