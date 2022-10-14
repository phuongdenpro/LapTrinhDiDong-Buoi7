import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Task from "./components/Task";
import styles from "./App.components.style";
import Form from "./components/Form";

const App = () => {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = "https://634812e00484786c6e91130b.mockapi.io/api/books/";

  const handleAddBook = (name) => {
    const linkImg = "https://via.placeholder.com/180";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: name, link: linkImg }),
    });
  };
  const handleUpdateBook = (name, id) =>{
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: name }),
    });
  }

  const getListBooks = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        setBookList(resJson);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getListBooks();
    return () => {};
  }, []);

  const handleDeleteBook = (index) => {
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          fetch(
            apiUrl + index,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>List Books Mockapi.io</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={bookList}
            renderItem={({ item }) => (
              <Task
              key={bookList.indexOf(item)}
              title={item.item}
              link={item.link}
              number={bookList.indexOf(item) + 1}
              onDeleteBook={() => handleDeleteBook(item.id)}
              />
            )}
          />
        )}
      </View>
      <Form onAddBook={handleAddBook} />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
