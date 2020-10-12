import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Container } from 'native-base';
import { getAllTopics } from '../config/redux'
import ListTopic from '../components/ListTopic'

export default function Profile({ navigation }) {
    const dispatch = useDispatch()
    const [topic, setTopic] = useState('')

    useEffect(() => {
        const allTopic = navigation.addListener('focus', () => {
            getTopic()
        });
        return allTopic;
    }, [navigation])

    const getTopic = async () => {
        try {
            let data = await dispatch(getAllTopics())
            setTopic(data.reverse())
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    <ListTopic getData={() => getTopic()} data={topic} />
                </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})