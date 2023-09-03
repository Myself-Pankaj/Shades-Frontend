import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPosts } from "../Redux/Actions/Post";
import { Button, Searchbar } from "react-native-paper";
import WallpapePost from "../Components/WallpapePost";
import { useEffect } from "react";
import MasonryList from "react-native-masonry-list";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { showMessage } from "react-native-flash-message";

const Wallpaper = () => {
  const [caption, setCaption] = React.useState("");

  const { posts, loading } = useSelector((state) => state.allPost);

  const dispatch = useDispatch();
  const onChangeSearch = (text) => {
    setCaption(text);
    dispatch(getPosts(text));
  };

  const handleDownload = async (fileUrl) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const fileUri = FileSystem.documentDirectory + "Shades.jpg";
        const downloadedFile = await FileSystem.downloadAsync(fileUrl, fileUri);
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        await MediaLibrary.createAlbumAsync("Wallpapers", asset, false);
        Alert.alert(
          "Download complete",
          "The wallpaper has been saved to your photos."
        );
      } else {
        Alert.alert(
          "Permission required",
          "Please grant permission to save wallpapers to your photos.",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error saving the wallpaper.", [
        { text: "OK" },
      ]);
    }
  };
  return (
    <View style={Styles.mainContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={caption}
      />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        posts && (
          <MasonryList
            images={posts.map((post) => ({ uri: post.image.url }))}
            spacing={4}
            columns={2}
            onPressImage={(data) => handleDownload(posts[data.index].image.url)}
            renderIndividualHeader={(data) => (
              <WallpapePost caption={posts[data.index].caption} />
            )}
          />
        )
      )}
    </View>
  );
};

export default Wallpaper;

const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
