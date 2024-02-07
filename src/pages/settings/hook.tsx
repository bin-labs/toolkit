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