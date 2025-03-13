"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UpdateTitle() {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    if (user && user.name) {
      document.title = user.name + " Profile";
    }
  }, [user]);

  return null;
}