import { App } from "./src/App.js";
const app = new App();
app.mount();

window.addEventListener("unload", () => {
  app.unmount();
});
