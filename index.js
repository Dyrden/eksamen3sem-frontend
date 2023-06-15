import "https://unpkg.com/navigo";

import {
  setActiveLink,
  loadTemplate,
  renderTemplate,
  adjustForMissingHash,
} from "./utils.js";
import { initAddEvent } from "./pages/addEvent/addEvent.js";
import { initViewEvents } from "./pages/viewEvents/viewEvents.js";
import { initFindEvent } from "./pages/findEvent/findEvent.js";
import { initEditEvent } from "./pages/editEvent/editEvent.js";
import { initReserve } from "./pages/reserve/reserve.js";
import { initRemoveReserve } from "./pages/removeReserve/removeReserve.js";

window.addEventListener("load", async () => {
  const templateHome = await loadTemplate("./pages/home/home.html");
  const templateAbout = await loadTemplate("./pages/about/about.html");
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html");
  const templateAddEvent = await loadTemplate("./pages/addEvent/addEvent.html");
  const templateViewEvents = await loadTemplate(
    "./pages/viewEvents/viewEvents.html"
  );
  const templateFindEvent = await loadTemplate(
    "./pages/findEvent/findEvent.html"
  );
  const templateEditEvent = await loadTemplate(
    "./pages/EditEvent/EditEvent.html"
  );
  const templateReserve = await loadTemplate(
    "./pages/reserve/reserve.html"
  );
  const templateRemoveReserve = await loadTemplate(
    "./pages/removeReserve/removeReserve.html"
    
  );

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
        renderTemplate(templateHome, "content");
      },
      "/about": () => {
        renderTemplate(templateAbout, "content");
      },
      "/addEvent": () => {
        renderTemplate(templateAddEvent, "content");
        initAddEvent();
      },
      "/viewEvents": () => {
        renderTemplate(templateViewEvents, "content");
        initViewEvents();
      },
      "/findEvent": (match) => {
        renderTemplate(templateFindEvent, "content");
        initFindEvent(match);
      },
      "/editEvent": (match) => {
        renderTemplate(templateEditEvent, "content");
        initEditEvent(match);
      },
      "/reserve": (match) => {
        renderTemplate(templateReserve, "content");
        initReserve(match);
      },
      "/removeReserve": () => {
        renderTemplate(templateRemoveReserve, "content");
        initRemoveReserve()
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});
