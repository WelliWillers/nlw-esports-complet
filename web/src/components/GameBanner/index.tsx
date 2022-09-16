
type GameBannerProps = {
    bannerUrl: string
    title: string
    adsCount: number
}

export default function GameBanner({
    bannerUrl,
    title,
    adsCount
}:GameBannerProps){
    return (
        <a href="" className="relative rounded-lg overflow-hidden">
            <img className="w-full" src={bannerUrl} alt="" />

            <div className="w-full pt-16 pb-4 px-4 bg-game_gradient absolute bottom-0 right-0 left-0">
                <strong className="block font-bold text-white ">{title}</strong>
                <span className="block text-zinc-300 text=sm">{adsCount} anúncio(s) </span>
            </div>
        </a>
    );
}