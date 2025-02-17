import { createGlobalState } from "react-use"

export const useGlobalVideoOpenId = createGlobalState<string | number>()

export function useVideoOpenState(
  videoId: string | number,
): [
  open: boolean,
  setOpen: (isOpen: boolean) => void,
  otherVideoOpen: boolean,
] {
  const [globalVideoId, setGlobalVideoId] = useGlobalVideoOpenId()

  let isOpen = globalVideoId === videoId
  const setIsOpen = (isOpen: boolean) => {
    setGlobalVideoId(isOpen ? videoId : "")
    isOpen = isOpen
  }

  let otherVideoOpen = Boolean(globalVideoId) && globalVideoId !== videoId

  return [isOpen, setIsOpen, otherVideoOpen]
}
