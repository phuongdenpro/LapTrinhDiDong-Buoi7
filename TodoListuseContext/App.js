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
  TextInput,
  Image,
} from "react-native";
import Item from "./components/Item";
import styles from "./App.components.style";
import Form from "./components/Form";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const HomeScreen = ({ navigation }) => {
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
    })
      .then((res) => res.json())
      .then((resJson) => {
        getListBooks();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  // const handleUpdateBook = (name, id) => {
  //   let url = apiUrl + index;
  //   fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ item: name }),
  //   });
  // };

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
    let url = apiUrl + index;
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((resJson) => {
              getListBooks();
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>List Books Mockapi.io</Text>
        <StatusBar style="dark" />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={bookList}
            renderItem={({ item }) => (
              <Item
                navigation={navigation}
                key={bookList.indexOf(item)}
                id={item.id}
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
    </SafeAreaView>
  );
};
const UpdateForm = ({ navigation, route }) => {
  const id = route.params.id;
  const title = route.params.title;
  const link = route.params.link;
  const [name, setName] = React.useState("");

  return (
    <View style={[{ alignItems: "center", justifyContent: "center" }]}>
      <Text style={[{ color: "blue", fontSize: 25, fontWeight: "bold" }]}>
        Tên sách:
      </Text>
      <View
        style={[
          {
            borderColor: "green",
            borderWidth: 1,
            height: 50,
            width: 300,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          },
        ]}
      >
        <TextInput
          style={[
            {
              color: "red",
              fontSize: 20,
              fontWeight: "bold",
            },
          ]}
          onChangeText={(text) => setName(text)}
          placeholder="Name book"
        >
          {title}
        </TextInput>
      </View>
      <Text style={[{ color: "blue", fontSize: 25, fontWeight: "bold" }]}>
        Hình ảnh:
      </Text>
      <View
        style={[
          {
            marginTop: 20,
            borderWidth: 1,
            borderColor: "green",
            width: 300,
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Image
          style={[{ width: 60, height: 60 }]}
          source={{ uri: link }}
        ></Image>
        <Text style={[{ color: "blue", fontSize: 15, fontWeight: "bold" }]}>
          Link: {link}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[
            {
              marginTop: 10,
              borderWidth: 1,
              backgroundColor: "green",
              width: 100,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text>Cập nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              borderWidth: 1,
              backgroundColor: "yellow",
              width: 100,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text>Quay lại</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Update" component={UpdateForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
