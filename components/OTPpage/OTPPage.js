import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useRef, useEffect, useContext } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import CountDown from 'react-native-countdown-component';
import { userContext } from '../../App';

const OTPValidationSchema = yup.object().shape({
    name: yup.string().required('User name is Required'),
    //   roll: yup.string().min(7).max(7).required('User roll is Required'),
    contactNo: yup.string().matches(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/, 'Must follow bd number pattern').required('User name is Required'),
    email: yup
        .string()
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
            'Please enter valid email',
        )
        .email('Please enter valid email')
        .required('Email Address is Required'),
    address: yup.string().required('User address is Required'),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
});

const OTPPage = ({ route, navigation }) => {
    const [userInfo, setUserInfo] = useContext(userContext);
    const [showSendBtn, setShowSendBtn] = useState(true)
    const [changeMode, setChangeMode] = useState(true)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [distance, setDistance] = useState(300000)
    // console.log(route.params.userData)



    const handleSubmit = () => {

        if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
            alert("Please fill the otp fields!")

        }
        else {
            console.log("submit btn")
            const otp = pin1 + "" + pin2 + "" + pin3 + "" + pin4;
            fetch('http://localhost:8085/verifyUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp:otp, email:userInfo.email}),
            })
                .then(res => res.json())
                .then(data => {
                    // setUserInfo({ ...values, ...imageData })
                    data && alert('User verified successfully.Please go to login page!');
                    data && navigation.navigate('Login');

                })
                .catch(err => { console.log(err) })
        }
    }
    const handleResendBtn = () => {
        setChangeMode(true);
        console.log("resend btn")
    }

    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)


    const [pin1, setPin1] = useState('')
    const [pin2, setPin2] = useState('')
    const [pin3, setPin3] = useState('')
    const [pin4, setPin4] = useState('')



    console.log(pin1, pin2, pin3, pin4)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CountDown
                    until={60 * 5}
                    size={30}
                    onFinish={() => setShowSendBtn(false)}
                    digitStyle={{ backgroundColor: '#FFF' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeToShow={['M', 'S']}
                    timeLabels={{ m: 'Min', s: 'Sec' }}
                />
            </View>
            <View style={styles.optContainer}>
                <View style={styles.inputFieldView}>
                    <TextInput
                        ref={pin1Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={(pin1) => {
                            setPin1(pin1);
                            if (pin1 != '') {

                                pin2Ref.current.focus()

                            }
                        }}
                        style={styles.inputFieldText}
                    // value={pin1}


                    />
                </View>
                <View style={styles.inputFieldView}>
                    <TextInput
                        ref={pin2Ref}
                        keyboardType={'number-pad'}
                        maxLength={1}
                        onChangeText={(pin2) => {
                            setPin2(pin2);
                            if (pin2 != '') {

                                pin3Ref.current.focus()

                            }
                        }}
                        style={styles.inputFieldText}
                    // value={pin2}
                    />
                </View>
                <View style={styles.inputFieldView}><TextInput
                    ref={pin3Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={(pin3) => {
                        setPin3(pin3);
                        if (pin3 != '') {

                            pin4Ref.current.focus()

                        }

                    }}
                    // value={pin3}
                    style={styles.inputFieldText}
                /></View>
                <View style={styles.inputFieldView}><TextInput
                    ref={pin4Ref}
                    styles={{ justifyContent: "center", alignItems: "center" }}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={(pin4) => setPin4(pin4)}
                    style={styles.inputFieldText}
                // value={pin4}
                /></View>

            </View>
            <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
                <Button
                    onPress={changeMode ? handleSubmit : handleResendBtn}

                    disabled={!showSendBtn}
                    mode="contained">
                    {changeMode ? "Send" : "Resend"}
                </Button>
            </View>
        </View>
    )
}

export default OTPPage

const styles = StyleSheet.create({
    optContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 100
        // width: '100%',
    },
    inputFieldView: {
        flex: 1,
        width: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8

    },
    inputFieldText: {
        fontSize: 30,
    }
})