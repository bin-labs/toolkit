import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Command, CommandGroup, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react"

export type ModelSelectProps = {
	value: string
	items: { label?: string, value: string }[]
	onChange: (value: string) => void
}

export function ModelSelect(props: ModelSelectProps) {
	const {items} = props

	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={o => setOpen(o)}>
			<PopoverTrigger asChild>
				<Button variant="outline"
				        role="combobox"
				        aria-expanded={open}
				        className="w-[200px] justify-between">
					{props.value
						? items.find((m) => m.value === props.value)?.label
						: "Select framework..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] max-h-[300px] p-0 overflow-auto">
				<Command>
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