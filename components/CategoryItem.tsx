import { View, Image } from 'react-native';
import React from 'react';
import { CategoryType } from '@/types/category';
import { Text } from './ui/text';

type Props = {
    categoryItem: CategoryType;
    }

const CategoryItem = ({ categoryItem } : Props)  => {
  return (
    <View style={{ alignItems: 'center', width: '100%'}}>
        <Image 
            source={{ uri: categoryItem.image_url }}
            style={{ width: 145, height: 60, borderRadius: 10, marginBottom: 1, marginTop: 1 }}
            resizeMode='center'
            alt={categoryItem.name}
        />
      <Text 
        style={{ fontSize: 12, fontWeight: '500', color: '#000' }}
        numberOfLines={1}
        
      >
        {categoryItem.name}
        </Text>
    </View>
  )
};


export default CategoryItem