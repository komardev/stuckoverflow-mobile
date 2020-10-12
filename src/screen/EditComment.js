import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Container, Button, Textarea, H3, Spinner } from 'native-base';
import { editUserComment } from '../config/redux'
import Toast from 'react-native-toast-message';

const EditComment = ({ route, navigation }) => {
    const { dataComment } = route.params;
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)
    const [comment, setComment] = useState(dataComment.comment)

    const editComment = async () => {
        try {
            let data = {
                comment: comment
            }

            setLoad(true)
            let put = await dispatch(editUserComment({ data: data, path: `?id=${dataComment.id}&userId=${dataComment.user_id}` }))
            navigation.goBack()
            Toast.show({ type: 'success', text1: 'Comment has been edited!' })

        } catch (error) {
            console.log(error);
        }
        setLoad(false)
    }

    return (
        <Container style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={{ padding: 20, marginTop: 80 }}>
                    <View style={{ marginVertical: 20, marginBottom: 60 }}>
                        <Textarea value={comment} onChangeText={(e) => { setComment(e) }} style={{ padding: 10 }} rowSpan={6} bordered placeholder="Edit your comment here..." />
                    </View>
                    <Button onPress={() => editComment()} block rounded style={{ backgroundColor: '#F48024' }}>
                        {!load && (<H3 style={{ color: '#fff' }}>Edit Comment</H3>)}
                        {load && (<Spinner color='#fff' styles={styles.spinner} />)}
                    </Button>
                </View>
            </View>
        </Container>
    )
}

export default EditComment

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 60
    }
})