import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { registerUser } from '../config/redux'
import validator from 'validator'
import Toast from 'react-native-toast-message';
import { StyleSheet, Text, View } from 'react-native'
import { Item, Input, Button, H3, H1, Spinner } from 'native-base';

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    // State
    const [load, setLoad] = useState(false)
    const [fullname, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const registUser = async () => {
        if ((!fullname || !username || !email || !password)) {
            return Toast.show({ type: 'error', text1: 'Please fill the empty form' });
        }

        if (!validator.isEmail(email)) {
            return Toast.show({ type: 'error', text1: 'E-mail format is not valid' });
        }

        let dataRegist = {
            full_name: fullname,
            user_name: username.toLowerCase().replace(/\s/g, ""),
            email: email,
            password
        }

        try {
            setLoad(true)
            let reg = await dispatch(registerUser(dataRegist))
            setLoad(false)
            if (reg.error) {
                return Toast.show({ type: 'error', text1: reg.error })
            } else {
                navigation.navigate('Login')
                return Toast.show({ type: 'success', text1: 'Register success' })
            }
        } catch (e) {
            console.log(e, 'error');
        }
    }


    return (
        <View style={styles.container}>
            <H1 style={styles.title}>Register Here!</H1>
            <Item style={styles.input}>
                <Input onChangeText={(e) => setFullName(e)} placeholder='Full name' />
            </Item>
            <Item style={styles.input}>
                <Input onChangeText={(e) => setUsername(e)} placeholder='Username' />
            </Item>
            <Item style={styles.input}>
                <Input onChangeText={(e) => setEmail(e)} placeholder='Email' />
            </Item>
            <Item style={styles.input}>
                <Input onChangeText={(e) => setPassword(e)} secureTextEntry={true} placeholder='Password' />
            </Item>
            <Button onPress={() => registUser()} style={styles.actBtn} block rounded>
                {!load && (<H3 style={styles.actText}>Register</H3>)}
                {load && (<Spinner color='#fff' styles={styles.spinner} />)}
            </Button>
            <Text>
                Already have an account?
                <Text style={styles.signIn} onPress={() => navigation.navigate('Login')}> Sign in</Text>
            </Text>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    title: {
        marginVertical: 40
    },
    secTitle: {
        fontWeight: 'bold'
    },
    form: {
        flex: 1,
    },
    input: {
        marginVertical: 10
    },
    actBtn: {
        backgroundColor: '#F48024',
        marginVertical: 25
    },
    actText: {
        color: '#FFF',
        fontWeight: '600'
    },
    signIn: {
        color: '#F48024'
    }
})