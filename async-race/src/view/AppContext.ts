import { createContext } from "react"
import Page from "../core/Page"

export type AppContext = {
  handleSetPage: (page: Page) => void

  handleCarStart: (carId: number) => void,
  handleCarReset: (carId: number) => void,

  handleUpdateCar: () => void,
  handleRaceStart: (carIds: number[]) => void,
  handleReset: () => void
}

export default createContext<AppContext>({
  handleSetPage: (_page) => {},

  handleCarStart: (_carId: number) => {},
  handleCarReset: (_carId: number) => {},

  handleUpdateCar: () => {},
  handleRaceStart: (_carIds: number[]) => {},
  handleReset: () => {}
});
