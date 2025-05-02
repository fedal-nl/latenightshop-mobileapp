import { StyleSheet, Text, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useQuery} from '@tanstack/react-query';
import ProductListItem from '@/components/ProductListItem';
import CategoryListItems from '@/components/CategoryListItems';
import { getProducts } from '@/api/products';
import { Box } from '@/components/ui/box';
import { ProductType } from '@/types/product';


const index = () => {
    const [ selectedCategory, setSelectedCategory ] = useState(null);
    const { width } = useWindowDimensions();
    const { data, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: 1000 * 60 * 5, // 5 minutes Time in ms before data is considered staled. During this time, React Query wonâ€™t refetch.
        gcTime: 1000 * 60 * 10, // 10 minutes Time in ms the data stays in cache after itâ€™s unused.
        refetchOnMount: false, // Prevents refetch when component remounts.
        refetchOnWindowFocus: false, // Prevents refetch when switching back to the tab.
        refetchOnReconnect: false, // Prevents refetch when internet reconnects.
    });

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error.message}</Text>;
    }

    if (!data) {
        return <Text>No products found</Text>;
    }

    // Filter products by selected category
    // if no category is selected or category id is 1, show all products
    const filteredProducts = !selectedCategory || selectedCategory === 1 ? data : 
        data.filter((product: ProductType) => product.category_id === selectedCategory); // filter products by selected category
    
    console.log("filtered products => ", filteredProducts);
    const numColumns = width > 700 ? 3 : 2; // on mobile screen with less than 700px width, show 2 columns, else show 3 columns
    return (
        <Box className="flex-1">
            <FlatList
                data={filteredProducts}
                key={numColumns} // change the key prop to force re-render
                numColumns={numColumns}
                contentContainerStyle={{ maxWidth: 960, marginHorizontal: "auto", width: "100%"}} //"gap-2 max-w-[960px] mx-auto w-full"
                columnWrapperStyle={{ gap: 5, justifyContent: 'space-between' }} // add gap between columns
                renderItem={({ item }) => <ProductListItem product={item} />}
                ListHeaderComponent={
                    <Box style={{ alignItems: 'center', width: '100%'}}>
                        <Box style={{maxWidth: 960, width: '100%'}}>
                            <CategoryListItems onSelectedCategory={setSelectedCategory} />
                        </Box>
                    </Box>
                }
                stickyHeaderIndices={[0]} // make the header sticky at index position 0 
                ListFooterComponentStyle={{ paddingBottom: 100 }} // add padding to the bottom of the list
            >
            </FlatList>
        </Box>
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