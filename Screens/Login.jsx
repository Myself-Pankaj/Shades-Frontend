import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
// import React, { useEffect, useState } from 'react'
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/logo.png";
import { login } from "../Redux/Actions/User";

const Login = ({ navigation }) => {
  const { user, error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearError" });
    }
  }, [error, dispatch, alert]);

  return (
    <View style={Styles.mainLoginContainer}>
      <SafeAreaView>
        <View style={Styles.loginBox}>
          <Image source={Logo} style={Styles.loginImg}></Image>

          <View style={Styles.loginForm}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate("forgetpassword")}
            style={Styles.text}
          >
            <Text> Forget Password </Text>
          </TouchableOpacity>

          <Button
            disabled={!email || !password}
            onPress={loginHandler}
            icon="login"
            mode="contained"
            loading={loading}
            buttonColor="black"
          >
            Login
          </Button>
            <View style={Styles.loginText}>
          <Text style={Styles.loginText2}>Or</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={Styles.loginText3}>Sign Up</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const Styles = StyleSheet.create({
  mainLoginContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox: {
    // alignItems: "center",
  },
  loginImg: {
    width: 250,
    height: 50,
    resizeMode: "center",
    marginBottom: 40,
  },
  loginForm: {
    width: "100%",
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

  text: {
    alignItems: "flex-end",
    // borderWidth:1,
    // borderColor:"red",
    width: "100%",
    marginBottom: 15,
  },
  loginText: {
    alignItems:'center'
  },
  loginText2: {
    marginTop: 20,
  },
  loginText3: {
    fontSize: 20,
    color: "#900",
    height: 30,
    margin: 20,
  },
});
