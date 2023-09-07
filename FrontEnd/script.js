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
        figureProjet.setAttribute('id', `element${elementProjet.id}`);

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
lienSuppGallerie.href = "#",
lienSuppGallerie.innerText = "Supprimer la gallerie";
modalWrapper.appendChild(lienSuppGallerie);


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
        const elementProjet = projet[i];

        const containerImageProjet = document.createElement("div");
        containerImageProjet.classList.add('lien-editer');
        containerImageProjet.setAttribute("id", elementProjet.id)
        const projetGaleriePhotos = document.querySelector('.projet-galerie-photos');
        projetGaleriePhotos.appendChild(containerImageProjet);

        //Récupération des projets via l'API
        const projetImage = document.createElement("img");
        projetImage.src = elementProjet.imageUrl;
        projetImage.alt = elementProjet.title;
        projetImage.setAttribute("data", elementProjet.id)
        containerImageProjet.appendChild(projetImage)

        //Création de l'icone "poubelle"
        const pictoPoubelle = document.createElement("div");
        pictoPoubelle.classList = "picto-poubelle-lien"
        pictoPoubelle.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        pictoPoubelle.setAttribute("data-id", projetImage.setAttribute = ("data", elementProjet.id))
        containerImageProjet.appendChild(pictoPoubelle)

        //Création du lien "editer" sour l'image
        const lienEditer = document.createElement("a");
        // lienEditer.href = "#"
        lienEditer.innerText = "éditer";
        containerImageProjet.appendChild(lienEditer);
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

            fetch(`http://localhost:5678/api/works/${recupId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    // 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: null
            })

            const supprimerId = document.getElementById(`${recupId}`);
            const suppElementGallery = document.getElementById(`element${recupId}`)
            supprimerId.remove();
            suppElementGallery.remove();

            // document.querySelector('.projet-galerie-photos').innerHTML = "";
            // genererProjetModal(projet);
            
        })
    })
}

supprimerProjet();


/*******MODAL 2 : AJOUT PHOTO ********/
const ajoutPhotoModal = document.querySelector('.btn-ajout-photo-modal');

ajoutPhotoModal.addEventListener('click', function (event) {
    event.preventDefault()

    const modal2 = document.querySelector('#modal2');
    modal2.style.display = null;

    const modal1 = document.querySelector('#modal1');
    modal1.style.display = 'none';
})

const sectionModals = document.querySelector('#modals');

const modal2 = document.createElement('aside');
modal2.setAttribute('id', 'modal2');
modal2.setAttribute('class', 'modal');
modal2.setAttribute('aria-hidden', 'true');
modal2.setAttribute('role', 'dialog');
modal2.setAttribute('aria-modal', 'false');
modal2.setAttribute('aria-labelleby', 'titre-modal2');
modal2.style.display = "none"
sectionModals.appendChild(modal2);

modal2.innerHTML =
    `<div class='modal-wrapper js-modal-stop wrapper-modal-2'>
    <div class="picto-nav-modal">
        <i class="fa-solid fa-arrow-right fa-rotate-180"></i>
        <i class="fa-solid fa-xmark js-modal-close test"></i>
    </div>
    <h3 id="titre-modale2">Ajout Photo</h3>
    <div class="container-nouvelle-photo">
        <i class="fa-regular fa-image picto-visuel"></i>
        <img src="#" alt="Aperçu de l'image téléchargée" id="file-preview" style="display:none;">
        <input type="file" name="file" id="file-upload" accept="image/*">
        <label for="file-upload" class="input-file">+ Ajout photo</label>
        <p>jpg, png : 4mo max</p>
    </div>
    <form class="container-new-photo" method="post" >
        <label for="titreProjet">Titre</label>
        <input type="text" name="titreProjet" id="titreProjet">
        <label for="categoriesProjet">Catégorie</label>
        <select name="categoriesProjet" id="categoriesProjet">
            <option></option>
        </select>
        <div class="separateur"></div>
        <input type="submit" value="Valider" class="btn-valider-photo"/>
    </form>
</div>`;


/********Aperçu de l'image a télécharger********/
const input = document.getElementById('file-upload');
const previewPhoto = function () {
    const file = input.files;
    if (file) {
        const fileReader = new FileReader();
        const preview = document.querySelector('#file-preview');
        preview.style.display = null;
        const pictoVisuel = document.querySelector('.picto-visuel');
        pictoVisuel.style.display = "none";
        input.style.display = "none";
        const inputFile = document.querySelector('.input-file');
        inputFile.style.display = "none";
        const inputParagraph = document.querySelector('.container-nouvelle-photo p');
        inputParagraph.style.display = "none";

        fileReader.onload = function (event) {
            preview.setAttribute('src', event.target.result);
        }
        fileReader.readAsDataURL(file[0]);
    }
}
input.addEventListener("change", previewPhoto);


const pictoFleche = document.querySelector('.fa-arrow-right');
pictoFleche.addEventListener('click', function (event) {
    event.preventDefault()

    const modal2 = document.querySelector('#modal2');
    modal2.style.display = 'none';

    const modal1 = document.querySelector('#modal1');
    modal1.style.display = null;
})

const closeModal2 = document.querySelector('.test');
closeModal2.addEventListener('click', function (event) {
    event.preventDefault();
    const modalClose = document.querySelector('#modal2');
    modalClose.style.display = 'none';
    modalClose.setAttribute('aria-hidden', 'true');
    modalClose.setAttribute('aria-modal', 'false');
    modalClose.removeEventListener('click', closeModal);
    modalClose.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modalClose.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
})

/********Récupérer les catégories pour choix ajout projet ********/
const select = document.querySelector('select');
for (let i = 0; i < categories.length; i++) {
    const elementCategories = categories[i];

    const optionCategories = document.createElement("option");
    optionCategories.setAttribute('value', elementCategories.id)
    optionCategories.innerText = elementCategories.name;

    select.appendChild(optionCategories)
}

/******** Récupération des données d'ajout de l'image ********/
const containerNewPhoto = document.querySelector('.container-new-photo');

containerNewPhoto.addEventListener('submit', function (event) {
    event.preventDefault();

    const valueTitre = document.querySelector('#titreProjet').value;
    const valueCategories = document.querySelector('#categoriesProjet').value;
    parseInt(valueCategories);
    let newImage = document.querySelector('#file-upload').files[0];

    const formData = new FormData();
    formData.append("image", newImage)
    formData.append("title", valueTitre)
    formData.append("category", valueCategories)

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData
    })

    //Message d'erreur
        .then(function (response) {
            console.log(response.status);
            if (response.status === 500 ||response.status === 400 ) {
                if (document.querySelector(".message-erreur") === null) {
                    ajoutErreur()
                } else if (response.status === 201){
                    document.querySelector(".container-new-photo .message-erreur").style.display = "none";
                }
            }
        })


    /********Ajout de l'image dans la gallery Home ********/
    const gallerie = document.querySelector('.gallery');
    // gallerieModal.innerHTML = "";
    // genererProjet(projet);

    const figureProjet = document.createElement("figure")
    figureProjet.setAttribute('id', `element${projet.id}`);

    const imageProjet = document.createElement("img");
    imageProjet.src = document.querySelector('#file-preview').src;

    const figureCaption = document.createElement("figcaption");
    figureCaption.innerText = valueTitre;

    gallerie.append(figureProjet);
    figureProjet.append(imageProjet);
    figureProjet.append(figureCaption)


    /********Ajout de la nouvelle image dans la modale ********/
    const gallerieModale = document.querySelector('.projet-galerie-photos');

    const divModale = document.createElement('div')
    divModale.setAttribute('class', 'lien-editer');

    const imgModale = document.createElement('img')
    imgModale.src = document.querySelector('#file-preview').src;

    const pictoPoubelle = document.createElement("div");
    pictoPoubelle.classList = "picto-poubelle-lien"
    pictoPoubelle.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    const lienEditer = document.createElement("a");
    lienEditer.innerText = "éditer";

    gallerieModale.appendChild(divModale);
    divModale.appendChild(imgModale);
    divModale.appendChild(pictoPoubelle);
    divModale.appendChild(lienEditer);

})

//Fermer la modale à l'ajout du projet
// const closeModaltest = document.querySelector('.container-new-photo');
// closeModaltest.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const modalClose = document.querySelector('#modal2');
//     modalClose.style.display = 'none';
//     modalClose.setAttribute('aria-hidden', 'true');
//     modalClose.setAttribute('aria-modal', 'false');
//     modalClose.removeEventListener('click', closeModal);
//     modalClose.querySelector('.js-modal-close').removeEventListener('click', closeModal)
//     modalClose.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
// })


function ajoutErreur() {
    const erreur = document.querySelector(".container-new-photo");
    const messageErreur = document.createElement("p");
    messageErreur.innerText = `Veuillez remplir tous les champs du formulaire.`;
    messageErreur.classList.add("message-erreur");
    erreur.appendChild(messageErreur);
}

const form = document.querySelector(".container-new-photo");


function verifierChamp(balise) {
    if (balise.value === "") {
        balise.classList.add("error");
    } else {
        balise.classList.remove("error");
    }
}

let baliseTitreImg = document.getElementById("titreProjet");
let baliseOtionCategorie = document.getElementById("categoriesProjet");
let baliseAjoutImg = document.querySelector(".container-nouvelle-photo");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    verifierChamp(baliseTitreImg)
    verifierChamp(baliseOtionCategorie)
    verifierChamp(baliseAjoutImg)
})

baliseTitreImg.addEventListener("change", function () {
    verifierChamp(baliseTitreImg);
    verifierChamp(baliseOtionCategorie);
    verifierChamp(baliseAjoutImg);
})
