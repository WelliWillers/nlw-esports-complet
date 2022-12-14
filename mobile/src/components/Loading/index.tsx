import { ActivityIndicator, View } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styels';

export function Loading() {
  return (
    <View style={styles.container}>
        <ActivityIndicator color={THEME.COLORS.PRIMARY}/>
    </View>
  );
}