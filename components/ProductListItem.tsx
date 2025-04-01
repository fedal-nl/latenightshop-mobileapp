import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from './ui/checkbox';



// Define the ProductListItem component
type Product = {
    name: string;
    id: number;
    description: string;
    price: number;
    image: string;
    }

const ProductListItem = ({ product }: { product: Product }) => {
  return (
    <View>
      <Text style={styles.text}>{product.name}</Text>
      <Checkbox size="md" isInvalid={false} isDisabled={false} value='0'>
        <CheckboxIndicator>
            <CheckboxLabel>{product.name}</CheckboxLabel>
        </CheckboxIndicator>
      </Checkbox>
    </View>
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