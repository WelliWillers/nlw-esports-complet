
import logoImg from './assets/logo-nlw-esports@2x.png'
import GameBanner from './components/GameBanner'
import { useEffect, useState } from 'react'

import CriateAdModal from './components/CreateAdModal'
import * as Dialog  from '@radix-ui/react-dialog'
import CreateAdBanner from './components/CreateAdBanner'
import CreateAdModal from './components/CreateAdModal'
import axios from 'axios'

type GameProps = {
  id: string
  name: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {

  const [ games, setGames ] = useState<GameProps[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) => {
      setGames(response.data)
    })
  }, [])
  
  return (
    <div className="w-screen max-w-[1344px] mx-auto flex flex-col justify-center items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw_gradient text-transparent bg-clip-text">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16 self-stretch">
        {
          games.map(game => (
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.name} adsCount={game._count.ads}/>
          ))
        }
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App