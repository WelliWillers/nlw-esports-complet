import { Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GameRouteParams } from '../../@types/navigation';
import {Entypo} from '@expo/vector-icons'
import { THEME } from '../../theme';
import LogoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { DuoMatch } from '../../components/DuoMatch';


export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const route = useRoute()
  const game = route.params as GameRouteParams
  const navigation = useNavigation()
  

  function hanldeGoBack(){
    navigation.goBack()
  }

  async function handleOpenModal(id: string){
    await fetch(`http://192.168.0.107:3333/ads/${id}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.107:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={hanldeGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
          <Image source={LogoImg} style={styles.logo} />
          <View style={{width: 20, height: 20}}/>
        </View>

        <Image resizeMode='cover' style={styles.cover} source={{uri: game.bannerUrl}}/>

        <Heading title={game.name} subtitle='Conecte-se e comece a jogar' />

        {
          duos.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={duos}
              contentContainerStyle={styles.contentList}
              style={styles.containerList}
              keyExtractor={item => item.id}
              renderItem={(item) => (
                <DuoCard onConect={() => handleOpenModal(item.item.id)} item={item.item} />
              )}
            />
          ) : (
            <Text 
              style={styles.empatyListStyle}
            >
              Não há nenhum DUO cadastrado para este game no momento, tente novamente mais tarde.
            </Text>
          )
        }

        <DuoMatch
          onClose={() => setDiscordDuoSelected('')}
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
        />
        
      </SafeAreaView>
    </Background>
  );
}