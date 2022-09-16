
import logoImg from './assets/logo-nlw-esports@2x.png'
import { GameController, MagnifyingGlassPlus } from 'phosphor-react' 
import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import { useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import Input from './components/Form/input'

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
    fetch('http://localhost:3333/games')
      .then((res) => res.json())
      .then((data) => {
        setGames(data)
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
        <CreateAdBanner/>

        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl text-white font-black'>Publicar um anuncio</Dialog.Title>
            <form action="text" className='mt-8 max-w-full flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold' htmlFor="game">Qual o game?</label>
                <Input type="text" id="game" placeholder='Selecione o game que deseja jogar' />
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome ou Nickname?</label>
                <Input type="text" id="name" placeholder='Como te chamam dentro do game' />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input type="number" id="yearsPlaying" placeholder='Tudo bem ser 0' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu discord?</label>
                  <Input type="number" id="discord" placeholder='Usuário#0000' />
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <div className='flex justify-between items-center gap-1'>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Domingo">D</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Segunda">S</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Terça">T</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Quarta">Q</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Quinta">Q</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Sexta">S</button>
                  <button type="button" className="w-12 h-12 rounded bg-zinc-900 hover:bg-violet-500" title="Sábado">S</button>
                </div>
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-2'>
                  <Input type="time" id="hourStart" placeholder='De' />
                  <Input type="time" id="hourEnd" placeholder='Até' />
                </div>
              </div>

              <div className=' mt-2 flex gap-4'>
                <Input type="checkbox" name="" id="" /> Costumo me conectar ao chat de voz
              </div>

              <footer className='flex justify-end items-center gap-4 mt-4'>
                <Dialog.Close type="button" className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                <button type="button" className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-2 hover:bg-violet-600'>
                  <GameController size={24} />  
                  Encontrar DUO
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App