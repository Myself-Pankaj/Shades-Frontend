import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost } from "../Redux/Actions/Post";
import { getFollowingPosts, getMyPosts } from "../Redux/Actions/User";
import { Avatar, Button } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const deleteCommentHandle = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getFollowingPosts());
    }
  };

  return (
    <View style={Styles.commentSection}>
      <View style={Styles.box}>
        <TouchableOpacity
          onPress={() => console.log(`Go to user with id ${userId}`)}
          style={Styles.UserInfo}
        >
          <Avatar.Image size={20} source={{ uri: avatar }} />
          <Text style={{ minWidth: 5, marginHorizontal: 2 , overflow:'hidden' }}>{name}</Text>
        </TouchableOpacity>
        <View style={Styles.comment}>
          <Text>{comment}</Text>
        </View>
        {isAccount || userId === user._id ? (
          <TouchableOpacity onPress={deleteCommentHandle}>
            <MaterialIcons name="delete" size={20} style={Styles.btn} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CommentCard;

const Styles = StyleSheet.create({
  commentSection: {
    padding: 2,
    // margin: 5,
    // borderWidth: 2,
    // borderColor: "black",
    
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  UserInfo: {
    alignItems: "center",
    width:50,
    overflow:'hidden'
  },
  comment: {
    width: 170,
  },
  btn: {
   
  },
});
