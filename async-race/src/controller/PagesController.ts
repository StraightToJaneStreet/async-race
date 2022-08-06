import Page from "../core/Page";
import { setPage } from "../model/feature/pages/slice";
import store from "../model/store";

export default class PagesController {
  setPage(page: Page) {
    store.dispatch(setPage(page));
  }
}
