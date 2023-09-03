import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Footer from "./Components/Footer";
import Profile from "./Screens/Profile";
import Wallpaper from "./Screens/Wallpaper";
import SearchTab from "./Screens/SearchTab";
import SignUp from "./Screens/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Redux/Actions/User";
import Loader from "./Components/Loader";
import CameraComponent from "./Components/Camera";
import Verify from "./Screens/Verify";
import EditProfile from "./Components/EditProfile";
import ResetPassword from "./Components/ResetPassword";
import ForgetPassword from "./Components/ForgetPassword";
import { SafeAreaView } from "react-native";
import UserProfile from "./Components/UserProfile";
import NewPost from "./Components/NewPost";

const Stack = createNativeStackNavigator();
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  return loading ? (
    <Loader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="wallpaper"
          component={Wallpaper}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="search"
          component={SearchTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="camera"
          component={CameraComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verify"
          component={Verify}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="update"
          component={EditProfile}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="resetpassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forgetpassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addPost"
          component={NewPost}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {isAuthenticated && <Footer />}
    </NavigationContainer>
  );
};

export default Main;
