"use client";
import { Sun, Moon } from "lucide-react";
import Header from "./(components)/Header";
import { useState } from "react";
import Hero from "./(components)/Hero";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div className="">
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        setActiveItem={setActiveItem}
      />
      <Hero />
    </div>
  );
}
