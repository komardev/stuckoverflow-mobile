import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';

// Screen
import Login from '../screen/Login'
import Register from '../screen/Register'
import Home from '../screen/Home';
import Profile from '../screen/Profile';
import Discuss from '../screen/Discuss'
import SplashScreen from '../screen/SplashScreen';
import DetailTopic from '../screen/DetailTopic';
import EditTopic from '../screen/EditTopic';


// Redux
import { reLogin } from '../config/redux'
import { useSelector, useDispatch } from 'react-redux'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const ProfileToDetail = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="ProfileToDetail"
                options={{ headerShown: false }}
                component={Profile}
            />
            <Stack.Screen
                name="DetailTopic"
                options={{
                    title: "Detail Topic"
                }}
                component={DetailTopic}
            />
        </Stack.Navigator>
    )
}

const DetailHome = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Stuck Oveflow"
                }}
            />
            <Stack.Screen
                name="DetailTopic"
                options={{
                    title: "Detail Topic"
                }}
                component={DetailTopic}
            />
            <Stack.Screen
                name="EditTopic"
                options={{
                    title: "Edit Topic"
                }}
                component={EditTopic}
            />
        </Stack.Navigator>
    )
}

const MainApp = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'DetailHome') {
                        iconName = 'ios-home'
                    } else if (route.name === 'Discuss') {
                        iconName = 'ios-create'
                    } else if (route.name === 'Profile') {
                        iconName = 'ios-contact'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#F48024',
                inactiveTintColor: 'gray',
                style: {
                    height: 60
                },
                tabStyle: {
                    paddingVertical: 6
                }
            }}
        >
            <Tab.Screen
                name="DetailHome"
                component={DetailHome}
            />
            <Tab.Screen
                name="Discuss"
                component={Discuss}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileToDetail}
            />
        </Tab.Navigator>
    )
}

const Navigation = () => {
    const dataUser = useSelector(state => state.AuthReducer.userData);
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)


    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        setLoad(true)
        const value = await AsyncStorage.getItem('user_data');

        if (value) {
            let data = JSON.parse(value)
            await dispatch(reLogin(data))
        }
        setLoad(false)
    }

    if (load) {
        return <SplashScreen />
    }


    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                {
                    dataUser.length === 0 ? (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                            />
                        </>
                    ) : (
                            <Stack.Screen
                                name="MainApp"
                                component={MainApp}
                            />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Navigation
