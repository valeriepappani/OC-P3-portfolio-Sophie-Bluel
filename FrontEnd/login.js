// // Récupération des données depuis l'API
// const reponse = await fetch('http://localhost:5678/api/users/login');
// const projet = await reponse.json(); //Traduit les données de l'API en JSON



/* Début Fetch post */
// function ajoutListenerLogin () {
//     const formulaireLogin = documnet.querySelector(form);
//     formulaireLogin.addEventListener("submit", function (event) {
//         event.preventDefault();
//     })
// }


//Récupération des informations de connexion
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let baliseEmail = document.getElementById("email");
    let email = baliseEmail.value;
    console.log(email);

    let balisePassword = document.getElementById("password");
    let password = balisePassword.value;
    console.log(password);
})

/*****Mise en forme erreur de connexion*****/
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