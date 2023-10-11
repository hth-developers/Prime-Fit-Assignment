import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailsScreen: React.FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer} >
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center', width: '100%' }} >
          <Image source={{ uri: item.img }} style={styles.image} />
          <Text style={styles.price}>Price: ${item.price}</Text>
          <Text style={styles.sellerFee}>Seller Fee: {item.sellerFeeBasisPoints}</Text>
          <Text style={styles.sellerFee}>Mint Addr: {item.mintAddress}</Text>
          <Text style={styles.content}>Content {item.content}</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.text}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    shadowColor: '#3177a6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    color: '#3177a6',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  sellerFee: {
    fontSize: 18,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginVertical: 26
  },
  backButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3177a6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  text: {
    color: "#fff"
  }
});

export default DetailsScreen;
