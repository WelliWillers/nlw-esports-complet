import { Text, TouchableOpacity, View } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { styles } from './styles';
import { GameController } from 'phosphor-react-native'

export interface DuoCardProps {
    id: string
    hourEnd: string
    hourStart: string
    name: string
    useVoiceChannel: boolean
    weekDays: string[]
    yearsPlaying: number
}

interface Props {
    item: DuoCardProps
    onConect: () => void
}

export function DuoCard({item, onConect}: Props) {

    return (
        <View style={styles.container}>
            <DuoInfo label='Nome' value={item.name} />
            <DuoInfo label='Tempo de jogo' value={`${item.yearsPlaying} ano(s)`} />
            <DuoInfo label='Diponibilidade' value={
                `${item.weekDays.length} dias \u2022 ${item.hourStart} - ${item.hourEnd}`
            } />
            <DuoInfo label='Chamada de áudio' value={item.useVoiceChannel ? 'Sim' : 'Não'} colorValue={item.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT} />

            <TouchableOpacity style={styles.button} onPress={onConect}>
                <GameController
                    color={THEME.COLORS.TEXT}
                    size={20}
                />
                <Text style={styles.buttonText}>Conectar</Text>
            </TouchableOpacity>
        </View>
    );
}