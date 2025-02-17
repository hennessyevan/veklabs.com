import {
  FloatingOverlay,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/react"
import type { CollectionEntry } from "astro:content"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { kebabCase } from "lodash-es"
import { useState, type ComponentProps } from "react"

type Props = CollectionEntry<"team">

function CrewImage({ id, src, width, height, alt }: ComponentProps<"img">) {
  return (
    <motion.img
      layoutId={id}
      src={src}
      width={width}
      height={height}
      decoding="async"
      loading="lazy"
      alt={alt}
      className="aspect-square w-40 cursor-pointer rounded-full object-cover shadow-2xl ring-1 ring-gray-50/10 lg:w-52"
    />
  )
}

const MotionOverlay = motion.create(FloatingOverlay)

export default function CrewComponent(member: Props) {
  const id = kebabCase(member.data.name)
  const listFormatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  })
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { refs, context } = useFloating({
    open: modalIsOpen,
    onOpenChange: setModalIsOpen,
  })

  const dismiss = useDismiss(context, { ancestorScroll: true })

  const { getFloatingProps } = useInteractions([dismiss])

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0.2 }}>
      <motion.div
        layoutId={id + "container"}
        className="group relative flex min-w-36 snap-center flex-col items-center gap-6 py-0.5 md:snap-start md:py-10"
        onClick={() => setModalIsOpen(true)}
      >
        <CrewImage
          id={id + "image"}
          src={member.data.image.src}
          alt={member.data.name}
        />
        <motion.div
          layoutId={id + "text"}
          className="center flex flex-col gap-2 text-center"
        >
          <motion.h3
            layoutId={id + "name-title"}
            className="m-0 font-bold uppercase"
          >
            {member.data.name}
          </motion.h3>
          <motion.p
            layoutId={id + "competencies"}
            className="max-w-52 break-words text-sm text-accent-400"
          >
            {listFormatter.format(member.data.competencies)}
          </motion.p>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {modalIsOpen ? (
          <MotionOverlay
            id="crew-popup"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-0 top-0 z-50 flex h-screen min-h-screen w-screen items-center justify-center overscroll-contain bg-black/30 backdrop-blur-lg"
          >
            <motion.div
              {...getFloatingProps()}
              layoutId={id + "container"}
              ref={refs.setFloating}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="my-0 flex w-container max-w-[800px] flex-wrap items-center justify-center gap-8 p-10 text-center text-lg font-medium text-white md:flex-nowrap md:justify-start md:text-start"
            >
              <CrewImage
                id={id + "image"}
                src={member.data.image.src}
                alt={member.data.name}
              />

              <motion.div
                layoutId={id + "text"}
                className="center flex w-full grow flex-col gap-2 self-start py-8 text-start"
              >
                <motion.h3
                  layoutId={id + "name-title"}
                  className="m-0 text-2xl font-bold uppercase"
                >
                  {member.data.name}
                </motion.h3>
                <motion.p
                  layoutId={id + "competencies"}
                  className="text-sm text-accent-400"
                >
                  {listFormatter.format(member.data.competencies)}
                </motion.p>
                <motion.p className="max-w-prose text-sm font-normal text-gray-200">
                  {member.body}
                </motion.p>
              </motion.div>
            </motion.div>
          </MotionOverlay>
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  )
}
