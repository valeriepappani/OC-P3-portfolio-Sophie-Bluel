 function ajoutListenerLogin() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        // Création de l’objet de connexion
        const connexion = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        console.log(connexion);
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(connexion);

        fetch('http://localhost:5678/api/users/login', {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json"
             },
            body: chargeUtile
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    });
}


ajoutListenerLogin() 


// Récupération des informations de connexion donné par l'utilisateur
// let form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     let baliseEmail = document.getElementById("email");
//     let email = baliseEmail.value;
//     console.log(email);

//     let balisePassword = document.getElementById("password");
//     let password = balisePassword.value;
//     console.log(password);
// })


/*****Mise en forme erreur de connexion*****/
let form = document.querySelector("form");

function verifierChamp(balise) {
    if (balise.value === "") {
        balise.classList.add("error");
    } else {
        balise.classList.remove("error");
    }
}

let baliseEmail = document.getElementById("email");
let balisePassword = document.getElementById("password");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    verifierChamp(baliseEmail)
    verifierChamp(balisePassword)
})

baliseEmail.addEventListener("change", function () {
    verifierChamp(baliseEmail);
    verifierChamp(balisePassword);
})