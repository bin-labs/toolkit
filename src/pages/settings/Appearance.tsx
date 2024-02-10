import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Theme, useTheme } from "@/context/theme"
import { useTranslation } from "react-i18next"

export function Appearance() {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme)
  }

  return (
    <div className="">
      <div className="flex items-center">
        <div className="flex-1">
          <div>{t("settings.aprearence.color")}</div>
          <div className="text-gray-400 my-1">{t("settings.aprearence.colorDescription")}</div>
        </div>
        <Select value={theme} onValueChange={handleThemeChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="w-[160px]">
            <SelectItem key="1" value="system">{t("settings.aprearence.system")}</SelectItem>
            <SelectItem key="2" value="light">{t("settings.aprearence.light")}</SelectItem>
            <SelectItem key="3" value="dark">{t("settings.aprearence.dark")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 