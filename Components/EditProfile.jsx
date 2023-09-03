import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../Redux/Actions/User";
import { Avatar, Button } from "react-native-paper";
import mime from "mime";
const EditProfile = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar.url);
  const [bio, setBio] = useState(user.bio);
  const [username, setUsername] = useState(user.username);

  const dispatch = useDispatch();

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("username", username);
    myForm.append("bio", bio);
    myForm.append("avatar", {
      uri: avatar,
      type: mime.getType(avatar),
      name: avatar.split("/").pop(),
    });
    await dispatch(updateProfile(myForm));
    dispatch(loadUser());
  };

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: true,
    });
  };

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image);
      }
    }
  }, [route]);
  return (
    <View style={Styles.mainLoginContainer}>
      <Avatar.Image
        size={100}
        source={{ uri: avatar ? avatar : null }}
        style={Styles.avtar}
      />
      <TouchableOpacity onPress={handleImage}>
        <Text style={Styles.text1}>Change Photo</Text>
      </TouchableOpacity>

      <View style={Styles.registerForm}>
        <TextInput
          style={Styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={Styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={Styles.input}
          placeholder="Bio"
          value={bio}
          multiline={true}
          onChangeText={setBio}
        />
      </View>

      <Button
        disabled={!username || !bio || !name}
        style={Styles.btn}
        loading={loading}
        onPress={submitHandler}
        icon="book-edit"
        mode="contained"
        buttonColor="black"
      >
        <Text style={Styles.text2}>Update</Text>
      </Button>
    </View>
  );
};

export default EditProfile;

const Styles = StyleSheet.create({
  mainLoginContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  avtar: {
    backgroundColor: "#900",
  },
  text1: {
    color: "#900",
  },
  text2: {
    color: "#fff",
  },
  text3: {
    height: 30,
    margin: 20,
  },
  text4: {
    color: "#900",
    height: 40,
    fontSize: 20,
    margin: 20,
  },
  registerForm: {
    width: "70%",
  },
  input: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#b5b5b5",
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    marginVertical: 10,
    fontSize: 15,
  },
  btn: {
    // backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
