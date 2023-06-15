import { LOCAL_HOST_API } from "../../settings.js";
import { handleHttpErrors, makeOptions, sanitizeStringWithTableRows } from "../../utils.js";


export function initRemoveReserve() {
    getReservations()
    document.getElementById("tbody").onclick = deleteRSVP
}

function deleteRSVP(e) {
    e.preventDefault();
    
    const id = e.target.id;
    if (id.startsWith("row-btn")) {
        const parts = id.split("_")
        const rowId = `reservation-${parts[2]}`
        const row = document.getElementById(rowId)
        if (row) {
            row.remove()
            removeReservation(parts[2])
        }

    }


} 


async function removeReservation(id) {
    try {
        const options = makeOptions("DELETE", "", false)
        await fetch(LOCAL_HOST_API + "reserve/" + id, options).then(handleHttpErrors)
    } catch (error) {
        console.log(error)
    }
}



async function getReservations() {
    try {
        const options = makeOptions("GET", "", false)
        const response = await fetch(LOCAL_HOST_API + "reserve", options).then(handleHttpErrors)
        populateTable(response)
    } catch (error) {
        console.log(error)
    }
}


function populateTable(reservations) {
    const html = reservations.map(reservation => 
        `<tr id="reservation-${reservation.id}">                                
            <td>${reservation.event_name} </td>              
            <td>${reservation.username} </td>  
            <td>${reservation.reservationDate} </td>
            <td>
                <button id="row-btn_delete_${reservation.id}" type="button" class="btn btn-sm btn-danger">Delete</button> 
            </td>      
        </tr>`
        )
    document.getElementById("tbody").innerHTML = sanitizeStringWithTableRows(html);
} 
