import React from 'react'
import { View, Text, TouchableOpacity, Share } from 'react-native'
import styles from './style'

export default function ResultIMC(props){

    const onShare = async () => {
        const result = await Share.share({
            message:`Meu IMC hoje é: ${props.resultImc}`
        })
    }

    return(
        <View style={styles.resultImc}>
            <View style={styles.boxShareButton}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.imc}>{props.resultImc}</Text>
                <TouchableOpacity 
                    style={styles.share}
                    onPress={onShare}
                >
                    <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}