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
import { useEffect, useRef, useState } from "react"

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
          className="relative size-full z-50 aspect-video h-[269px] w-[480px] border-neutral-300 rounded-xl snap-start scroll-mx-6 cursor-pointer"
          style={{ zIndex: hovered || popupIsShown ? 100 : undefined }}
          onMouseEnter={() => !popupWasJustShown && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setPopupIsShown(true)}
          variants={containerVariants}
          whileHover={!popupWasJustShown ? "hover" : undefined}
          layoutId={`video-${title}`}
          transition={{ duration: POPUP_DURATION, type: "spring" }}
        >
          <motion.span
            className="isolate pointer-events-none absolute font-semibold text-lg text-shadow-lg shadow-neutral-950 flex items-center duration-200 z-10"
            variants={titleVariants}
            initial="initial"
            animate={hovered && !popupWasJustShown ? "hover" : "initial"}
            layoutId={`video-title-${title}`}
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

        <VideoInformationPopup
          isOpen={popupIsShown}
          onOpenChange={setPopupIsShown}
          {...videoData}
        />
      </LayoutGroup>
    </MotionConfig>
  )
}

function VideoInformationPopup({
  previewURL,
  image,
  isOpen,
  title,
  onOpenChange,
}: VideoData & {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}) {
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange,
  })

  const dismiss = useDismiss(context)

  const { getFloatingProps } = useInteractions([dismiss])

  return (
    <FloatingPortal id="video-popup">
      {isOpen && <FloatingOverlay id="video-popup" lockScroll />}
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            className="w-screen h-screen fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-3xl"
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
          >
            <motion.div
              ref={refs.setFloating}
              {...getFloatingProps()}
              style={floatingStyles}
              className="w-full"
            >
              <motion.div className="w-container max-w-7xl p-10 mx-auto">
                <motion.video
                  layoutId={`video-${title}`}
                  controls={false}
                  className="object-cover size-full aspect-video rounded-xl shadow-2xl ring-2 ring-white/5 shadow-neutral-950"
                  src={previewURL}
                  poster={image}
                  transition={{
                    duration: POPUP_DURATION / 2,
                    layout: { type: "spring", duration: POPUP_DURATION },
                  }}
                  preload="none"
                  autoPlay
                  playsInline
                  onError={(e) => console.error(e)}
                />
                <div className="h-10" />
                <motion.span
                  className="absolute z-50 pointer-events-none font-semibold text-2xl text-shadow-lg shadow-neutral-950 flex items-center"
                  layoutId={`video-title-${title}`}
                  transition={{
                    duration: POPUP_DURATION / 2,
                    type: "spring",
                    layout: { duration: POPUP_DURATION / 2 },
                  }}
                >
                  {title}
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </FloatingPortal>
  )
}
