import { LOCAL_HOST_API } from "../../settings.js";
import { handleHttpErrors,makeOptions } from "../../utils.js";

export function initFindEvent(match) {

    document.getElementById("find-event-form").onsubmit = getEvent

    if (match?.params?.id) {
        const id = match.params.id;
        renderEvent(id);
    }
}






export function getEvent(event) {
    event.preventDefault();
    const id = document.getElementById("event-id").value;
    try {
      renderEvent(id);
      const queryString = "?id=" + id;
  
      window.router.navigate(`/findEvent${queryString}`, {
        callHandler: false,
        updateBrowserURL: true,
      });
    } catch (err) {
      console.log(err.message);
    }
}




async function renderEvent(id) {
    const update = document.getElementById("update")
    try {
        update.innerText = ""
        const options = makeOptions("GET", "", false);
        const response = await fetch(LOCAL_HOST_API + "events/" + id, options).then(handleHttpErrors);
        makeHTML(response)

    } catch (error) {
        update.innerText = error.message
        update.classList.add("text-danger")
        console.log(error)
    }
}




function makeHTML(event) {
    const content =  document.getElementById("card");
    const html =  
        `
        <div class="card shadow p-3 mb-5" style="width:400px; margin:15px">
            <div class="card-body event-body">
                <h4 class="card-title">${event.id} - ${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <button id="event-${event.id}" class="btn btn-primary" type="button">details</button>
            </div>
        </div>
        `
    

    content.innerHTML = DOMPurify.sanitize(html);

}