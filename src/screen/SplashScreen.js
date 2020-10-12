import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                resizeMode="contain"
                style={styles.image}
                source={
                    require('../assets/images/so-logo.png')
                }
            />
            <ActivityIndicator size="large" color="#F48024" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    image: {
        width: 220,
        height: 60,
        marginBottom: 20
    }

})

export default SplashScreen
