import { Play, Pause, VolumeX, Volume2 } from "lucide-react"
import config from "../config.json"
import { useRef } from "react"
import { useVideo } from "../hooks/useVideo"

const buttonClasses = `size-3 lg:size-4 rounded-lg lg:rounded-xl py-3 px-4 box-content duration-200 fill-white bg-background/65 hover:bg-background/95 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-white/10`

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const { play, pause, isPlaying, isMuted, mute, unmute } = useVideo(video)

  return (
    <div className="w-container mx-auto">
      <div className="max-h-[80vh] overflow-hidden rounded-3 shadow-lg lg:shadow-2xl duration-200 relative">
        <video
          ref={video}
          className="max-h-[80vh] rounded-xl size-full object-cover object-center border-0.5 border-white/10"
          src={config.hero.videoUrl}
          autoPlay
          preload="auto"
          muted={isMuted}
          loop
          playsInline
        />

        {/* <!-- poster={await import(`../images/${config.hero.image}?url`)} --> */}
        <div className="flex absolute top-2 right-2 lg:top-8 lg:right-8 gap-3">
          {isMuted ? (
            <button onClick={unmute}>
              <VolumeX className={buttonClasses} />
              <span className="sr-only">Turn volume on</span>
            </button>
          ) : (
            <button onClick={mute}>
              <Volume2 className={buttonClasses} />
              <span className="sr-only">Turn volume off</span>
            </button>
          )}

          {isPlaying ? (
            <button onClick={pause}>
              <Pause className={buttonClasses} />
              <span className="sr-only">Pause video</span>
            </button>
          ) : (
            <button onClick={play}>
              <Play className={buttonClasses} />
              <span className="sr-only">Play video</span>
            </button>
          )}
        </div>
        <div className=" static text-sm lg:text-lg py-4 px-6 lg:py-6 lg:px-8 rounded-lg lg:rounded-2xl lg:max-w-3xl lg:absolute bottom-8 right-8 ring-1 ring-white/10 shadow-lg lg:shadow-none lg:border-none lg:backdrop-blur-xl bg-background/65 font-medium leading-normal">
          {config.HERO_EXCERPT}
        </div>
      </div>
    </div>
  )
}
