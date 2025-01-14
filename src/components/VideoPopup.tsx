import {
  FloatingOverlay,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import { useSessionStorage } from "@uidotdev/usehooks"
import { motion } from "motion/react"
import { type Ref } from "react"
import { POPUP_DURATION, type VideoData } from "./videoConstants"

type VideoInformationPopupProps = VideoData & {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  ref: Ref<HTMLDivElement>
}

export function VideoInformationPopup({
  videoURL,
  meta,
  image,
  title,
  body,
  type,
  onOpenChange,
  ref,
}: VideoInformationPopupProps) {
  const [playTime] = useSessionStorage(videoURL, "0")
  const { refs, context } = useFloating({
    open: true,
    onOpenChange,
  })

  const dismiss = useDismiss(context)

  const { getFloatingProps } = useInteractions([dismiss])

  return (
    <FloatingOverlay
      ref={ref}
      id="video-popup"
      lockScroll
      className="fixed left-0 top-0 z-50 h-screen min-h-screen w-screen overscroll-contain"
      onClickCapture={() => onOpenChange(false)}
    >
      <motion.div
        className="h-full overflow-y-scroll bg-neutral-950/70 backdrop-blur-3xl backdrop-brightness-200 backdrop-saturate-200"
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{
          opacity: 1,
          backdropFilter: "blur(64px)",
        }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        transition={{ duration: POPUP_DURATION, type: "spring" }}
        ref={refs.setFloating}
        {...getFloatingProps()}
      >
        <motion.div className="w-full">
          <motion.div className="relative mx-auto w-container max-w-7xl p-10">
            <motion.video
              layoutId={`video-${title}`}
              controls
              onPlay={(e) => {
                if (
                  e.currentTarget &&
                  playTime &&
                  e.currentTarget.currentTime < 2
                ) {
                  e.currentTarget.currentTime = +playTime
                }
              }}
              onTimeUpdate={(e) => {
                if (e.currentTarget) {
                  sessionStorage.setItem(
                    videoURL,
                    `${e.currentTarget.currentTime}`,
                  )
                }
              }}
              className="absolute aspect-video w-full rounded-xl object-cover shadow-lg shadow-neutral-950 ring-2 ring-white/5"
              src={videoURL}
              poster={image.src}
              transition={{
                duration: POPUP_DURATION / 2,
                layout: { type: "spring", duration: POPUP_DURATION },
              }}
              preload="none"
              autoPlay
              playsInline
              onLayoutAnimationComplete={() => {}}
              onError={(e) => console.error(e)}
            />
            <motion.div className="mb-20 aspect-video w-full" />
            <motion.span
              className="pointer-events-none absolute z-50 flex h-5 items-center text-2xl font-semibold shadow-neutral-950 text-shadow-lg"
              layoutId={`video-title-${title}`}
              transition={{
                duration: POPUP_DURATION / 2,
                type: "spring",
                layout: { duration: POPUP_DURATION / 2 },
              }}
              layout="preserve-aspect"
            >
              {title}
            </motion.span>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{
                delay: POPUP_DURATION - POPUP_DURATION / 5,
                type: "spring",
                bounce: 0.35,
                duration: POPUP_DURATION * 2,
                opacity: {
                  type: "tween",
                  duration: POPUP_DURATION * 2,
                  delay: POPUP_DURATION - POPUP_DURATION / 5,
                },
              }}
              className="flex flex-col gap-6 pt-14"
            >
              <div className="flex justify-between gap-5">
                <div className="flex max-w-prose flex-col gap-3">
                  {body && (
                    <>
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Description
                      </span>
                      <p>{body}</p>
                    </>
                  )}
                </div>
                {type || meta ? (
                  <div className="mb-auto flex min-h-36 w-56 flex-col gap-3 rounded-xl bg-neutral-200/10 p-6 ring-1 ring-white/15 md:w-72">
                    {type && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Category
                        </span>
                        <span>{type}</span>
                      </div>
                    )}
                    {meta &&
                      Object.entries(meta as Record<string, string>).map(
                        ([key, value]) => (
                          <motion.div
                            className="flex flex-col"
                            variants={{
                              hidden: { opacity: 0 },
                              visible: { opacity: 1 },
                            }}
                          >
                            <span className="text-xxs uppercase tracking-widest text-accent-300">
                              {key}
                            </span>
                            <span>{value}</span>
                          </motion.div>
                        ),
                      )}
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </FloatingOverlay>
  )
}
