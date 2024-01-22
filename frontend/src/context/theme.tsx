import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	current: "dark" | "light";
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
	current: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	                              children,
	                              defaultTheme = "system",
	                              storageKey = "vite-ui-theme",
	                              ...props
                              }: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme
	);
	const [current, setCurrent] = useState<"dark" | "light">("light");

	useEffect(() => {

	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
			const handle = (e: MediaQueryListEvent) => {
				const newTheme = e.matches ? "dark" : "light";
				setCurrent(newTheme);
			}
			systemTheme.addEventListener("change", handle);
			const sysTheme = systemTheme
				.matches
				? "dark"
				: "light";
			setCurrent(sysTheme);
			return () => {
				systemTheme.removeEventListener("change", handle)
			};
		} else {
			setCurrent(theme)
		}
	}, [theme]);


	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		root.classList.add(current);
	}, [current]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		current,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
