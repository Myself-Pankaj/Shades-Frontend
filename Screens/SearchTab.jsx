import { View, Text, Platform, StatusBar, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/Actions/User";
import { Searchbar } from "react-native-paper";
import User from "../Components/User";

const SearchTab = () => {
  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.searchUser);
  

  const dispatch = useDispatch();
  const onChangeSearch = (text) => {
    setName(text);
    dispatch(getAllUsers(text));
  };
  return (
    <View style={Styles.mainContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={name}
      />
      <View>
        {users &&
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))}
      </View>
    </View>
  );
};

export default SearchTab;

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
