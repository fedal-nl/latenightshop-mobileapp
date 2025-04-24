import { StyleSheet, Text, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native'
import React from 'react';
import { useQuery} from '@tanstack/react-query';
import ProductListItem from '@/components/ProductListItem';
import CategoryListItems from '@/components/CategoryListItems';
import { getProducts } from '@/api/products';
import { Box } from '@/components/ui/box';


const index = () => {
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

    const numColumns = width > 700 ? 3 : 2; // on mobile screen with less than 700px width, show 2 columns, else show 3 columns
    return (
        <Box className="flex-1">
            <CategoryListItems />
            <FlatList
                data={data}
                key={numColumns} // change the key prop to force re-render
                numColumns={numColumns}
                contentContainerStyle={{ maxWidth: 960, marginHorizontal: "auto", width: "100%"}} //"gap-2 max-w-[960px] mx-auto w-full"
                columnWrapperStyle={{ gap: 5 }}
                renderItem={({ item }) => <ProductListItem product={item} />}
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