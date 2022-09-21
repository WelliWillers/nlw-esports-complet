import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../Heading';

import * as clipboard from 'expo-clipboard'
import { useState } from 'react';

interface Props extends ModalProps {
    discord: string
    onClose: () => void
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

    const [ isCoping, setIsCoping ] = useState(false)

    async function handleClipboardDiscord(){
        setIsCoping(true)
        await clipboard.setStringAsync(discord)
        Alert.alert('Discord copiado!', 'Usuário copiado para você colar no discord e encontrar o DUO.') 
        setIsCoping(false)
    }

    return (
        <Modal 
            transparent 
            statusBarTranslucent
            animationType='fade'
            
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>

                    <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                        <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
                    </TouchableOpacity>

                    <CheckCircle 
                        size={64} 
                        color={THEME.COLORS.SUCCESS}
                        weight="bold"
                    />

                    <Heading style={{alignItems: 'center', marginTop: 24}} title="Les't play" subtitle='Agora é só começar a jogar'/>

                    <Text style={styles.label}>
                        Adicione no discord
                    </Text>

                    <TouchableOpacity disabled={isCoping} onPress={handleClipboardDiscord} style={styles.discordButton}>
                        <Text style={styles.discord}>{isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}