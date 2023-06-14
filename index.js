import "https://unpkg.com/navigo"

import {
  setActiveLink,
  loadTemplate,
  renderTemplate,
  adjustForMissingHash,
} from "./utils.js";


window.addEventListener("load", async () => {
  const templateHome = await loadTemplate("./pages/home/home.html");
  const templateAbout = await loadTemplate("./pages/about/about.html");
  const templateNotFound = await loadTemplate("./pages/notFound/notFound.html");

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
    })
    .notFound(() => {
        renderTemplate(templateNotFound, "content");
    })
    .resolve();
});


/*
async function loginLogoutClick(evt) {
    evt.stopPropagation()  
    responseStatus.innerText = ""
    const logInWasClicked = evt.target.id === "btn-login" ? true : false
    if (logInWasClicked) {
        const loginRequest = {}
        loginRequest.username = userNameInput.value
        loginRequest.password = passwordInput.value
        const options = {
            method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginRequest)
    }
    try {
        const res = await fetch(baseURL + "auth/login", options).then(handleHttpErrors)
        storeLoginDetails(res)
    } catch (err) {
        responseStatus.style.color = "red"
        if (err.apiError) {
            responseStatus.innerText = err.apiError.message
        } else {
            responseStatus.innerText = err.message
        }
    }
} else {
    //Logout was clicked
    clearLoginDetails()
}
}

function storeLoginDetails(res) {
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    localStorage.setItem("roles", res.roles)
    //Update UI
    toogleLoginStatus(true)
    responseStatus.innerText = ""
}


function clearLoginDetails() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    //Update UI
    toogleLoginStatus(false)
    responseStatus.innerText = ""
}


function toogleLoginStatus(loggedIn) {
    loginContainer.style.display = loggedIn ? "none" : "block"
    logoutContainer.style.display = loggedIn ? "block" : "none"
    const statusTxt = loggedIn ? `User: ${localStorage["user"]} (${localStorage["roles"]})` : ""
  userDetails.innerText = statusTxt
}


export function setResponseText(txt, isOK) {
    responseStatus.style.color = isOK ? "darkgreen" : "red"
    responseStatus.innerText = txt
}

*/


