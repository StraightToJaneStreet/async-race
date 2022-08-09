import { createContext } from "react"
import Page from "../core/Page"

export type AppContext = {
  handleSetPage: (page: Page) => void
  handleCreateCar: (name: string, color: string) => void,

  handleCarStart: (carId: number) => void,
  handleCarRemove: (carId: number) => void,

  handleUpdateCar: () => void,
  handleRaceStart: (carIds: number[]) => void,
  handleGenerateCars: () => void,
  handleReset: () => void
}

export default createContext<AppContext>({
  handleSetPage: (_page) => {},
  handleCreateCar: (_name, _color) => {},

  handleCarStart: (_carId: number) => {},
  handleCarRemove: (_carId: number) => {},

  handleUpdateCar: () => {},
  handleRaceStart: (_carIds: number[]) => {},
  handleGenerateCars: () => {},
  handleReset: () => {}
});
