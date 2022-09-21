import { ColorValue, Text, View } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';

interface Props {
    label: string
    value: string
    colorValue?: ColorValue
}

export function DuoInfo(props: Props) {

  

  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            {props.label}
        </Text>
        <Text style={[styles.value, {color: props.colorValue ? props.colorValue : THEME.COLORS.TEXT}]}>
            {props.value}
        </Text>
    </View>
  );
}