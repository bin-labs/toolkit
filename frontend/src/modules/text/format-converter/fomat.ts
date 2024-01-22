import {XMLBuilder, XMLParser} from "fast-xml-parser";
import jsyaml from 'js-yaml'

export type FormatData = {
	label: string;
	value: string;
	parse: <T = any>(text: string) => T;
	stringify: <T = any>(data: T) => string;
}

export const formats: FormatData[] = [
	{
		label: "JSON",
		value: "json",
		parse: parseJSON,
		stringify: stringifyJSON
	},
	{
		label: "XML",
		value: "xml",
		parse: parseXML,
		stringify: stringifyXML
	},
	{
		label: "YAML",
		value: "yaml",
		parse: parseYAML,
		stringify: stringifyYAML
	},
]

function parseJSON<T>(test: string): T {
	return JSON.parse(test);
}

function stringifyJSON<T>(data: T): string {
	return JSON.stringify(data, null, 2);
}

function parseXML<T>(test: string): T {
	const parser = new XMLParser()
	return parser.parse(test);
}

function stringifyXML<T>(data: T): string {
	const builder = new XMLBuilder({
		format: true,
	});
	return builder.build(data);
}

function parseYAML<T>(test: string): T {
	return jsyaml.load(test) as T;
}

function stringifyYAML<T>(data: T): string {
	return jsyaml.dump(data);
}
