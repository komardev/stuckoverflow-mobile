import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, H2, Button, Input, Textarea, Item, H3, Spinner } from 'native-base';
import { getAllTopics, createTopic } from '../config/redux'
import Toast from 'react-native-toast-message';

const Discuss = ({ navigation }) => {
    const dispatch = useDispatch()
    const dataUser = useSelector(state => state.AuthReducer.userData);

    const [load, setLoad] = useState(false)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const postTopic = async () => {
        if ((!title || !desc)) {
            return Toast.show({ type: 'error', text1: 'Please fill the empty form' });
        }
        setLoad(true)
        try {
            let data = {
                user_id: dataUser.id,
                title,
                desc
            }
            let post = await dispatch(createTopic({ data }))
            setTitle('')
            setDesc('')
            Toast.show({ type: 'success', text1: 'Topic Has been created' });
        } catch (error) {
            console.log(error);
        }
        setLoad(false)
    }

    return (
        <Container style={styles.container}>
            <View style={{ flex: 1 }}>
                <H2 style={{ fontWeight: '700', borderBottomWidth: 1, borderBottomColor: '#F48024', textAlign: 'center', padding: 20, paddingTop: 30 }}>Create Topic</H2>
                <View style={{ padding: 20, marginTop: 80 }}>
                    <Item >
                        <Input value={title} onChangeText={(e) => setTitle(e)} placeholder="Your Topic Title" />
                    </Item>
                    <View style={{ marginVertical: 20, marginBottom: 60 }}>
                        <Textarea value={desc} onChangeText={(e) => { setDesc(e) }} style={{ padding: 10 }} rowSpan={6} bordered placeholder="Lets discuss about something..." />
                    </View>
                    <Button onPress={() => postTopic()} block rounded style={{ backgroundColor: '#F48024' }}>
                        {!load && (<H3 style={{ color: '#fff' }}>Post Topic</H3>)}
                        {load && (<Spinner color='#fff' styles={styles.spinner} />)}
                    </Button>
                </View>
            </View>
        </Container>
    )
}

export default Discuss

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 60
    }
})