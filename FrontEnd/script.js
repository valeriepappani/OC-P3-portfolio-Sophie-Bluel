// Récupération des données depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const projet = await reponse.json(); //Traduit les données de l'API en JSON

//Récupération des catégories depuis l'API
const reponseCategories = await fetch('http://localhost:5678/api/categories');
const categories = await reponseCategories.json(); //Traduit les données de l'API en JSON

const sectionProjet = document.getElementById("portfolio"); //Récupération de l'id #portfolio


/********* AJOUT DES FILTRES *********/
const divFiltres = document.createElement("div"); //Nouvelle div dans la section #portfolio
divFiltres.classList.add("categories");
sectionProjet.appendChild(divFiltres);

const boutonTous = document.createElement("button");
boutonTous.innerText = "Tous";
boutonTous.classList.add("Tous")
divFiltres.appendChild(boutonTous);

/** Ajout des boutons **/
for (let i = 0; i < categories.length; i++) {
    const elementCategories = categories[i];

    const boutonsCategories = document.createElement("button");
    boutonsCategories.innerText = elementCategories.name;
    boutonsCategories.classList = elementCategories.name;

    divFiltres.appendChild(boutonsCategories)
}


/******* AJOUT DES PROJET VIA LE BACKEND *******/
//Création d'une nouvelle div
const divProjet = document.createElement("div")
divProjet.classList.add("gallery");
sectionProjet.appendChild(divProjet); //Rattacher la div à la section #portfolio

function genererProjet(projet) {
    //Création d'une boucle pour faire apparaitre les différents projets
    for (let i = 0; i < projet.length; i++) {
        const elementProjet = projet[i]; //On récupère les données des projets via le JSON
        // Création des balises
        const figureProjet = document.createElement("figure")

        const imageProjet = document.createElement("img");
        imageProjet.src = elementProjet.imageUrl;
        imageProjet.alt = elementProjet.title;

        const figureCaption = document.createElement("figcaption");
        figureCaption.innerText = elementProjet.title;

        //Ratacher les balises au parent
        divProjet.appendChild(figureProjet);
        figureProjet.appendChild(imageProjet);
        figureProjet.appendChild(figureCaption)
    }
}

//Premier affichage de la page
genererProjet(projet);


/***** Génération des projets suivant les filtres *****/
//Ajout du listener pour trier les projets par Objets

const boutonObjets = document.querySelector(".Objets");
boutonObjets.addEventListener("click", function () {
    const objetsFiltres = projet.filter(function (projet) {
        return projet.categoryId === 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjet(objetsFiltres);
})

//Ajout du listener pour trier les projets par Appartements
const boutonAppartements = document.querySelector(".Appartements");

boutonAppartements.addEventListener("click", function () {
    const appartementsFiltres = projet.filter(function (projet) {
        return projet.categoryId === 2;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjet(appartementsFiltres)
})

//Ajout du listener pour trier les projets par Hotels et Restaurants
const boutonHotels = document.querySelector(".Hotels");

boutonHotels.addEventListener("click", function () {
    const hotelsFiltres = projet.filter(function (projet) {
        return projet.categoryId === 3;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjet(hotelsFiltres)
})

//Ajout du listener pour faire apparaitre tous les projets
const projetGlobal = document.querySelector(".Tous");

projetGlobal.addEventListener("click", function () {
    const tousProjet = projet.filter(function (projet) {
        return projet;
    })
    document.querySelector(".gallery").innerHTML = "";
    genererProjet(tousProjet)
})


/******** Partie déconnexion/LOGOUT ********/
const token = localStorage.getItem("token"); //On récupère le token
if (token != undefined) {
    const btnLog = document.querySelector('.btn-login');
    btnLog.innerText = "logout"
    btnLog.classList.add("logout");
}

const logoutHome = document.querySelector(".logout");
logoutHome.addEventListener("click", async function (event) {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    window.location.href = "./login.html"; //redirection vers la page de connexion 
})


/******** Éléments à afficher quans l'utilisateur est connecté ********/
function elementsConnexion() {
    const token = localStorage.getItem("token");
    if (token != undefined) {
        //Création d'un nouvel element
        let modeEdition = document.createElement("div");
        modeEdition.classList.add("divEdition");
        //Élément de référence
        let elementReference = document.querySelector("body");
        // Élément parent
        let parentDiv = elementReference.parentNode;
        //Nouvel element avant le body
        parentDiv.insertBefore(modeEdition, elementReference)

        const pEdition = document.createElement('p');
        pEdition.innerHTML = `<a href="#"><i class="fa-regular fa-pen-to-square"></i> Mode édition</a>`
        modeEdition.appendChild(pEdition)
        const btnEdition = document.createElement('button');
        btnEdition.innerText = "publier les changements"
        modeEdition.appendChild(btnEdition)

        const figurePhoto = document.querySelector("figure");
        const modifierPhoto = document.createElement("p");
        modifierPhoto.classList.add("modifier-photo");
        modifierPhoto.innerHTML = `<a href="#"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`
        figurePhoto.appendChild(modifierPhoto)

        document.querySelector('.categories').style.display = "none"; //Masquer les filtres

        const divTitre = document.querySelector('.divTitre');
        const modifierProjets = document.createElement('p');
        modifierProjets.classList.add('modifier-projet');
        modifierProjets.innerHTML = `<a href="#"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`
        divTitre.appendChild(modifierProjets)

        /******** MODALE ********/
        modifierProjets.addEventListener('click', function () {
            document.querySelector('#modal1').style.display = "flex";
        })

        const closeModale = document.querySelector('.close-modal');
        closeModale.addEventListener('click', function () {
            document.querySelector('#modal1').style.display = "none";
        })

        const projetGaleriePhotos = document.querySelector('.projet-galerie-photos');

        for (let i = 0; i < projet.length; i++) {
            const elementProjet = projet[i];
            const projetImage = document.createElement("img");
            projetImage.src = elementProjet.imageUrl;
            projetGaleriePhotos.appendChild(projetImage)
        }
    
    }
}

elementsConnexion();