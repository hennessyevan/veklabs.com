import {
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import type { ContentEntryMap } from "astro:content"
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

type VideoData = ContentEntryMap["video"][string]["data"]

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
          className="relative size-full aspect-video h-[269px] w-[480px] border-neutral-300 rounded-xl snap-start scroll-mx-6 cursor-pointer"
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
            className="isolate pointer-events-none absolute font-semibold text-lg text-shadow-lg shadow-neutral-950 flex items-center duration-200 z-10"
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
                  <Loader2 className="animate-spin size-4 ml-2" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
          <AnimatePresence>
            {hovered && (
              <AnimatePresence>
                <motion.span
                  className="absolute opacity-50 left-6 z-10 uppercase tracking-widest text-xs inline-flex items-center"
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
                className="object-cover size-full rounded-xl overflow-hidden"
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
                  "object-cover size-full aspect-video absolute inset-0 duration-300 rounded-xl",
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
>(({ previewURL, image, isOpen, title, type, onOpenChange }, forwardedRef) => {
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
      className="w-screen h-screen fixed top-0 left-0 z-50 overscroll-contain"
      onClickCapture={() => onOpenChange(false)}
    >
      <motion.div
        className="bg-neutral-950/70 overflow-y-scroll backdrop-blur-3xl backdrop-saturate-200 backdrop-brightness-200"
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
          <motion.div className="w-container max-w-7xl p-10 mx-auto relative">
            <motion.video
              layoutId={`video-${title}`}
              controls
              className="absolute object-cover aspect-video rounded-xl w-full shadow-lg ring-2 ring-white/5 shadow-neutral-950"
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
              className="z-50 absolute h-5 pointer-events-none font-semibold text-2xl text-shadow-lg shadow-neutral-950 flex items-center"
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
              className="pt-14 flex flex-col gap-6"
            >
              <div className="flex gap-5 justify-between">
                <div className="max-w-prose flex flex-col gap-3">
                  <span className="uppercase tracking-widest text-xs font-bold">
                    Description
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="flex flex-col min-h-36 gap-3 bg-neutral-200/10 rounded-xl ring-1 ring-white/15 p-6 w-56 mb-auto">
                  {type && (
                    <div className="flex flex-col gap-3">
                      <span className="uppercase tracking-widest text-xs font-bold">
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
})
