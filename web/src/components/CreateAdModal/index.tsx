import { Check, GameController, MagnifyingGlassPlus } from 'phosphor-react' 
import * as Dialog from '@radix-ui/react-dialog'
import * as CheckBox from '@radix-ui/react-checkbox'
import Input from '../Form/input';
import { FormEvent, useEffect, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';


type GameProps = {
    id: string
    name: string
}

export default function CreateAdModal(){

    const [ games, setGames ] = useState<GameProps[]>([])
    const [ weekDays, setWeekDays ] = useState<string[]>([])
    const [ useVoiceChannel, setUseVoiceChannel ] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games').then((response) => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent){
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)

        const data = Object.fromEntries(formData)

        await axios.post(`http://localhost:3333/games/${data.game}/ads`,  {
            name: data.name,
            yearsPlaying: Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel: useVoiceChannel
        }).then((response) => {
            alert('Deu certo')
        }).catch((error) => {
            alert('Deu erro')
        })
    }


    return (

        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>

            <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl text-white font-black'>Publicar um anuncio</Dialog.Title>
                <form onSubmit={handleCreateAd} action="text" className='mt-8 max-w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold' htmlFor="game">Qual o game?</label>
                        <select 
                            id="game"
                            name="game" 
                            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                            defaultValue=""
                        >
                            <option disabled value="">Selecione o game que deseja jogar</option>
                            {
                                games.map(game => (
                                    <option value={game.id} key={game.id}>{game.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome ou Nickname?</label>
                        <Input type="text" id="name" name="name" placeholder='Como te chamam dentro do game' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col gap-2'>
                        <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                        <Input type="number" id="yearsPlaying" name="yearsPlaying" placeholder='Tudo bem ser 0' />
                        </div>

                        <div className='flex flex-col gap-2'>
                        <label htmlFor="discord">Qual o seu discord?</label>
                        <Input type="text" id="discord" name="discord" placeholder='Usuário#0000' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                            <ToggleGroup.Root value={weekDays} onValueChange={setWeekDays} type='multiple' className='flex justify-between items-center gap-1'>
                                <ToggleGroup.Item value="0" type="button" className={`w-12 h-12 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Domingo">D</ToggleGroup.Item>
                                <ToggleGroup.Item value="1" type="button" className={`w-12 h-12 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Segunda">S</ToggleGroup.Item>
                                <ToggleGroup.Item value="2" type="button" className={`w-12 h-12 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Terça">T</ToggleGroup.Item>
                                <ToggleGroup.Item value="3" type="button" className={`w-12 h-12 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Quarta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="4" type="button" className={`w-12 h-12 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Quinta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="5" type="button" className={`w-12 h-12 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Sexta">S</ToggleGroup.Item>
                                <ToggleGroup.Item value="6" type="button" className={`w-12 h-12 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900' }`} title="Sábado">S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                    </div>

                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="hourStart">Qual horário do dia?</label>
                        <div className='grid grid-cols-2 gap-2'>
                        <Input type="time" id="hourStart" name="hourStart" placeholder='De' />
                        <Input type="time" id="hourEnd" name="hourEnd" placeholder='Até' />
                        </div>
                    </div>

                    <label className=' mt-2 flex gap-4 items-center'>
                        <CheckBox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if(checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }} 
                            className='w-6 h-6 p-1 rounded bg-zinc-900'
                        >
                            <CheckBox.Indicator >
                                <Check className='w-4 h-4 text-emerald-400'/>
                            </CheckBox.Indicator>
                        </CheckBox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='flex justify-end items-center gap-4 mt-4'>
                        <Dialog.Close type="button" className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                        <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-2 hover:bg-violet-600'>
                        <GameController size={24} />  
                        Encontrar DUO
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}