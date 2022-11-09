import { createContext } from "react";

export const EventsContext = createContext<{
	disableEvents: boolean;
	setDisableEvents: React.Dispatch<React.SetStateAction<boolean>>;
}>(null!);
