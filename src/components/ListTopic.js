import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { ActionSheet, Icon } from 'native-base';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { deleteTopic } from '../config/redux'
import {
    useSelector, useDispatch
} from 'react-redux'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';




const ListTopic = (props) => {
    const { data, getData } = props
    const dataUser = useSelector(state => state.AuthReducer.userData);
    const dispatch = useDispatch()
    const navigation = useNavigation();

    const BUTTONS = [
        { text: "Edit Topic", icon: "create", iconColor: "#faf200" },
        { text: "Delete Topic", icon: "trash", iconColor: "#ed5249" },
        { text: "Cancel", icon: "close", iconColor: "#2c8ef4" }
    ];

    const actionSheet = (item) => {
        if (dataUser.id === item.user_id) {
            return (
                ActionSheet.show(
                    {
                        options: BUTTONS,
                        cancelButtonIndex: 2,
                        title: "Choose action"
                    },
                    async buttonIndex => {
                        if (buttonIndex === 1) {
                            await dispatch(deleteTopic({ id: item.id }))
                            getData()
                            Toast.show({ type: 'success', text1: 'Topic has been deleted!' })
                        } else if (buttonIndex === 0) {
                            navigation.navigate('EditTopic', { topic: item })
                        }
                    }
                )
            )
        }
    }

    const rendTopic = ({ item }) => {
        return (
            <View style={styles.card}>
                <TouchableNativeFeedback onLongPress={() => actionSheet(item)} onPress={() => navigation.push('DetailTopic', {
                    topic: item
                })} style={{ padding: 10 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, flex: 1 }}>
                            {item.title}
                        </Text>
                        {dataUser.id === item.user_id && (<Icon ios='ios-grid' android="md-information-circle" style={{ fontSize: 20, color: 'grey', marginRight: 5 }} />)}
                    </View>

                    <View style={{ display: 'flex', marginTop: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text style={{ color: '#F48024', fontWeight: '700' }}>@{item.user_name}</Text>
                        </View>
                        <View>
                            <Text>{moment(item.created_at).format('LL')}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={rendTopic}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
        />
    )
}


export default ListTopic
const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        backgroundColor: '#fff',
        marginVertical: 7,
        marginHorizontal: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

    }
})
