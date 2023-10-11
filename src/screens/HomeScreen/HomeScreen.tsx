import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';


const API_URL =
  'https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=20&offset=';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [data, setData] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(API_URL + offset).then((response) => {
      setData((prevData) => [...prevData, ...response.data.results]);
      setLoading(false);
    });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setOffset(offset + 1);
    fetchData();
  };

  const handleSearch = (searchText: string) => {
    if (searchText) {
      // Filter data based on search text (you can customize the filter criteria)
      const filteredData = data.filter((item) => {
        return (
          item.title.includes(searchText) ||
          item.price.toString().includes(searchText) ||
          item.sellerFeeBasisPoints.toString().includes(searchText) ||
          item.content.includes(searchText)
        );
      });
      setData(filteredData);
    } else {
      // If the search text is empty, reset the data and offset
      setOffset(0);
      fetchData();
    }
  };

  const navigateToDetails = (item: any) => {
    navigation.navigate('Details', { item });
  };

  const renderListItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateToDetails(item)}
      >
        <Image source={{ uri: item.img }} style={styles.itemImage} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.mintAddr}-${index}`}
        renderItem={renderListItem}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#000" /> : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#3177a6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
   
  },
  itemImage: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 8
  },
});

export default HomeScreen;
