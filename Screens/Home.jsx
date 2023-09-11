import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  RefreshControl ,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/tlogo.png";
import Post from "../Components/Post";
import { getFollowingPosts } from "../Redux/Actions/User";
import Verify from "./Verify";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const Home = ({ navigation }) => {
//   const dispatch = useDispatch();

//   const { user } = useSelector((state) => state.auth);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const { loading, posts, error } = useSelector((state) => state.postdisplay);
  
//   const isVerified = user.verified;
//   useEffect(() => {
//     dispatch(getFollowingPosts());
//   }, [dispatch]);

//   return isVerified ? (
//     <View style={styles.mainContainer}>
//       <SafeAreaView>
//         <View style={styles.homeHeaderBox}>
//           <View style={styles.homeHeaderText}>
//             <Image source={Logo} style={styles.loginImg} />
//           </View>
//           <View style={styles.homeHeaderIconContainer}>
            
//             <TouchableOpacity onPress={() => navigation.navigate("addPost")}>
//             <MaterialIcons name="post-add" size={42} color='#900'  />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.post}>
//           {posts && posts.length > 0 ? (
//             <View>
//               <ScrollView>
//               {posts.map((item) => (
//                 <Post
//                   key={item._id}
//                   postId={item._id}
//                   caption={item.caption}
//                   postImage={item.image.url}
//                   likes={item.likes}
//                   comments={item.comments}
//                   ownerImage={item.owner.avatar.url}
//                   ownerName={item.owner.name}
//                   ownerId={item.owner._id}
//                 />
                
//               ))}
//               </ScrollView>
//             </View>
//           ) : (
//             <Text style={{ fontSize: 18 }}>No posts yet</Text>
//           )}
//         </View>
//       </SafeAreaView>
//     </View>
//   ) : (
//     <Verify />
//   );
// };

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false); // State to track refreshing

  const { user } = useSelector((state) => state.auth);
  const { loading, posts, error } = useSelector((state) => state.postdisplay);
  const isVerified = user.verified;

  useEffect(() => {
    dispatch(getFollowingPosts());
  }, [dispatch]);

  const handleRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true
    // You can put your refresh logic here, e.g., dispatch an action to reload posts
    dispatch(getFollowingPosts())
      .then(() => setIsRefreshing(false)) // Set refreshing state to false when done
      .catch(() => setIsRefreshing(false)); // Handle any errors and set refreshing state to false
  };

  return isVerified ? (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <View style={styles.homeHeaderBox}>
          <View style={styles.homeHeaderText}>
            <Image source={Logo} style={styles.loginImg} />
          </View>
          <View style={styles.homeHeaderIconContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("addPost")}>
              <MaterialIcons name="post-add" size={42} color='#900'  />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.post}>
          <ScrollView
            refreshControl={ // Add the RefreshControl component to enable pull to refresh
              <RefreshControl
                refreshing={isRefreshing} // Pass the refreshing state to the RefreshControl
                onRefresh={handleRefresh} // Callback function when refresh is triggered
              />
            }
          >
            {posts && posts.length > 0 ? (
              <View>
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
              </View>
            ) : (
              <Text style={{ fontSize: 18 }}>No posts yet</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  ) : (
    <Verify />
  );
};
export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom:200
  },
  homeHeaderBox: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },
  homeHeaderText: {
    color: "black",
    paddingRight: 20,
    // borderBottomWidth: 2,
    // borderBottomColor: "black",
  },
  loginImg: {
    width: 180,
    padding: 10,
    // position:"absolute",
    alignItems: "flex-start",
    height: 80,
    resizeMode: "center",
  },
  homeHeaderIcon1: {
    color: "grey",
    fontSize: 40,
    paddingTop: 10,
  },
  homeHeaderIcon: {
    color: "red",
    fontSize: 40,
    paddingTop: 10,
    paddingLeft: 30,
  },
  homeHeaderIconContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  
});
