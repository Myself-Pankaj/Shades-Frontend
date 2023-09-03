import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../Redux/Actions/User';
import Logo from '../assets/logo.png';

const ForgetPassword = ({ navigation }) => {

    const [email, setEmail] = useState("");

    const { loading } = useSelector(state => state.profile);

    const { user } = useSelector(state => state.auth);

    


    console.log()
    const dispatch = useDispatch()

    const forgetHandler = async () => {
        if (user.email !== email) {
            alert("Email does not match")
           
          }
          await dispatch(forgetPassword(email));
          navigation.navigate("resetpassword");
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image source={Logo} style={Styles.loginImg}></Image>
            <Text style={{ fontSize: 20, margin: 20 }}>Retrive Your Password</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />


            </View>

            <Button
                style={Styles.btn}
                onPress={forgetHandler}
                disabled={loading}
                loading={loading}
                icon="email-send"
                mode="contained"
                buttonColor="black"
            >
                Send Email
            </Button>



        </View>
    )
}




const Styles = StyleSheet.create({

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#b5b5b5",
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15,
    },

    btn: {
        // backgroundColor: "#900",
        padding: 5,
        width: "70%",
    },
    loginImg: {
        width: 250,
        height: 50,
        resizeMode: "center",
        marginBottom:40
      },
})

export default ForgetPassword