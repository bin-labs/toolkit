import {ReactNode} from "react";
import {cn} from "@/lib/utils";

export function ToolHeader({children, className}: { children: ReactNode, className?: string }) {
	return (
		<h1 className={cn("text-lg font-bold flex items-center", className)}>
			{children}
		</h1>
	)
}