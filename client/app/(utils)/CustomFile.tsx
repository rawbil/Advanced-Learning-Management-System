"use client"

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "../(components)/Loader/Loader";

export const Custom = ({children}: {children: React.ReactNode}) => {
    const {isLoading} = useLoadUserQuery({});
    return (
      <>
      {
        isLoading ? <Loader
         /> : children 
      }
      </>
    )
  }