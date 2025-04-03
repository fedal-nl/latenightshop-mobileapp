import { StyleSheet, Text, FlatList, useWindowDimensions } from 'react-native'
import React from 'react';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';


const index = () => {
    const { width } = useWindowDimensions();
    const numColumns = width > 700 ? 3 : 2; // on mobile screen with less than 700px width, show 2 columns, else show 3 columns
    return (
        <FlatList
            data={products}
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