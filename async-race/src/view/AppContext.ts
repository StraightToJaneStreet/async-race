import { createContext } from "react"
import { Car } from "../core/Car"
import Page from "../core/Page"

export type AppContext = {
  handleSetPage: (page: Page) => void
  handleCreateCar: (name: string, color: string) => void,
  handleUpdateCar: () => void,
  handleRaceStart: () => void,
  handleGenerateCars: () => void,
  handleReset: () => void
}

export default createContext<AppContext>({
  handleSetPage: (_page) => {},
  handleCreateCar: (_name, _color) => {},
  handleUpdateCar: () => {},
  handleRaceStart: () => {},
  handleGenerateCars: () => {},
  handleReset: () => {}
});
