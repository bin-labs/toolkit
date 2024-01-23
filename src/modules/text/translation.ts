import {useTranslation} from "react-i18next";
import {TEXT_MODULE_NAME} from "@/modules/text/consts";


export const useModuleTranslation = () => {
	return useTranslation(TEXT_MODULE_NAME)
}
