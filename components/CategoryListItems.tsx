import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';


const categories = ['Pizza', 'Burgers', 'Drinks', 'Desserts', 'Salads', 'Pasta'];

export default function CategoryHeader() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 12 }}>
      <HStack space="md">
        {categories.map((category, index) => (
          <Pressable
            key={index}
            style={{ borderRadius: 8, backgroundColor: '#f0f0f0', paddingHorizontal: 12, paddingVertical: 8 }}
            onPress={() => {
              console.log(`Selected: ${category}`);
            }}
          >
            <Text>{category}</Text>
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
}