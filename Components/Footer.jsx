import { View, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safeArea}>
        <View
            style={styles.container}
        >
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
                <Icon name="home" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("wallpaper")}>
                <Icon name="wallpaper" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("search")}>
                <Icon name="toy-brick-search-outline" size={30} color="#900" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                <Icon name="account-details" size={30} color="#900" />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

export default Footer

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
      },
      container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
});