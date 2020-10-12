import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Item, Input, Button, H3, H1, Spinner } from 'native-base';
import Toast from 'react-native-toast-message';
import { loginUser } from '../config/redux'
import { useDispatch } from "react-redux";

const Login = ({ navigation }) => {
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [userAcc, setUserAcc] = useState('')
    const [password, setPassword] = useState('')

    const postLogin = async () => {
        if ((!userAcc || !password)) {
            return Toast.show({ type: 'error', text1: 'Please fill the empty form' });
        }

        setLoad(true)
        try {
            let log = await dispatch(loginUser({ userAcc, password }))
            if (log.error) {
                return Toast.show({ type: 'error', text1: log.error })
            } else {
                return Toast.show({ type: 'success', text1: 'Login success' })
            }
        } catch (e) {
            console.log(e);
        }
        setLoad(false)
    }


    return (
        <View style={styles.container}>
            <H1 style={{ marginVertical: 40 }}>Stuck <H1 style={{ fontWeight: 'bold' }}>Overflow</H1></H1>
            <Item style={styles.input}>
                <Input onChangeText={(e) => setUserAcc(e)} placeholder='Email or Username' />
            </Item>
            <Item style={styles.input}>
                <Input onChangeText={(e) => { setPassword(e) }} secureTextEntry={true} placeholder='Password' />
            </Item>
            <Button onPress={() => postLogin()} style={styles.actBtn} block rounded>
                {!load && (<H3 style={{ color: '#fff' }}>Login</H3>)}
                {load && (<Spinner color='#fff' styles={styles.spinner} />)}
            </Button>
            <Text>
                Don't have an account?
                <Text style={styles.signUp} onPress={() => navigation.navigate('Register')}> Sign up</Text>
            </Text>
        </View>
    )
}
export default Login

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
    signUp: {
        color: '#F48024'
    }
})