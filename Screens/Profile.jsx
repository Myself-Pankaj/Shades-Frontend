import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React from "react";
import Logo from "../assets/tlogo.png";
import { deleteMyProfile, getMyPosts, logoutUser } from "../Redux/Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Post from "../Components/Post";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import User from "../Components/User";
import { Button, IconButton } from "react-native-paper";

const Profile = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const { user, loading } = useSelector((state) => state.auth);

  const {
    loading: postLoading,
    error,
    posts,
  } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    loading: deleteLoading,
  } = useSelector((state) => state.likeComment);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  const profileHandler = () => {
    navigation.navigate("update");
  };
  const resetPasswordHandler = () => {
    navigation.navigate("resetpassword");
  };
  const forgetPasswordHandler = () => {
    navigation.navigate("forgetpassword");
  };
  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.boxImg}>
            <Image
              source={{ uri: `${user.avatar.url}` }}
              style={styles.avtar}
            />
          </View>
          <View style={styles.profileheaderbox}>
            <View>
              <Text style={styles.text1}> {user.username}</Text>
            </View>
            <Text style={styles.name}>{user.name}</Text>

            <Text style={styles.bio}>{user.bio}</Text>
            <View style={styles.profileheaderbox1}>
              <View style={styles.pff}>
                <Text>{user.posts.length}</Text>
                <Text>Post</Text>
              </View>
              <View style={styles.pff}>
                <Text>{user.followers.length}</Text>
                <Text>Follower</Text>
              </View>
              <View style={styles.pff}>
                <Text>{user.following.length}</Text>
                <Text>Following</Text>
              </View>
            </View>

            {/* ++++++++++++++++++Post FolloWer Following Section +++++++++++++++++++++ */}
            <View>
              {/* **********************************Post****************************** */}
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.comp}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Wallpaper</Text>
              </TouchableOpacity>
              {/* **********************************Post Toggle*************************** */}
              <Modal visible={modalVisible} animationType="slide">
                <TouchableOpacity style={{ padding: 10, flexDirection: "row" }}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    icon="close-octagon"
                    mode="contained"
                    buttonColor="black"
                  >
                    Close
                  </Button>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: "center",
                    color: "#900",
                    letterSpacing: 1,
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  Your Wallpaper
                </Text>
                {posts && posts.length > 0 ? (
                  <View style={styles.bar}>
                    <ScrollView>
                      {posts.map((item) => (
                        <Post
                          key={item._id}
                          postId={item._id}
                          caption={item.caption}
                          postImage={item.image.url}
                          likes={item.likes}
                          comments={item.comments}
                          ownerImage={item.owner.avatar.url}
                          ownerName={item.owner.name}
                          ownerId={item.owner._id}
                          isAccount={true}
                          isDelete={true}
                        />
                      ))}
                    </ScrollView>
                  </View>
                ) : (
                  <Text style={{ fontSize: 18 }}>No posts yet</Text>
                )}
              </Modal>
              {/* **********************************Follower****************************** */}
              <TouchableOpacity
                style={styles.comp}
                onPress={() => setFollowersToggle(!followersToggle)}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Follower</Text>
              </TouchableOpacity>
              {/* **********************************Follower Toggle****************************** */}
              <Modal
                visible={followersToggle}
                onRequestClose={() => setFollowersToggle(!followersToggle)}
                style={styles.bar}
              >
                <TouchableOpacity style={{ padding: 10, flexDirection: "row" }}>
                  <Button
                    onPress={() => setFollowersToggle(false)}
                    icon="close-octagon"
                    mode="contained"
                    buttonColor="black"
                  >
                    Close
                  </Button>
                </TouchableOpacity>
                <View style={styles.dialogBox}>
                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: "center",
                      color: "#900",
                      letterSpacing: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Your Followers
                  </Text>

                  {user && user.followers.length > 0 ? (
                    <View style={styles.bar}>
                      <ScrollView>
                        {user.followers.map((follower) => (
                          <User
                            key={follower._id}
                            userId={follower._id}
                            name={follower.name}
                            avatar={follower.avatar?.url}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <Text style={styles.text}>You have no followers</Text>
                  )}
                </View>
              </Modal>
              {/* **********************************Following ****************************** */}
              <TouchableOpacity
                style={styles.comp}
                onPress={() => setFollowingToggle(!followingToggle)}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Following</Text>
              </TouchableOpacity>
              {/* **********************************FOllowing TOggle****************************** */}
              <Modal
                visible={followingToggle}
                onRequestClose={() => setFollowingToggle(!followingToggle)}
                style={styles.bar}
              >
                <TouchableOpacity style={{ padding: 10, flexDirection: "row" }}>
                  <Button
                    onPress={() => setFollowingToggle(false)}
                    icon="close-octagon"
                    mode="contained"
                    buttonColor="black"
                  >
                    Close
                  </Button>
                </TouchableOpacity>
                <View style={styles.dialogBox}>
                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: "center",
                      color: "#900",
                      letterSpacing: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Following
                  </Text>

                  {user && user.following.length > 0 ? (
                    <View style={styles.bar}>
                      <ScrollView>
                        {user.following.map((follow) => (
                          <User
                            key={follow._id}
                            userId={follow._id}
                            name={follow.name}
                            avatar={follow.avatar?.url}
                          />
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <Text style={{ margin: 10 }}>
                      You're not following anyone
                    </Text>
                  )}
                </View>
              </Modal>
            </View>
            {/* **********************************End****************************** */}
            <View style={styles.btnGrp}>
              <IconButton
                icon="onepassword"
                iconColor="red"
                style={styles.btn}
                size={30}
                mode="contained"
                onPress={forgetPasswordHandler}
              />

              <IconButton
                icon="account-edit"
                iconColor="#900"
                style={styles.btn}
                size={30}
                mode="contained"
                onPress={profileHandler}
              />
              <IconButton
                icon="logout"
                iconColor="red"
                style={styles.btn}
                size={30}
                mode="contained"
                onPress={logoutHandler}
              />
              {/* <Button  style={styles.btn} icon="onepassword" mode="contained" buttonColor="black" onPress={forgetPasswordHandler}>Forget Password</Button>
          <Button style={styles.btn} icon="account-edit" mode="contained" buttonColor="black" onPress={profileHandler}>Edit Profile</Button> */}
              {/* <Button
                style={styles.btn}
                icon="logout"
                mode="contained"
                buttonColor="black"
                onPress={logoutHandler}
              >
                Logout
              </Button> */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text1: {
    // padding: 20,
    fontSize: 15,
  },
  profileheaderbox: {
    justifyContent: "flex-start",
    padding: 20,
    // flex:1,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: "black",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  boxImg: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avtar: {
    width: "90%",
    height: 250,
    paddingTop: 20,
    resizeMode: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  bio: {
    fontSize: 15,
    paddingBottom: 5,
  },
  profileheaderbox1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    padding: 15,
  },
  pff: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  btnGrp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 40,
  },
  btnTxt: {
    fontSize: 15,
    color: "blue",
  },
  bar: {
    // borderWidth:1,
    // borderColor:'grey',
    // borderRadius:10,
    paddingBottom: 60,
  },
  comp: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "flex-start",
    paddingLeft: 20,
    padding: 15,
    margin: 10,
  },
});
