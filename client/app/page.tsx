"use client"
import {Sun, Moon} from 'lucide-react';
import Header from './(components)/Header';
import { useState } from 'react';


export default function Home() {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0)

  return (
    <div className="font-josefin">
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  )
}