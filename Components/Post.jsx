import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ImageComponent,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  likePost,
  updatePost,
} from "../Redux/Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser } from "../Redux/Actions/User";
import Icons from "react-native-vector-icons/AntDesign";
import {
  Dialog,
  Avatar,
  Button,
  Card,
} from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommentCard from "./CommentCard";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.likeComment);

  const handleLike = async () => {
    setLiked(!liked);

    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  const [scrollViewRef, setScrollViewRef] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScrollDown = () => {
    if (scrollViewRef) {
      scrollViewRef.scrollTo({ y: scrollY + 50, animated: true });
      setScrollY(scrollY + 50);
    }
  };

  const handleScrollUp = () => {
    if (scrollViewRef && scrollY > 0) {
      scrollViewRef.scrollTo({ y: scrollY - 50, animated: true });
      setScrollY(scrollY - 50);
    }
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
  }, [likes, user._id]);

  return (
    <View style={Styles.post}>
     

      <View>
        <View style={Styles.header}>
          <Avatar.Image source={{ uri: ownerImage }} size={40} />

          <Text
            style={{
              fontWeight: "100",
              color: "rgba(0, 0, 0, 0.582)",
              alignSelf: "center",
              fontSize: 18,
            }}
          >
            {caption}
          </Text>
          {isAccount ? (
        <Button onPress={() => setCaptionToggle(!captionToggle)}>
          <Icons
            name="edit"
            size={20}
            color="#900"
            style={Styles.Icon1}
          />
        </Button>
      ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate(`/user/${ownerId}`)}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {ownerName}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={Styles.photo}>
          <Card>
            <Card.Cover source={{ uri: postImage }} />
          </Card>
        </View>

        <View style={Styles.footer}>
          <View style={Styles.leftFooter}>
            <TouchableOpacity
              style={{
                borderWidth: 0,
                backgroundColor: "white",
                marginHorizontal: 8,
                marginVertical: 8,
                padding: 8,
              }}
              onPress={() => setLikesUser(!likesUser)}
              disabled={likes.length === 0}
            >
              <Text style={{ fontSize: 18 }}>{`${likes.length} Likes`}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 0,
                backgroundColor: "white",
                marginHorizontal: 8,
                marginVertical: 8,
                padding: 8,
              }}
              onPress={() => setCommentToggle(!commentToggle)}
              disabled={likes.length === 0}
            >
              <Text
                style={{ fontSize: 18 }}
              >{`${comments.length} Comment`}</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.rightFooter}>
            <TouchableOpacity onPress={handleLike}
            style={Styles.likecomment}>
              {liked ? (
                <Icons
                  name="like1"
                  size={30}
                  color="#900"
                  // style={Styles.Icon1}
                />
              ) : (
                <Icons
                  name="like2"
                  size={30}
                  color="#900"
                  // style={Styles.Icon1}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCommentToggle(!commentToggle)}
            style={Styles.likecomment}>
              <MaterialIcons name="chat-bubble-outline" size={32} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCommentToggle(!commentToggle)}
            style={Styles.likecomment}>
              <MaterialIcons name="file-download" size={32} />
            </TouchableOpacity>
          </View>
        </View>

        {isDelete ? (
         
          <Button
          icon="delete"
          mode="flat"
          loading={loading}
          textColor='white'
          onPress={deletePostHandler}
          buttonColor="black"
        >
          Delete
        </Button>
        ) : null}

        <Dialog visible={likesUser} onDismiss={() => setLikesUser(!likesUser)}>
          <Dialog.Title>Liked By</Dialog.Title>

          <Dialog.Content>
            {likes.map((like) => (
              <View
                key={like._id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Avatar.Image size={40} source={{ uri: like.avatar.url }} />
                <Text style={{ marginLeft: 10 }}>{like.name}</Text>
              </View>
            ))}
          </Dialog.Content>
        </Dialog>

        <Dialog
          visible={commentToggle}
          onDismiss={() => setCommentToggle(!commentToggle)}
        >
          {/* <Dialog.Title>Comments</Dialog.Title> */}

          <Dialog.Content style={{ height: 200, overflow: "scroll" }}>
            <TextInput
              value={commentValue}
              onChangeText={(text) => setCommentValue(text)}
              placeholder="Comment here..."
            />

            <Button
              onPress={addCommentHandler}
              loading={loading}
              mode="contained"
            >
              Add
            </Button>
            <ScrollView
              ref={(ref) => setScrollViewRef(ref)}
              onContentSizeChange={(contentWidth, contentHeight) =>
                setScrollY(contentHeight)
              }
            >
              <View>
                {comments.length > 0 ? (
                  comments.map((item) => (
                    <CommentCard
                      userId={item.user._id}
                      name={item.user.name}
                      avatar={item.user.avatar.url}
                      comment={item.comment}
                      commentId={item._id}
                      key={item._id}
                      postId={postId}
                      isAccount={isAccount}
                    />
                  ))
                ) : (
                  <Text>No comments yet</Text>
                )}
              </View>
            </ScrollView>
          </Dialog.Content>
            {comments.length > 1 ? (
          <Dialog.Actions style={Styles.dialogArrow}>
              
                <TouchableOpacity onPress={handleScrollUp}>
                  <MaterialIcons
                    name="arrow-circle-up"
                    size={20}
                    style={Styles.btn}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleScrollDown}>
                  <MaterialIcons
                    name="arrow-circle-down"
                    size={20}
                    style={Styles.btn}
                  />
                </TouchableOpacity>
              
          </Dialog.Actions>
            ) : (
              null
            )}
        </Dialog>

        <Dialog visible={captionToggle} onDismiss={() => setCaptionToggle(false)}>
        <Dialog.Title>Update Caption</Dialog.Title>

        <Dialog.Content>
          <TextInput
            value={captionValue}
            onChangeText={(text) => setCaptionValue(text)}
            placeholder="Caption Here..."
            mode="outlined"
            required
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={() => setCaptionToggle(false)}>Cancel</Button>
          <Button onPress={updateCaptionHandler}>Update</Button>
        </Dialog.Actions>
      </Dialog>
      </View>
    </View>
  );
};

export default Post;

const Styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    margin: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  likecomment:{
    paddingHorizontal:10
  },
  dialogArrow: {
    flexDirection: "row",
    justifyContent:'space-between',
    // borderWidth:1,
    // borderColor:'black'
  },
  post:{
    // borderBottomWidth:1,
    // borderBottomColor:'black',
    padding:20,
    paddingBottom:30,
  
  },
});
