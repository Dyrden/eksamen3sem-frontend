import { LOCAL_HOST_API } from "../../settings.js"
import { handleHttpErrors, makeOptions } from "../../utils.js"

let spinner

export function initAddEvent() {

    spinner = document.getElementById("spinner");
    //document.getElementById("btn-submit-event").onclick = addEvent
    document.getElementById("add-event-form").onsubmit = addEvent
}

async function addEvent(event) {
    event.preventDefault()  
    const body = getBody()
    const btn = document.getElementById("btn-submit-event");
    const update = document.getElementById("update")
    update.innerText = ""
    try {

        spinner.classList.remove("d-none");
        btn.setAttribute("disabled", "disabled")
        btn.innerText = "Loading..."
        
        const options = makeOptions("POST", body, false)
        await fetch(LOCAL_HOST_API + "events", options).then(handleHttpErrors)
        
        spinner.classList.add("d-none");
        btn.removeAttribute("disabled")
        btn.innerText = "Submit"

        update.innerText = "Event created!" 
        update.classList.add("text-success")
        

    } catch (error ) {
        console.log(error)
        update.innerText = error.message
        update.classList.add("text-danger")
    } 
    
    document.getElementById("event-name").value = ""
    document.getElementById("event-description").value = ""
    document.getElementById("event-capacity").value = ""
    
    document.getElementById("event-date").value = ""
    document.getElementById("event-time").value = ""
   

    // give user verification somehow about how it went.


}


function getBody() {
    const body = {}
    body.name = document.getElementById("event-name").value
    body.description = document.getElementById("event-description").value
    body.capacity = document.getElementById("event-capacity").value
    body.date = document.getElementById("event-date").value + " " + document.getElementById("event-time").value + ":00"
    return body;
}