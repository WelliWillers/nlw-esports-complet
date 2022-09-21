import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { THEME } from '../../theme';
import { styles } from './styles';

interface GameCardProps extends TouchableOpacityProps {
  data: GameProps
} 

export type GameProps = {
  id: string;
  name: string;
  bannerUrl: string
  _count: {
    ads: number;
  }
}

export function GameCard({data, ...rest}: GameCardProps){
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={{uri: data.bannerUrl}}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.name}
          </Text>
          <Text style={styles.ads}>
            {data._count.ads} anúncio(s)
          </Text>
        </LinearGradient>
      </ImageBackground>

      
    </TouchableOpacity>
  );
}