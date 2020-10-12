import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, FlatList, SafeAreaView } from 'react-native'
import { H3, Button, ActionSheet, Icon } from 'native-base';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { sendUserComment, getAllComment, deleteComment } from '../config/redux'
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const DetailTopic = ({ route, navigation }) => {
    const { topic } = route.params;
    const dispatch = useDispatch()
    const dataUser = useSelector(state => state.AuthReducer.userData);
    const [commentInput, setCommentInput] = useState('')
    const [dataComment, setDataComment] = useState('')
    const BUTTONS = [
        { text: "Edit Comment", icon: "create", iconColor: "#faf200" },
        { text: "Delete Comment", icon: "trash", iconColor: "#ed5249" },
        { text: "Cancel", icon: "close", iconColor: "#2c8ef4" }
    ];

    useEffect(() => {
        const allComment = navigation.addListener('focus', () => {
            getComment()
        });
        return allComment;
    }, [navigation])

    const actionSheet = (data) => {
        if (dataUser.id === data.user_id) {
            return (
                ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: 2,
                        title: "Choose action"
                    },
                    async buttonIndex => {
                        if (buttonIndex === 1) {
                            await dispatch(deleteComment({ id: data.id }))
                            getComment()
                            Toast.show({ type: 'success', text1: 'Comment has been deleted!' })
                        } else if (buttonIndex === 0) {
                            navigation.navigate('EditComment', { dataComment: data })
                        }
                    }
                )
            )
        }
    }


    const getComment = async () => {
        try {
            let data = await dispatch(getAllComment({ id: topic.id }))
            setDataComment(data)
        } catch (error) {
            console.log(error);
        }
    }

    const sendComment = async () => {
        try {
            let comment = {
                user_id: dataUser.id,
                topic_id: topic.id,
                comment: commentInput
            }
            let data = await dispatch(sendUserComment(comment))
            if (data.success) {
                setCommentInput('')
                getComment()
                return Toast.show({ type: 'success', text1: data.success });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const rendComment = (item) => {
        let data = item.item
        return (
            <View style={{ backgroundColor: '#fff', marginVertical: 5 }}>
                <TouchableNativeFeedback onLongPress={() => actionSheet(data)} style={{ padding: 10 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ flex: 1 }}>
                            {data.comment}
                        </Text>
                        {dataUser.id === data.user_id && (<Icon ios='ios-grid' android="md-information-circle" style={{ fontSize: 20, color: 'grey', padding: 5 }} />)}
                    </View>
                    <View style={{ display: 'flex', marginTop: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ color: '#F48024', fontWeight: '700' }}>@{data.user_name}</Text>
                        </View>
                        <View>
                            <Text>{moment(data.created_at).format('LL')}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }



    return (
        <ScrollView>
            <View style={{ padding: 10 }}>
                <View style={{ backgroundColor: '#fff', padding: 15 }}>
                    <H3 style={{ fontWeight: '700', borderBottomColor: '#fff', borderBottomWidth: 1 }}>{topic.title}</H3>
                    <Text style={{ fontSize: 16, marginTop: 10 }}>{topic.desc}</Text>
                    <View style={{ display: 'flex', marginTop: 15, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ color: '#F48024', fontWeight: '700' }}>@{topic.user_name}</Text>
                        </View>
                        <View>
                            <Text>{moment(topic.created_at).format('LL')}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{ paddingVertical: 20, fontWeight: '700', borderBottomWidth: 1, borderBottomColor: '#F48024', fontSize: 15 }}>Comments</Text>
                <View>
                    <TextInput value={commentInput} onChangeText={(e) => setCommentInput(e)} style={{ color: '#000', backgroundColor: '#fff', marginVertical: 20, padding: 10 }} placeholder="Write a comment..." />
                    <Button onPress={() => sendComment()} block rounded style={{ backgroundColor: '#F48024', justifyContent: 'center', marginHorizontal: 90 }} >
                        <Text style={{ color: '#fff' }}>Send Comment</Text>
                    </Button>
                </View>
                <View style={{ marginTop: 20 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <FlatList
                            data={dataComment}
                            renderItem={rendComment}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
            </View >
        </ScrollView>
    )
}

export default DetailTopic
