import { useEffect, useState } from 'react';
import { styles } from './styles';
import { FlatList, Image, View } from 'react-native';
import LogoImg from '../../assets/logo-nlw-esports.png'

import { GameCard, GameProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {

  const [ games, setGames ] = useState<GameProps[]>([])

  useEffect(() => {
    fetch('http://192.168.0.107:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  const navigation = useNavigation()
  
  function handleOpenGame({id, name, bannerUrl}: GameProps){
    navigation.navigate('game', {
      id,
      name,
      bannerUrl
    })
  }

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        
        <Image
          source={LogoImg}
          style={styles.logo}
        />

        <Heading 
          title="Encontre seu DUO"
          subtitle="Selecione o game que deseja jogar"
        />

        <FlatList 
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

      </SafeAreaView>
    </Background>
  );
} 