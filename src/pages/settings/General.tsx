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
          <div >{t("language")}</div>
          <div className="text-gray-400 my-1">{t("changeLanguage")}</div>
        </div>
        <Select value={i18n.language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="w-[180px]">
            <SelectItem key="2" value="en">{t("lang.en")}</SelectItem>
            <SelectItem key="1" value="zh">{t("lang.zh")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}