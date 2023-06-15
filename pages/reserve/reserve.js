import { LOCAL_HOST_API } from "../../settings.js";
import { handleHttpErrors,makeOptions, sanitizeStringWithTableRows } from "../../utils.js";




export function initReserve(match) {
    
    if (match?.params?.id) {
        const id = match.params.id;
        document.getElementById("event-id").value = id
    }
    document.getElementById("rsvp-form").onsubmit = submitRSVP
}


async function submitRSVP(e) {
    e.preventDefault();
    const update = document.getElementById("update");
    update.innerText = ""
    update.classList.remove("text-danger")
    update.classList.remove("text-success")
    
    const body = {}
    body.attendee_id = document.getElementById("attendee-id").value
    body.event_id = document.getElementById("event-id").value
    const options = makeOptions("POST", body, false)
    try {
        const response = await fetch(LOCAL_HOST_API + "reserve", options).then(handleHttpErrors)
        update.classList.add("text-success")
        update.innerText = `${response.username} reserved for ${response.event_name} at ${response.reservationDate}`
    } catch (error) {
        update.classList.add("text-danger")
        update.innerText = error.message

        
    }
}



