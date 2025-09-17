import { useState, useMemo } from 'react';

export const useProductSearch = (products) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    let items = products;

    if (selectedCategory && selectedCategory !== 'All') {
      items = items.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      items = items.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  }, [products, searchTerm, selectedCategory]);

  return {
    filteredProducts,
    setSearchTerm,
    setSelectedCategory,
    selectedCategory,
    searchTerm,
  };
};