import { LOCAL_HOST_API } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";


export function initViewEvents() {

    getEvents()
}



async function getEvents() {
    const options = makeOptions("GET", "", false)

    try{
        const response = await fetch(LOCAL_HOST_API + "events", options).then(handleHttpErrors)
        fillHTML(response)
        // paginate here? simple solution first, you only got so many hours
        
    } catch (error) {
        console.log(error)
    }

}


function fillHTML(events) {
    const content =  document.getElementById("cards");
    const html = events.map( event => 
        `
        <div class="card shadow p-3 mb-5" style="width:400px; margin:15px">
            <div class="card-body event-body">
                <h4 class="card-title">${event.id} - ${event.name}</h4>
                <p class="card-text">${event.description}</p>
                <button id="event-${event.id}" class="btn btn-primary" type="button">details</button>
            </div>
        </div>
        `
    ).join("\n")

    

    content.innerHTML = DOMPurify.sanitize(html);
}


