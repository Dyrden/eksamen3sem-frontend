import { LOCAL_HOST_API } from "../../settings.js";
import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initEditEvent(match) {

    document.getElementById("find-event-form").onsubmit = getEvent
    document.getElementById("edited-event-form").onsubmit = submitEdit

    if (match?.params?.id) {
        const id = match.params.id;
        renderEvent(id);
    }
}






function getEvent(event) {
    event.preventDefault();
    const id = document.getElementById("event-id").value;
    try {
      renderEvent(id);
      const queryString = "?id=" + id;
  
      window.router.navigate(`/editEvent${queryString}`, {
        callHandler: false,
        updateBrowserURL: true,
      });
    } catch (err) {
      console.log(err.message);
    }
}




async function renderEvent(id) {
    const update = document.getElementById("update")
    update.innerText = ""
    update.classList.remove("text-success")
    update.classList.remove("text-danger")

    try {
        const options = makeOptions("GET", "", false);
        const response = await fetch(LOCAL_HOST_API + "events/" + id + "/true", options).then(handleHttpErrors);
        
        update.classList.add("text-success")
        update.innerText = "Found event!"
   
        makeHTML(response)
    } catch (error) {
        update.innerText = error.message
        update.classList.add("text-danger")
        console.log(error)
    }
}




function makeHTML(event) {
    document.getElementById("event-to-edit-id").value = event.id
    document.getElementById("event-to-edit-id").setAttribute("readonly","readonly")
    document.getElementById("event-name").value = event.name;
    document.getElementById("event-description").value = event.description;
    document.getElementById("event-capacity").value = event.capacity;

    let parts = event.date.split(" ")
    console.log(parts)

    document.getElementById("event-date").value = parts[0];
    document.getElementById("event-time").value = parts[1];

    // put into input fields

}




async function submitEdit() {
    const update = document.getElementById("update")
    update.innerText = ""
    update.classList.remove("text-success")
    update.classList.remove("text-danger")


    const body = {}

    body.name = document.getElementById("event-name").value
    body.description = document.getElementById("event-description").value
    body.date = document.getElementById("event-date").value + " " + document.getElementById("event-time").value
    body.capacity = document.getElementById("event-capacity").value
        
    const id = document.getElementById("event-to-edit-id").value

    try {
        const options = makeOptions("PUT", body, false);
        await fetch(LOCAL_HOST_API + "events/" + id, options).then(handleHttpErrors);
        
        update.classList.add("text-success")
        update.innerText = "Updated Successfully"
        
    } catch (error) {
        update.innerText = error.message
        update.classList.add("text-danger")
        console.log(error)
    }    

}  


