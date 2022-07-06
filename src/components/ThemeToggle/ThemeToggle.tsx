import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@headlessui/react'
import Image from 'next/image'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  function isDark() {
    return theme === 'dark'
  }

  return (
    <div className='flex items-center justify-center bg-gray-100 dark:bg-gray-600 p-[14px] rounded-md'>
      <Image src='/assets/icon-light-theme.svg' alt='' width={18} height={18} />
      <Switch
        checked={isDark()}
        onChange={() => setTheme(isDark() ? 'light' : 'dark')}
        className='bg-purple-500 hover:bg-purple-300 transition-colors relative inline-flex h-5 w-10 items-center mx-6 rounded-full'
      >
        <span className='sr-only'>Enable dark mode</span>
        <span
          className={`${
            isDark() ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-[14px] w-[14px] transform rounded-full bg-white`}
        />
      </Switch>
      <Image src='/assets/icon-dark-theme.svg' alt='' width={15} height={15} />
    </div>
  )
}
