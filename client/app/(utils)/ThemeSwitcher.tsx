import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();
    useEffect(() => setMounted(true), []);
    if(!mounted) return null;
    return (
        <div className="flex items-center justify-center mx-4">
            {theme === "light"? (
                <Moon onClick={() => setTheme("dark")} fill="black" role="button"  />
            ) : (<Sun onClick={() => setTheme("light")} fill="black" role="button" />)} 
        </div>
    )
}