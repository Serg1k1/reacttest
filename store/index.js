import { create } from "zustand";

export const useEventStore = create((set) => ({
    events: [],
    timer: 0,
    setEvents: ((newEwents) => set({ events: newEwents })),
    incrementTimer: () => set((state) => ({ timer: state.timer })),
    resetTimer: () => set({ timer: 0 })
}))