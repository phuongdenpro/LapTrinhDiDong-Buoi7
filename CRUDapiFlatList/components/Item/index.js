import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";
import { bookContext } from "../../App";
import { useContext } from "react";

const Item = () => {
  const book = useContext(bookContext); 
  // const { number } = props;
  // const { link } = props;
  const number = 2;
  const numberText = number < 10 ? `0${number}` : number;
  
  const itemBackground = number % 2 === 0 ? styles.even : styles.odd;
  
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <View style={[styles.square, itemBackground]}>
          <Text style={styles.number}>{numberText}</Text>
        </View>
        <View style={styles.image}>
          <Image style={styles.img} source={{uri: book.link}}></Image>
        </View>
        <Text style={styles.content}>{book.name}</Text>
        <TouchableOpacity>
          <View style={[styles.icon, {backgroundColor:"#21a3d0"}]}>
            <Text style={[styles.textIcon]}>sua</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity >
          <View style={styles.icon}>
            <Text style={styles.textIcon}>xoa</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Item;
