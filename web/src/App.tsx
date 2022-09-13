
import logoImg from './assets/logo-nlw-esports@2x.png'
import { MagnifyingGlassPlus } from 'phosphor-react' 
function App() {

  return (
    <div className="w-screen max-w-[1344px] mx-auto flex flex-col justify-center items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">Seu <span className="bg-nlw_gradient text-transparent bg-clip-text">duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16 self-stretch">
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-1.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-2.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-3.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-4.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-5.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
        <a href="" className="relative rounded-lg overflow-hidden">
          <img className="w-full" src="/games/game-6.png" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
            <strong className="block font-bold text-white ">Nome do jogo</strong>
            <span className="block text-zinc-300 text=sm">4 anúncios </span>
          </div>
        </a>
      </div>

      <div className="pt-1 bg-nlw_gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex flex-row justify-between items-center">
          <div>
            <strong className="text-2xl font-black text-white block pb-2">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>

          <button className="py-3 px-4 flex items-center gap-3 bg-violet-500 text-white rounded hover:bg-violet-600 transition">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>
    </div>
  )
}

export default App