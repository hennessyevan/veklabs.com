import type { ContentEntryMap } from "astro:content"
import cx from "classnames"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
// import { kebabCase } from "lodash-es"

type VideoData = ContentEntryMap["video"][string]["data"]

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
    x: 0,
    y: 0,
  },
  hover: {
    x: -8,
    y: 8,
    backdropFilter: "saturation(500%)",
    opacity: 0.6,
  },
}

export default function VideoCard({
  title,
  previewURL,
  type,
  image,
}: VideoData) {
  const [hovered, setHovered] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      className="relative size-full aspect-video h-[269px] w-[480px] border-neutral-300 rounded-xl overflow-hidden snap-start scroll-mx-6 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      variants={containerVariants}
      whileHover="hover"
      transition={{ duration: 2, type: "spring" }}
    >
      <motion.span
        className="pointer-events-none absolute bottom-8 left-8 font-semibold text-lg text-shadow-lg shadow-neutral-950 flex items-center duration-200 z-10"
        variants={titleVariants}
        initial="initial"
        animate={hovered ? "hover" : "initial"}
        transition={{ duration: 1.5, type: "spring" }}
      >
        {title}
        <AnimatePresence>
          {!loaded && hovered && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Loader2 className="animate-spin size-4 ml-2" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute bottom-12 opacity-50 left-6 z-10 uppercase tracking-widest text-xs inline-flex items-center"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -5, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Learn More
            <ArrowRight className="ml-1 size-3" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* {type && <span className={kebabCase(type)}>{type}</span>} */}

      <AnimatePresence>
        {hovered && (
          <motion.video
            className="object-cover size-full"
            src={previewURL}
            variants={videoVariants}
            initial="initial"
            animate={loaded ? "animate" : "loading"}
            exit="exit"
            transition={{ duration: 0.5 }}
            preload="none"
            autoPlay
            muted
            loop
            onLoadedData={() => setLoaded(true)}
            onTimeUpdate={(e) => {
              if (e.currentTarget.currentTime > 10) {
                e.currentTarget.currentTime = 0
              }
            }}
            playsInline
            onError={(e) => console.error(e)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {(!hovered || !loaded) && (
          <motion.img
            className={cx(
              "object-cover size-full aspect-video absolute inset-0 duration-300",
            )}
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(5px)" }}
            transition={{ duration: 0.5 }}
            src={image}
            loading="lazy"
            alt=""
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
