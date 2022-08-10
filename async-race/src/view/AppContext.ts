import { createContext } from "react"
import Page from "../core/Page"

export type AppContext = {
  handleSetPage: (page: Page) => void
  handleUpdateCar: () => void,
}

export default createContext<AppContext>({
  handleSetPage: (_page) => {},
  handleUpdateCar: () => {},
});
