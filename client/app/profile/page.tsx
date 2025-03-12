"use client"
import { useState } from "react";
import Header from "../(components)/Header";
import Protected from "../(components)/hooks/protected";
import ProfileComponent from "../(components)/Profile";


export default function Profile() {
      const [open, setOpen] = useState(false);
      const [activeItem, setActiveItem] = useState(0)
      const [route, setRoute] = useState("Login")
    return (
        <div>
            <Protected>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
            <ProfileComponent />
            </Protected>
        </div>
    )
}