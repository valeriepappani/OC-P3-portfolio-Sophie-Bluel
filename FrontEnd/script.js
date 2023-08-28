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

    const logoutHome = document.querySelector(".logout");
    logoutHome.addEventListener("click", function () {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        window.location.href = "./login.html"; //redirection vers la page de connexion 
    })
}

/******** Éléments à afficher quans l'utilisateur est connecté ********/
if (token != undefined) {

    //Création d'une nouvelle div - "Mode édition des projets" - Haut de la page
    let modeEdition = document.createElement("div");
    modeEdition.classList.add("divEdition");
    let elementReference = document.querySelector("body");//Élément de référence
    let parentDiv = elementReference.parentNode; // Élément parent
    parentDiv.insertBefore(modeEdition, elementReference)//Nouvel element avant le body

    const pEdition = document.createElement('p');
    pEdition.innerHTML = `<a href="#"><i class="fa-regular fa-pen-to-square"></i> Mode édition</a>`
    modeEdition.appendChild(pEdition)

    const btnEdition = document.createElement('button');
    btnEdition.innerText = "publier les changements"
    modeEdition.appendChild(btnEdition)

    //Modifier la photo de l'architecte
    const figurePhoto = document.querySelector("figure");
    const modifierPhoto = document.createElement("p");
    modifierPhoto.classList.add("modifier-photo");
    modifierPhoto.innerHTML = `<a href="#"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`
    figurePhoto.appendChild(modifierPhoto)

    document.querySelector('.categories').style.display = "none"; //Masquer les filtres

    //Modifier les projets
    const divTitre = document.querySelector('.divTitre');
    const modifierProjets = document.createElement('p');
    modifierProjets.classList.add('modifier-projet');
    modifierProjets.innerHTML = `<a href="#modal1"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`
    divTitre.appendChild(modifierProjets)
}

/******** MODALE ********/

//Création séparateur
const modalWrapper = document.querySelector('.modal-wrapper')
const separateur = document.createElement("div");
separateur.classList.add("separateur");
modalWrapper.appendChild(separateur)

//Création du bouton pour ajouter une photo
const ajoutPhoto = document.createElement('button');
ajoutPhoto.classList.add('btn-ajout-photo-modal');
ajoutPhoto.innerText = "Ajouter une photo";
modalWrapper.appendChild(ajoutPhoto)

//Création du lien pour supprimer la gallerie
const lienSuppGallerie = document.createElement('a');
lienSuppGallerie.classList.add('lien-supp-gallerie');
lienSuppGallerie.href = "#"
lienSuppGallerie.innerText = "Supprimer la gallerie";
modalWrapper.appendChild(lienSuppGallerie)


/******** AFFICHAGE MODAL ********/
let modal = null;

const openModal = function (event) {
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute('href'));
    modal.style.display = null;
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (event) {
    if (modal === null) return
    event.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null;
}

const stopPropagation = function (event) {
    event.stopPropagation();
}

const modifierProjet = document.querySelector(".modifier-projet");
modifierProjet.addEventListener('click', openModal);

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        closeModal(event);
    };
})


/******** GÉNARATION DES PROJET DANS LA MODAL ********/
const genererProjetModal = function () {
    for (let i = 0; i < projet.length; i++) {
        //Création d'une nouvelle div contenant l'image et le lien pour éditer
        const containerImageProjet = document.createElement("div");
        containerImageProjet.classList.add('lien-editer');
        const projetGaleriePhotos = document.querySelector('.projet-galerie-photos');
        projetGaleriePhotos.appendChild(containerImageProjet);

        //Récupération des projets via l'API
        const elementProjet = projet[i];
        const projetImage = document.createElement("img");
        projetImage.src = elementProjet.imageUrl;
        projetImage.alt = elementProjet.title;
        projetImage.setAttribute("data", elementProjet.id)
        containerImageProjet.appendChild(projetImage)

        //Création de l'icone "poubelle"
        const pictoPoubelle = document.createElement("a");
        pictoPoubelle.href = "#";
        pictoPoubelle.classList = "picto-poubelle-lien"
        pictoPoubelle.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        pictoPoubelle.setAttribute("data-id", projetImage.setAttribute = ("data", elementProjet.id))
        containerImageProjet.appendChild(pictoPoubelle)

        //Création du lien "editer" sour l'image
        const lienEditer = document.createElement("a");
        lienEditer.href = "#"
        lienEditer.innerText = "éditer"
        containerImageProjet.appendChild(lienEditer)
    }
}

genererProjetModal();


/******** SUPPRESSION D'UN PROJET ********/
function supprimerProjet() {
    let removeProjects = document.querySelectorAll('.picto-poubelle-lien');
    removeProjects.forEach(project => {
        project.addEventListener("click", function (event) {
            event.preventDefault()

            const recupId = project.dataset.id;
            console.log(recupId)

            // fetch(`http://localhost:5678/api/works/${recupId}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Accept': '*/*',
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`,
            //     },
            //     body: null
            // }) 

            const gallerieModal = document.querySelector('.projet-galerie-photos').innerHTML = "";
            console.log(gallerieModal);
            genererProjetModal(project);
        })
    })
}

supprimerProjet();


/*******MODAL 2 : AJOUT PHOTO ********/
const ajoutPhotoModal= document.querySelector('.btn-ajout-photo-modal');
console.log(ajoutPhotoModal)


const sectionModal = document.querySelector('#modals')
console.log(sectionModal)
const modalAjout = document.createElement("aside");
modalAjout.classList.add('modal-2');
sectionModal.appendChild(modalAjout);

ajoutPhotoModal.addEventListener('click', function () {
    console.log(sectionModal)
})
