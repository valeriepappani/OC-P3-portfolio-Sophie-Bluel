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

boutonObjets.addEventListener("click", function() {
    const objetsFiltres = projet.filter(function(projet){
        return projet.categoryId === 1;
    })
    console.log(objetsFiltres)
    document.querySelector(".gallery").innerHTML="";
    genererProjet(objetsFiltres);
})

//Ajout du listener pour trier les projets par Appartements
const boutonAppartements = document.querySelector(".Appartements");

boutonAppartements.addEventListener("click", function () {
    const appartementsFiltres=projet.filter(function (projet){
        return projet.categoryId === 2;
    })
    console.log(appartementsFiltres);
    document.querySelector(".gallery").innerHTML="";
    genererProjet(appartementsFiltres)
})

//Ajout du listener pour trier les projets par Hotels et Restaurants
const boutonHotels = document.querySelector(".Hotels");

boutonHotels.addEventListener("click", function() {
    const hotelsFiltres = projet.filter(function (projet){
        return projet.categoryId === 3;
    })
    console.log(hotelsFiltres);
    document.querySelector(".gallery").innerHTML="";
    genererProjet(hotelsFiltres)
})

//Ajout du listener pour faire apparaitre tous les projets
const projetGlobal = document.querySelector(".Tous");

projetGlobal.addEventListener("click", function() {
    const tousProjet = projet.filter(function (projet){
        return projet;
    })
    console.log(tousProjet);
    document.querySelector(".gallery").innerHTML="";
    genererProjet(tousProjet)
})