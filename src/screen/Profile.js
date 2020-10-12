import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, H3, H2, H1, Button, ActionSheet, Card, Body, CardItem } from 'native-base';
import { logoutUser, getTopicUser } from '../config/redux'
import ListTopic from '../components/ListTopic'

const Profile = ({ navigation }) => {
    const dataUser = useSelector(state => state.AuthReducer.userData);
    const dispatch = useDispatch()
    const [user, setUser] = useState('')
    const [topic, setTopic] = useState('')
    const BUTTONS = [
        { text: "Log out", icon: "power", iconColor: "#ed5249" },
        { text: "Cancel", icon: "close", iconColor: "#2c8ef4" }];

    useEffect(() => {
        const userTopic = navigation.addListener('focus', () => {
            getUserTopic()
            setUser(dataUser)
        });
        return userTopic;
    }, [navigation])

    const getUserTopic = async () => {
        try {
            let data = await dispatch(getTopicUser({ id: dataUser.id }))
            setTopic(data)
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        await dispatch(logoutUser())
    }

    const actionSheet = () => {
        return (
            ActionSheet.show(
                {
                    options: BUTTONS,
                    cancelButtonIndex: 1,
                    title: "Choose action"
                },
                buttonIndex => {
                    if (buttonIndex === 0) {
                        return logOut()
                    }
                }
            )
        )
    }
    console.log(topic);

    return (
        <Container style={styles.container}>
            <View style={{ alignItems: 'center', backgroundColor: '#eaeaea', paddingTop: 65, paddingBottom: 30, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                <Image
                    source={{ uri: `https://i.ibb.co/wwgQXYm/default.png` }}
                    style={{ width: 100, height: 100, borderRadius: 100, borderColor: '#F48024', borderWidth: 2 }}
                />
                <H1 style={{ paddingTop: 20, paddingBottom: 10, textAlign: 'center', fontWeight: 'bold' }}>@{user.user_name}</H1>
                <Text style={{ fontSize: 15, textAlign: 'center' }}>{user.email}</Text>
                <Button block rounded style={{ backgroundColor: '#F48024', justifyContent: 'center', marginHorizontal: 120, marginTop: 20 }} onPress={() => actionSheet()} >
                    <Text style={{ color: '#fff' }}>Action</Text>
                </Button>
            </View>
            <View style={{ flex: 1 }}>
                <H2 style={{ padding: 20, fontWeight: '700', borderBottomWidth: 1, borderBottomColor: '#F48024' }}>My Topic</H2>
                <View style={{ padding: 20 }}>
                    <ListTopic getData={() => getUserTopic()} data={topic} />
                </View>
                {!topic.length && (
                    <View style={{ marginTop: 100, alignItems: 'center' }}>
                        <H2>Topic Not Founds!</H2>
                    </View>
                )}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 60
    }
})

export default Profile