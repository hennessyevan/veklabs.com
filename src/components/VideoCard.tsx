import { FloatingPortal } from "@floating-ui/react"
import cx from "classnames"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  MotionConfig,
} from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import {
  containerVariants,
  HOVER_DURATION,
  POPUP_DURATION,
  titleVariants,
  videoVariants,
  type VideoData,
} from "./videoConstants"
import { VideoInformationPopup } from "./VideoPopup"
import classNames from "classnames"

export default function VideoCard({
  className,
  ...videoData
}: VideoData & { className?: string }) {
  const { title, previewURL, category, type = category } = videoData
  const video = useRef<HTMLVideoElement>(null)
  const [hovered, setHovered] = useState(false)
  const [popupIsShown, setPopupIsShown] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isLowPowerMode, setIsLowPowerMode] = useState(false)
  const [popupWasJustShown, setPopupWasJustShown] = useState(false)

  return (
    <MotionConfig transition={{ type: "spring" }}>
      <LayoutGroup id={title}>
        <motion.div
          className={classNames(
            "relative aspect-video size-full max-w-full cursor-pointer snap-start scroll-mx-6 rounded-xl border-neutral-300",
            className,
          )}
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
          animate={
            !popupWasJustShown && !popupIsShown && hovered ? "hover" : undefined
          }
          variants={containerVariants}
          layoutId={`video-${title}`}
          layout
          transition={{ duration: POPUP_DURATION, type: "spring" }}
        >
          <motion.span
            className="pointer-events-none absolute isolate z-10 flex items-center text-xs shadow-neutral-950 duration-200 text-shadow-lg [--bottom:16px] [--hover-bottom:14px] [--hover-left:14px] [--left:14px] sm:text-xl sm:font-semibold lg:[--bottom:36px] lg:[--hover-bottom:24px] lg:[--hover-left:24px] lg:[--left:24px]"
            variants={titleVariants}
            initial="initial"
            animate={hovered && !popupWasJustShown ? "hover" : "initial"}
            layoutId={`video-title-${title}`}
            layout="preserve-aspect"
            transition={{
              duration: HOVER_DURATION / 0.85,
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
                  className="absolute left-4 z-10 inline-flex items-center text-xxs uppercase tracking-widest opacity-50 md:text-xs lg:left-6"
                  initial={{ bottom: "clamp(20px,5vw,40px)", opacity: 0 }}
                  animate={{ bottom: "clamp(30px,5.5vw,55px)", opacity: 0.5 }}
                  transition={{
                    duration: HOVER_DURATION,
                    delay: HOVER_DURATION / 2,
                  }}
                >
                  {type && (
                    <motion.span
                      initial={{ opacity: 0, x: "-10%", width: 0 }}
                      animate={{ opacity: 1, x: "0%", width: "auto" }}
                      exit={{ opacity: 0, x: "-10%" }}
                      transition={{ delay: 1, duration: 2, type: "spring" }}
                      className="mr-2 inline-flex gap-2 overflow-clip whitespace-nowrap uppercase tracking-widest"
                    >
                      {type}
                    </motion.span>
                  )}
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
              <motion.div
                className={cx(
                  "absolute inset-0 aspect-video size-full overflow-hidden rounded-xl object-cover duration-300",
                )}
                initial={{
                  opacity: 0,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                exit={{ opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: HOVER_DURATION / 2 }}
              >
                {videoData.children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <FloatingPortal id="video-popup">
          <AnimatePresence
            mode="popLayout"
            onExitComplete={() => setPopupWasJustShown(false)}
          >
            {popupIsShown ? (
              <VideoInformationPopup
                isOpen={popupIsShown}
                onOpenChange={(isShown) => {
                  if (!isShown) {
                    setPopupWasJustShown(true)
                  }
                  setPopupIsShown(isShown)
                }}
                {...videoData}
              />
            ) : null}
          </AnimatePresence>
        </FloatingPortal>
      </LayoutGroup>
    </MotionConfig>
  )
}
