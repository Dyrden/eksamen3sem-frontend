import "https://unpkg.com/navigo"

import {
  setActiveLink,
  loadTemplate,
  renderTemplate,
  adjustForMissingHash,
} from "./utils.js";
import { initAddEvent } from "./pages/addEvent/addEvent.js";
import { initViewEvents } from "./pages/viewEvents/viewEvents.js";
import { initFindEvent } from "./pages/findEvent/findEvent.js";

window.addEventListener("load", async () => {
  const templateHome = await loadTemplate("./pages/home/home.html");
  const templateAbout = await loadTemplate("./pages/about/about.html");
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html");
  const templateAddEvent = await loadTemplate("./pages/addEvent/addEvent.html");
  const templateViewEvents = await loadTemplate("./pages/viewEvents/viewEvents.html");
  const templateFindEvent = await loadTemplate("./pages/findEvent/findEvent.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });

  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({  
      "/": () => {
        renderTemplate(templateHome, "content")
      }, 
      "/about": () => {
        renderTemplate(templateAbout, "content");
      }, 
      "/addEvent": () => {
        renderTemplate(templateAddEvent, "content");
        initAddEvent()
      }, 
      "/viewEvents": () => {
        renderTemplate(templateViewEvents, "content");
        initViewEvents()
      },
      "/findEvent": (match) => {
        console.log(match)
        renderTemplate(templateFindEvent, "content");
        initFindEvent(match)
      },  
    })
    .notFound(() => {
        renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
