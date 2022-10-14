import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import styles from "./style";
import { useState } from "react";

const Form = (props) => {
  const [book, setBook] = useState('');
  const handleAddBook = ()=>{
    if(book.length === 0){
      alert("Bạn vui lòng nhập tên sách");
      return;
    }
    props.onAddBook(book);
    setBook('');
    Keyboard.dismiss();
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      KeyboardAvoidingView = {10}
      style={styles.addTask}
    >
      <TextInput style={styles.input} placeholder="Your name book"
        onChangeText={(text) =>setBook(text)} value ={book}
      ></TextInput>
      <TouchableOpacity onPress={handleAddBook}>
        <View style={styles.icon}>
          <Text style={styles.textIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default Form;
