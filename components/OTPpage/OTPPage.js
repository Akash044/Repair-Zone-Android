import { StyleSheet, Text, View, TextInput } from 'react-native'
// import { TextInput } from 'react-native-paper';
import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';

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

const OTPPage = () => {

    const pin1Ref = useRef(null)
    const pin2Ref = useRef(null)
    const pin3Ref = useRef(null)
    const pin4Ref = useRef(null)


    const [pin1, setPin1] = useState('')
    const [pin2, setPin2] = useState('')
    const [pin3, setPin3] = useState('')
    const [pin4, setPin4] = useState('')
    return (
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

                keyboardType={'number-pad'}
                maxLength={1}
                onChangeText={(pin4) => setPin4(pin4)}
                style={styles.inputFieldText}
                // value={pin4}
            /></View>
        </View>
    )
}

export default OTPPage

const styles = StyleSheet.create({
    optContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: 100
        // width: '100%',
    },
    inputFieldView: {
        width: 50,
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputFieldText: {
        fontSize: 30,
    }
})