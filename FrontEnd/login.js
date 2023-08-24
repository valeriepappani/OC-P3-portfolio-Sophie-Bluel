function ajoutListenerLogin() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Création de l’objet de connexion
        const connexion = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };

        let statutConnexion = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(connexion)
        })

        const logResponse = await statutConnexion.json();
        window.localStorage.setItem("token", logResponse.token); //Stockage du token dans le localStorage
        window.localStorage.setItem("userId", logResponse.userId);//Stockage de l'userId dans le localStorage

        const logStatus = statutConnexion.status;
        console.log(`le statut de connexion est ${logStatus}`)

        //Message d'erreur et redirection
        if (logStatus === 200) {
            // console.log('L\'utilisateur est validé, nous pouvons rediriger la page');
            window.location.href = "./index.html"; //redirection vers la homepage 
        } else if (logStatus === 404 || logStatus === 401) {
            // console.log("Utilisateur introuvable ! Merci de vérifier votre adresse email et/ou votre mot de passe")
            messageErreur();
        }
    })
}

ajoutListenerLogin()

function messageErreur() {
    const erreur = document.querySelector("form");
    const messageErreur = document.createElement("p");
    messageErreur.innerText = `Utilisateur introuvable ! Merci de vérifier votre adresse email et/ou votre mot de passe.`;
    messageErreur.classList.add("message-erreur");
    erreur.appendChild(messageErreur);
}

const userId = localStorage.getItem("userId");
console.log(`l'userId est ${userId}`)

/******** PARTIE CONNEXION/DECONNEXION ********/
if (userId != null) {
    console.log("L'utilisateur est connecté")
    const btnLog = document.querySelector('.btn-login');
    btnLog.innerText = "logout"
}

const token = localStorage.getItem("token");
console.log(token)

if (token != undefined) {
    const btnLog = document.querySelector('.btn-login');
    btnLog.innerText = "logout"
} else {
    const btnLog = document.querySelector('.btn-login');
    btnLog.innerText = "login"
}

function logout() {
    const logout = document.querySelector(".btn-login");
    logout.addEventListener("click", async function (event) {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        console.log(localStorage)
        const btnLog = document.querySelector('.btn-login');
        btnLog.innerText = "login"
        console.log("L\'utilisateur n'est plus connecté")
    })
}

logout();


/******** ERREUR DE CONNEXION ********/
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