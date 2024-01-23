import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react"
import {useTranslation} from "react-i18next";
import {MODULE_NAME} from "@/modules/ai/consts";

export type ComboboxProps = {
	value: string
	items: { label?: string, value: string }[]
	onChange: (value: string) => void
	width?: string
	disableSearch?: boolean
}

export function Combobox(props: ComboboxProps) {
	const {items} = props

	const [open, setOpen] = useState(false)

	const {t} = useTranslation(MODULE_NAME)

	return (
		<Popover open={open} onOpenChange={o => setOpen(o)}>
			<PopoverTrigger asChild>
				<Button variant="outline"
				        role="combobox"
				        aria-expanded={open}
				        className="w-[200px] justify-between"
				        style={{width: props.width}}>
					{props.value
						? items.find((m) => m.value === props.value)?.label
						: t("Select value")}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] max-h-[300px] p-0 overflow-auto"
			                style={{width: props.width}}>
				<Command>
					{!props.disableSearch && <CommandInput placeholder="Search value..."/>}
					{!props.disableSearch && <CommandEmpty>No framework found.</CommandEmpty>}
					<CommandGroup>
						{items.map(model => (
							<CommandItem key={model.value} value={model.value}
							             onSelect={(currentValue: string) => {
								             props.onChange?.(currentValue)
								             setOpen(false)
							             }}>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										props.value === model.value ? "opacity-100" : "opacity-0"
									)}
								/>
								{model.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}