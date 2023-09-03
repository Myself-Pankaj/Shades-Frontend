import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../Redux/Actions/User';
import Logo from '../assets/logo.png';

const ResetPassword = ({ navigation }) => {
    const { loading,message, error } = useSelector(state => state.profile)

    const [otp, setOtp] = useState();
    const [newPassword, setNewPassword] = useState();
    const dispatch = useDispatch()

    const changePasswordHandler = async () => {
        await dispatch(resetPassword(otp, newPassword));
        navigation.navigate("login");
    }

    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" })
        }
        if (error) {
            alert(error);
            dispatch({ type: "clearError" })
        }
    }, [alert, message, dispatch, error])



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
            <Text style={{ fontSize: 20, margin: 20 }}>Change Password</Text>
            <View style={{ width: "70%" }}>
                <TextInput
                    style={Styles.input}
                    placeholder="OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                />

                <TextInput
                    secureTextEntry
                    style={Styles.input}
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
            </View>

            <Button
                style={Styles.btn}
                onPress={changePasswordHandler}
                icon="lock-reset"
            mode="contained"
            loading={loading}
            buttonColor="black"
        
            >
                Reset Password
            </Button>



        </View>
    )
}

export default ResetPassword


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
        // color:'black',
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