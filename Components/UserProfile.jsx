import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../Redux/Actions/User";
import { useEffect } from "react";
import Post from "./Post";
import { Avatar, Button } from "react-native-paper";
import User from "./User";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Loader from "./Loader";
const UserProfile = ({ route }) => {
  const { id } = route.params;

  const dispatch = useDispatch();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userInfo);

  const { user: me } = useSelector((state) => state.auth);

  const { loading, error, posts } = useSelector((state) => state.userPosts);

  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.likeComment);
  const [modalVisible, setModalVisible] = useState(false);
  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState("");
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(getUserProfile(id));
    dispatch(followAndUnfollowUser(id));
  };

  useEffect(() => {
    dispatch(getUserProfile(id));
    dispatch(getUserPosts(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (me._id === id) {
      setMyProfile(true);
    }
    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, id]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch({ type: "clearErrors" });
    }

    if (followError) {
      alert(followError);
      dispatch({ type: "clearErrors" });
    }

    if (userError) {
      alert(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

  const buttonLabel = following ? "Unfollow" : "Follow";
  const buttonColor = following ? undefined : "red";
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <View style={styles.mainContainer}>
      {user && (
        <>
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

            {myProfile ? null : (
              <Button
                mode="contained"
                buttonColor={buttonColor}
                onPress={followHandler}
                disabled={followLoading}
              >
                {buttonLabel}
              </Button>
            )}
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
            <View style={styles.bar}>
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
                  Wallpaper
                </Text>
                {posts && posts.length > 0 ? (
                  <View>
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
                    Followers
                  </Text>

                  {user && user.followers.length > 0 ? (
                    user.followers.map((follower) => (
                      <User
                        key={follower._id}
                        userId={follower._id}
                        name={follower.name}
                        avatar={follower.avatar.url}
                      />
                    ))
                  ) : (
                    <Text>User have no followers</Text>
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
                    user.following.map((follow) => (
                      <User
                        key={follow._id}
                        userId={follow._id}
                        name={follow.name}
                        avatar={follow.avatar.url}
                      />
                    ))
                  ) : (
                    <Text style={{ margin: 10 }}>Not following anyone</Text>
                  )}
                </View>
              </Modal>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default UserProfile;
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
    borderWidth: 5,
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
    paddingTop: 20,
    paddingHorizontal: 4,
    marginHorizontal: 6,
  },
  btnTxt: {
    fontSize: 15,
    color: "blue",
  },
  bar: {
    // borderWidth:1,
    // borderColor:'grey',
    // borderRadius:10,
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
