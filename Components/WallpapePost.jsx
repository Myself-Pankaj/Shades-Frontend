import { View, Text, TouchableOpacity} from "react-native";
import React from "react";
import { useState } from "react";

const WallpapePost = ({ caption,onDownload  }) => {
  
  return (
    <View>
    <Text>{caption}</Text>
  </View>
  );
};

export default WallpapePost;
