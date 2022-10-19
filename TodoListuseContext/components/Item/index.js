import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./style";

const Item = (props) => {
  const { number, navigation } = props;
  const { link } = props;
  const numberText = number < 10 ? `0${number}` : number;
  const itemBackground = number % 2 === 0 ? styles.even : styles.odd;
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <View style={[styles.square, itemBackground]}>
          <Text style={styles.number}>{numberText}</Text>
        </View>
        <View style={styles.image}>
          <Image style={styles.img} source={{uri: link}}></Image>
        </View>
        <Text style={styles.content}>{props.title}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Update",{id:props.id,title: props.title, link: props.link})}>
          <View style={[styles.icon, {backgroundColor:"#21a3d0"}]}>
            <Text style={[styles.textIcon]}>sửa</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.onDeleteBook}>
          <View style={[styles.icon, {backgroundColor:"#FF0000"}]}>
            <Text style={styles.textIcon}>xóa</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Item;