import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SearchBar: React.FC<{ onSearch: (text: string) => void }> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarContainer} >
        <TextInput
          style={styles.searchInput}
          placeholder="Type here to search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.text} >Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#3177a6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
    marginBottom: 10,
  },

  searchBarContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  searchInput: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#d3d3d3',
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#3177a6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: "#fff"
  }
});

export default SearchBar;
