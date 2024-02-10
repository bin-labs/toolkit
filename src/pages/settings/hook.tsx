import { useGlobalDialog } from "@/components/dialog";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Settings } from "./Settings";

export function useSettings() {
  const [search, setSearch] = useSearchParams()
  const { show } = useGlobalDialog()

  const showSettings = () => {
    show({
      title: 'Settings',
      content: <Settings />,
      disabledCancel: true,
      disabledOk: true,
      disabledTitle: true,
      ContainerCls: "h-[calc(100%-60px)] w-[calc(100%-80px)] pt-0 pr-0  max-w-[1000px]"
    })
  }

  useEffect(() => {
    // Fetch settings
    const ss = search.get('settings') === 'true'
    if (ss) {
      showSettings()
    }
  }, [search])

  return { showSettings }

}