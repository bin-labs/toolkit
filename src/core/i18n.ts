import i18n, {Resource} from "i18next";
import {initReactI18next} from "react-i18next";

function parseLocalesDir(): Resource {
	const resources: Resource = {}

	const modules = import.meta.glob("@/**/locales/**/*.ts", {eager: true})
	for (const path in modules) {
		const ps = path.split('/')
		const language = ps[ps.length - 2].replace('-', '_')
		let transKey = 'translation'
		if (ps[ps.length - 5] === "modules") {
			transKey = ps[ps.length - 4]
		}
		// 初始化本地的语言配置内容进 resources
		const trans = (modules[path] as any).default
		if (!resources[language]) {
			resources[language] = {}
			resources[language][transKey] = {}
		}
		resources[language][transKey] = {...resources[language][transKey] as any, ...trans}
	}
	return resources
}

export function mergeResources(...resources: Resource[]): Resource {
	const result: Resource = {}
	resources.forEach(res => {
		for (const language in res) {
			if (!result[language]) {
				result[language] = {}
			}
			for (const ns in res[language]) {
				if (!result[language][ns]) {
					result[language][ns] = {}
				}
				Object.assign(result[language][ns], res[language][ns])
			}
		}
	})
	return result
}


function usei18n() {
	const resources = parseLocalesDir()
	i18n
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			resources,
			lng: "zh",
			interpolation: {
				escapeValue: false // react already safes from xss
			}
		});
}

export default usei18n