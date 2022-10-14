import { StyleSheet } from "react-native";
import color from "../../contains/color";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  square: {
    width: 48,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  even: {
    backgroundColor: "#55f253",
  },
  odd: {
    backgroundColor: "#53d6f2",
  },
  number: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  content: {
    width: "40%",
    fontSize: 18,
    fontWeight: "bold"
  },
  image:{
    marginHorizontal:10
  },
  icon:{
    width:50,
    height:50,
    backgroundColor:color.red,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderColor:color.background,

},
textIcon:{
    fontSize:24,
    color:color.white

},
img:{
  width:40,
  height:40
}
});

export default styles;
