import { useTheme } from '@stores/app'
import { Link } from '@tanstack/react-router'
import { Monitor, Moon, Sun } from 'lucide-react'

import { Button } from '../atoms'

export function Navbar() {
  const { isDarkMode, isSystemTheme, toggleDarkMode } = useTheme()

  const getThemeIcon = () => {
    if (isSystemTheme) {
      return <Monitor className="h-4 w-4" />
    }
    return isDarkMode ? (
      <Sun className="h-4 w-4" />
    ) : (
      <Moon className="h-4 w-4" />
    )
  }
  return (
    <header className="border-b border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Reactreezkit
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 [&.active]:font-bold"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 [&.active]:font-bold"
            >
              About
            </Link>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 [&.active]:font-bold"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 [&.active]:font-bold"
            >
              Dashboard
            </Link>

            <Button
              variant="ghost"
              size="xs"
              onClick={toggleDarkMode}
              className="flex items-center gap-2"
              title={`${isSystemTheme ? 'System' : isDarkMode ? 'Dark' : 'Light'} mode`}
            >
              {getThemeIcon()}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
