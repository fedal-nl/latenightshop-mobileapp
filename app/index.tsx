import { StyleSheet, Text, FlatList } from 'react-native'
import React from 'react';
import products from '../assets/products.json';
import ProductListItem from '../components/ProductListItem';


const index = () => {
  return (
    <FlatList
        data={products}
        numColumns={2}
        contentContainerStyle={{gap: 10}}
        
        renderItem={({item}) => (
            ProductListItem({product: item})
        )}
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