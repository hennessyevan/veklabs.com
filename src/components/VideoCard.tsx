import {
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import type { CollectionEntry } from "astro:content"
import cx from "classnames"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
  type Variants,
} from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react"

type VideoData = CollectionEntry<"video">["data"]

const SPEED_MULTIPLIER = 1
const POPUP_DURATION = 0.75 / SPEED_MULTIPLIER
const HOVER_DURATION = 0.75 / SPEED_MULTIPLIER

const containerVariants: Variants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px black",
  },
}

const videoVariants: Variants = {
  hover: {
    boxShadow: "0 0 0 1.5px red",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
  },
  loading: {
    opacity: 0,
    filter: "blur(0px)",
  },
  initial: {
    opacity: 0,
    filter: "blur(5px)",
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
  },
}

const titleVariants: Variants = {
  initial: {
    opacity: 1,
    bottom: 24,
    left: 36,
  },
  hover: {
    left: 24,
    bottom: 24,
    opacity: 0.6,
  },
}

export default function VideoCard(videoData: VideoData) {
  const { title, previewURL, type, image } = videoData
  const video = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [popupIsShown, setPopupIsShown] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const [popupWasJustShown, setPopupWasJustShown] = useState(false)

  useEffect(() => {
    if (popupIsShown) {
      setPopupWasJustShown(true)
    }

    if (popupWasJustShown && !popupIsShown) {
      setPopupWasJustShown(false)
    }

    return () => {
      setPopupWasJustShown(false)
    }
  }, [popupIsShown])

  return (
    <MotionConfig transition={{ type: "spring" }}>
      <LayoutGroup id={title}>
        <motion.div
          className="relative aspect-video size-full max-w-full cursor-pointer snap-start scroll-mx-6 rounded-xl border-neutral-300"
          style={{
            zIndex: popupIsShown
              ? 100
              : hovered || popupWasJustShown
                ? 1
                : undefined,
          }}
          onMouseEnter={() => !popupWasJustShown && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setPopupIsShown(true)}
          variants={containerVariants}
          whileHover={!popupWasJustShown && !popupIsShown ? "hover" : undefined}
          layoutId={`video-${title}`}
          layout
          transition={{ duration: POPUP_DURATION, type: "spring" }}
        >
          <motion.span
            className="pointer-events-none absolute isolate z-10 flex items-center text-xs shadow-neutral-950 duration-200 text-shadow-lg sm:text-lg sm:font-semibold"
            variants={titleVariants}
            initial="initial"
            animate={hovered && !popupWasJustShown ? "hover" : "initial"}
            layoutId={`video-title-${title}`}
            layout="preserve-aspect"
            transition={{
              duration: HOVER_DURATION / 1.25,
              type: "spring",
              layout: { type: "spring", duration: POPUP_DURATION / 2 },
            }}
          >
            {title}
            <AnimatePresence>
              {!loaded && hovered && !isLowPowerMode && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: HOVER_DURATION }}
                >
                  <Loader2 className="ml-2 size-4 animate-spin" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          <AnimatePresence>
            {hovered && (
              <AnimatePresence>
                <motion.span
                  className="absolute left-6 z-10 inline-flex items-center text-xs uppercase tracking-widest opacity-50"
                  initial={{ bottom: 40, opacity: 0 }}
                  animate={{ bottom: 55, opacity: 0.5 }}
                  transition={{
                    duration: HOVER_DURATION,
                    delay: HOVER_DURATION / 2,
                  }}
                >
                  {/* {type && (
                <motion.span
                  // initial={{ opacity: 0, x: "-10%" }}
                  // animate={{ opacity: 1, x: "0%" }}
                  // exit={{ opacity: 0, x: "-10%" }}
                  // transition={{ delay: 1, duration: 1 }}
                  className={cx("uppercase tracking-widest")}
                >
                  {type}
                  {" |  "}
                </motion.span>
              )} */}
                  Learn More
                  <ArrowRight className="ml-1 size-3" />
                </motion.span>
              </AnimatePresence>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hovered && !isLowPowerMode && (
              <motion.video
                controls={false}
                onUpdate={() => {
                  if (isLowPowerMode) return
                  video.current?.play().catch((error) => {
                    if (error.name === "NotAllowedError") {
                      setIsLowPowerMode(true)
                    }
                  })
                }}
                className="size-full overflow-hidden rounded-xl object-cover"
                src={previewURL}
                variants={videoVariants}
                initial="initial"
                animate={loaded ? "animate" : "loading"}
                exit="exit"
                transition={{ duration: HOVER_DURATION / 2 }}
                preload="none"
                autoPlay
                muted
                playsInline
                loop
                ref={video}
                onLoadedData={() => setLoaded(true)}
                onTimeUpdate={(e) => {
                  if (e.currentTarget.currentTime > 10) {
                    e.currentTarget.currentTime = 0
                  }
                }}
                onError={(e) => console.error(e)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence initial={false}>
            {(!hovered || !loaded) && (
              <motion.img
                className={cx(
                  "absolute inset-0 aspect-video size-full rounded-xl object-cover duration-300",
                )}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: HOVER_DURATION / 2 }}
                src={image}
                loading="lazy"
                alt=""
              />
            )}
          </AnimatePresence>
        </motion.div>

        <VideoInformationPopupWrapper
          isOpen={popupIsShown}
          onOpenChange={setPopupIsShown}
          {...videoData}
        />
      </LayoutGroup>
    </MotionConfig>
  )
}

type VideoInformationPopupProps = VideoData & {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

function VideoInformationPopupWrapper({
  children,
  ...props
}: PropsWithChildren<VideoInformationPopupProps>) {
  const { isOpen } = props
  return (
    <FloatingPortal id="video-popup">
      <AnimatePresence mode="popLayout">
        {isOpen ? <VideoInformationPopup {...props} /> : null}
      </AnimatePresence>
    </FloatingPortal>
  )
}

const VideoInformationPopup = forwardRef<
  HTMLDivElement,
  VideoInformationPopupProps
>(
  (
    { previewURL, image, description, isOpen, title, type, onOpenChange },
    forwardedRef,
  ) => {
    const { refs, context } = useFloating({
      open: true,
      onOpenChange,
    })

    const dismiss = useDismiss(context)

    const { getFloatingProps } = useInteractions([dismiss])

    return (
      <FloatingOverlay
        ref={forwardedRef}
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
                className="absolute aspect-video w-full rounded-xl object-cover shadow-lg shadow-neutral-950 ring-2 ring-white/5"
                src={previewURL}
                poster={image}
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
              <motion.div className="mb-20 aspect-video w-full min-w-96" />
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
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
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
                    {description && (
                      <>
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Description
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </p>
                      </>
                    )}
                  </div>
                  <div className="mb-auto flex min-h-36 w-56 flex-col gap-3 rounded-xl bg-neutral-200/10 p-6 ring-1 ring-white/15">
                    {type && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest">
                          Category
                        </span>
                        <span>{type}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </FloatingOverlay>
    )
  },
)
