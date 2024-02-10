import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function General() {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (v: string) => {
    i18n.changeLanguage(v)
  }

  return (
    <div>
      <div className="flex items-center">
        <div className="flex-1">
          <div >{t("settings.general.language.name")}</div>
          <div className="text-gray-400 my-1">{t("settings.general.language.description")}</div>
        </div>
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="w-[180px]">
            <SelectItem key="2" value="en">{t("settings.general.language.en")}</SelectItem>
            <SelectItem key="1" value="zh">{t("settings.general.language.zh")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}