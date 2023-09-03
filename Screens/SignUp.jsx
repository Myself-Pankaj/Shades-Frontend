import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { register } from "../Redux/Actions/User";
import { useDispatch, useSelector } from "react-redux";
import mime from 'mime';
import { useNavigation } from "@react-navigation/native";


const SignUp = ({  route }) => {

  const {  loading } = useSelector((state) => state.auth);

  const navigation = useNavigation()
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const handleImage = () => {
    navigation.navigate("camera", {
      updateProfile: false,
    });
  };

  const registerHandler = async () =>{
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("username", username);
    myForm.append("bio", bio);
    myForm.append("password", password);
    myForm.append("avatar", {
        uri: avatar,
        type: mime.getType(avatar),
        name: avatar.split("/").pop()
    })
    // dispatch(register(myForm));
    try {
      await dispatch(register(myForm));
      
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {

    if (route.params) {
        if (route.params.image) {
            setAvatar(route.params.image)
        }
    }

}, [route])
  return (
    <View style={Styles.mainLoginContainer}>
      <Avatar.Image
        size={100}
        source={{ uri: avatar
           ? avatar : null }}
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
          multiline= {true}
          onChangeText={setBio}
        />
        <TextInput
          style={Styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          secureTextEntry
          style={Styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button
        disabled={!email || !password || !bio|| !username }
        icon="login"
        mode="contained"
        loading={loading}
        buttonColor="black"
        onPress={registerHandler}

      >
        <Text style={Styles.text2}>Register</Text>
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={Styles.text3}>Have an Account,<Text style={Styles.text4}> Login</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
    fontSize:20,
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
    backgroundColor: "#900",
    padding: 5,
    width: "70%",
  },
});
