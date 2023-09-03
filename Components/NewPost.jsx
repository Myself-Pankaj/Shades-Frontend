import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../Redux/Actions/Post";
import { loadUser } from "../Redux/Actions/User";
import mime from "mime";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const NewPost = ({ route }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [keyword, setKeyword] = useState("");
  const { loading, error, message } = useSelector((state) => state.likeComment);
  const dispatch = useDispatch();

  const handleImage = () => {
    navigation.navigate("camera", {
      addPost: true,
    });
  };

  const submitHandler = async () => {
    const myForm = new FormData();
    myForm.append("caption", caption);
    myForm.append("keyword", keyword);
    myForm.append("image", {
      uri: image,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });
    try {
      await dispatch(createNewPost(myForm));
      dispatch(loadUser());
      // console.log("Post Created")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      Alert.alert("Success", message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setImage(route.params.image);
      }
    }
  }, [route]);

  return (
    <View style={styles.mainLoginContainer}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <View style={styles.postingForm}>
        <Button
          icon="camera"
          mode="contained"
          onPress={handleImage}
          style={styles.postingbtn}
        >
          Click Here To Add Photos
        </Button>

        <TextInput
          style={styles.captionInput}
          placeholder="caption"
          value={caption}
          onChangeText={setCaption}
        />
        <TextInput
          mode="outlined"
          style={styles.captionInput}
          placeholder="keyword"
          value={keyword}
          onChangeText={setKeyword}
        />
      </View>
<View  style={styles.btn}>
      <Button
        icon="post"
        mode="contained"
        disabled={!image || !caption || !keyword}
        loading={loading}
      
        onPress={submitHandler}
        buttonColor="black"
      >
        Post
      </Button>
      </View>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  mainLoginContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    justifyContent: "center",
  },
  postingForm: {
    justifyContent: "center",
    padding: 10,
  },
  postingbtn: {
    padding: 10,
    margin: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  captionInput: {
    borderBottomWidth: 2,
    borderBottomColor: "grey",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  btn:{
    width:250
  },
 
});

