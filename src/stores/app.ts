import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface AppState {
  dialogs: Record<string, boolean>
  setShowDialog: (dialogState: Record<string, boolean>) => void
  closeDialog: (dialogName: string) => void
  closeAllDialogs: () => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      dialogs: {},
      setShowDialog: (dialogState: Record<string, boolean>) =>
        set((state: AppState) => ({
          dialogs: { ...state.dialogs, ...dialogState },
        })),
      closeDialog: (dialogName: string) =>
        set((state: AppState) => ({
          dialogs: { ...state.dialogs, [dialogName]: false },
        })),
      closeAllDialogs: () => set(() => ({ dialogs: {} })),
      theme: 'system',
      setTheme: (theme: Theme) => set(() => ({ theme })),
    }),
    {
      name: 'theme',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)

export const useDialogs = () => {
  const dialogs = useAppStore((state) => state.dialogs)
  const setShowDialog = useAppStore((state) => state.setShowDialog)
  const closeDialog = useAppStore((state) => state.closeDialog)
  const closeAllDialogs = useAppStore((state) => state.closeAllDialogs)

  return {
    dialogs,
    setShowDialog,
    closeDialog,
    closeAllDialogs,
    isDialogOpen: (dialogName: string) => Boolean(dialogs[dialogName]),
  }
}

export const useTheme = () => {
  const theme = useAppStore((state) => state.theme)
  const setTheme = useAppStore((state) => state.setTheme)

  // Get the resolved theme (what should actually be applied)
  const getResolvedTheme = () => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }

  const resolvedTheme = getResolvedTheme()

  return {
    theme,
    resolvedTheme,
    setTheme,
    isDarkMode: resolvedTheme === 'dark',
    isSystemTheme: theme === 'system',
    toggleDarkMode: () => {
      if (theme === 'system') {
        // If currently system, switch to the opposite of what system is showing
        const systemIsDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        setTheme(systemIsDark ? 'light' : 'dark')
      } else {
        // Cycle through: light -> dark -> system -> light
        if (theme === 'light') {
          setTheme('dark')
        } else if (theme === 'dark') {
          setTheme('system')
        } else {
          setTheme('light')
        }
      }
    },
  }
}
