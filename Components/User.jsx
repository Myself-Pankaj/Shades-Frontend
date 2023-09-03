import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { followAndUnfollowUser, getUserProfile } from "../Redux/Actions/User";
import { useState } from "react";
import { useSelector } from "react-redux";
const User = ({ userId, name, avatar }) => {
  
  const [following, setFollowing] = useState(false);

  const navigation = useNavigation();


  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(userId));
    dispatch(getUserProfile(userId));
  };


  const buttonLabel = following ? "Unfollow" : "Follow";
  const buttonColor = following ? "red" : undefined;

  const {
    loading: followLoading,
  } = useSelector((state) => state.likeComment);
  return (
    <View style={Styles.Users}>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserProfile", { id: userId })}
      >
        <Avatar.Image source={{ uri: avatar }} size={50} />
        <Text>{name}</Text>
      </TouchableOpacity>
      {/* <Button
        mode="contained"
        color={buttonColor}
        onPress={followHandler}
        disabled={followLoading}
      >
        {buttonLabel}
      </Button> */}
    </View>
  );
};

export default User;

const Styles = StyleSheet.create({
  Users: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    flexDirection: "row",
  },
});
