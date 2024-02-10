import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Appearance } from "./Appearance";
import { General } from "./General";
import { Button } from "@/components/ui/button";
import { Cross1Icon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useGlobalDialog } from "@/components/dialog/context";

export type SettingItemData = {
  name: string;
  content: ReactNode;
}

const systemSetings: SettingItemData[] = [
  {
    name: "General",
    content: <General />
  },
  {
    name: "Appearance",
    content: <Appearance />
  }
]

export function Settings() {
  const [settings, setSettings] = useState<SettingItemData[]>(systemSetings)
  const [selected, setSelected] = useState<SettingItemData | null>(null)

  const { t } = useTranslation();
  const { close } = useGlobalDialog()

  const getItemClass = (item: SettingItemData) => {
    if (item === selected) {
      return "bg-primary text-primary-foreground"
    }
    return "hover:bg-accent hover:text-accent-foreground"
  }

  useEffect(() => {
    if (selected === null) {
      setSelected(settings[0])
    }
  }, [])

  return (
    <div className="h-full w-full text-sm flex flex-col">
      <div className="text-right">
        <Button variant="ghost" onClick={() => close()}>
          <Cross1Icon />
        </Button>
      </div>
      <div className="flex flex-1">
        <div className="w-[180px]">
          <div className="text-sm text-gray-500 mb-2 px-2">{t("options")}</div>
          <div>
            {settings.map(s =>
              <div key={s.name}
                className={cn("cursor-default py-1 px-2 rounded-sm", getItemClass(s))}
                onClick={() => setSelected(s)}>
                {t(s.name)}
              </div>)}
          </div>
        </div>
        <div className="flex-1 bg-background ml-10 mr-10">
          {selected?.content}
        </div>
      </div>
    </div>
  )
}