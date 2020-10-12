import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, H2, Button, Input, Textarea, Item, H3, Spinner } from 'native-base';
import { editUserTopic } from '../config/redux'
import Toast from 'react-native-toast-message';

const EditTopic = ({ route, navigation }) => {
    const { topic } = route.params;
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [title, setTitle] = useState(topic.title)
    const [desc, setDesc] = useState(topic.desc)

    const editTopic = async () => {
        try {
            let data = {
                id: topic.id,
                title: title,
                desc: desc
            }

            setLoad(true)
            let put = await dispatch(editUserTopic({ data: data, path: `?id=${topic.id}&userId=${topic.user_id}` }))
            navigation.navigate('Home')
            Toast.show({ type: 'success', text1: 'Topic has been edited!' })

        } catch (error) {
            console.log(error);
        }
        setLoad(false)
    }

    return (
        <Container style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20, marginTop: 80 }}>
                    <Item >
                        <Input value={title} onChangeText={(e) => setTitle(e)} placeholder="Your Topic Title" />
                    </Item>
                    <View style={{ marginVertical: 20, marginBottom: 60 }}>
                        <Textarea value={desc} onChangeText={(e) => { setDesc(e) }} style={{ padding: 10 }} rowSpan={6} bordered placeholder="Edit your topic here..." />
                    </View>
                    <Button onPress={() => editTopic()} block rounded style={{ backgroundColor: '#F48024' }}>
                        {!load && (<H3 style={{ color: '#fff' }}>Edit Topic</H3>)}
                        {load && (<Spinner color='#fff' styles={styles.spinner} />)}
                    </Button>
                </View>
            </View>
        </Container>
    )
}

export default EditTopic

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 60
    }
})