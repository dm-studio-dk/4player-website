import create from "zustand"

export const usePodcastStore = create(() => ({
    curren: 0,
    paused: false,
}))
