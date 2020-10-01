/** Hace la peticion para consultar el reporte del tecnico **/
const search = async () => {

    const idTecnico = document.getElementById('id-tecnico').value
    const numWeek = document.getElementById('num-week').value

    const objSearch = {
        idTecnico,
        numWeek
    }

    if (idTecnico === "" || numWeek === "") {
        const field = idTecnico === "" ? "tecnico" : "semana";
        swal(`El campo ${field} esa vacio`, {
            icon: "info",
            timer: 4000,
            buttons: {},
        })
    } else {
        await fetch('http://localhost:5001/workHours/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objSearch),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.hoursWorked) {
                    console.log("res", response);
                    paintQuery(response.hoursWorked)
                } else {
                    swal(`${response.message} `, {
                        icon: "info",
                        timer: 4000,
                        buttons: {},
                    })
                    paintQuery(0)
                }
            })
            .catch((err) => {
                console.error("Error enviando datos al backend: ", err);
            })
    }
}

const paintQuery = (hoursWorked) => {
    if (hoursWorked === 0) {
        const hours = document.getElementsByClassName('hours')
        for (const h of hours) {
            h.innerHTML = 0
        }
    } else {
        document.getElementById('normal-hours').innerHTML = hoursWorked.normalHours
        document.getElementById('night-hours').innerHTML = hoursWorked.nightHours
        document.getElementById('sunday-hours').innerHTML = hoursWorked.sundayHours
        document.getElementById('normal-extra-hours').innerHTML = hoursWorked.normalExtraHours
        document.getElementById('night-extra-hours').innerHTML = hoursWorked.nightExtraHours
        document.getElementById('sunday-extra-hours').innerHTML = hoursWorked.sundayExtraHours
    }
}