import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { getCategories } from '@/api/categories';
import { useQuery } from '@tanstack/react-query';
import { CategoryType } from '@/types/category';
import CategoryItem from './CategoryItem';


export default function CategoryHeader({ onSelectedCategory }: any) {
  // This component fetches the categories from the API and displays them in a horizontal scroll view.
  // When a category is selected, it calls the onSelectedCategory function passed as a prop.
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data) {
    return <Text>No categories found</Text>;
  }
  // The data is an array of categories. Used ScrollView to display them horizontally. The scrollview is used because the data is a small
  // array of categories and we want to display them in a horizontal scroll view at once.
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={{ paddingHorizontal: 1, paddingLeft: 0, paddingRight: 0 }}
      
      style={{ paddingHorizontal: 0, marginTop: 1, marginBottom: 1 }}>
      <HStack>
        {data.map((category: CategoryType, index: number) => (
          <Pressable
            key={index}
            style={{ backgroundColor: '#fff', alignItems: 'center', width: 150, marginHorizontal: 0 }}
            onPress={() => {
              onSelectedCategory(category.id);
            }}
          >
            <CategoryItem categoryItem={category} />
          </Pressable>
        ))}
      </HStack>
    </ScrollView>
  );
}