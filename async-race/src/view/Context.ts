import { createContext } from "react"
import Page from "../core/Page"

export type TContext = {
  setPage: (page: Page) => void
}

export default createContext<TContext>({
  setPage: (_page: Page) => {}
});
