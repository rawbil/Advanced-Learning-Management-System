"use client"
import { useTheme } from "@/Context/ThemeContext"
import {Sun, Moon} from 'lucide-react'

export default function Home() {
  const {theme, toggleTheme} = useTheme();
  return (
    <div className="">
      <nav>
        {theme === "dark" ? <Sun className="cursor-pointer place-self-end m-1 dark:text-white text-black" onClick={toggleTheme} /> : <Moon className="cursor-pointer place-self-end m-1 dark:text-white text-black" onClick={toggleTheme} />}
      </nav>
      <h1 className="text-center font-semibold text-xl text-gray-800 dark:text-white">Home</h1>

      <p className="dark:text-white text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. In aperiam, velit officiis voluptatum laboriosam, eius non sint eum error similique esse. Veniam ratione, cumque delectus beatae natus labore nesciunt explicabo.</p>

      <p className="dark:text-green-400 text-[royalblue]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, voluptatem!</p>
    </div>
  )
}