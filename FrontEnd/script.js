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

    document.querySelector('.categories').style.display = "none"; //Masquer les filtres

    //Modifier les projets
    const divTitre = document.querySelector('.divTitre');
    const modifierProjets = document.createElement('p');
    modifierProjets.classList.add('modifier-projet');
    modifierProjets.innerHTML = `<a href="#modal1"><i class="fa-regular fa-pen-to-square"></i> modifier</a>`
    divTitre.appendChild(modifierProjets)
}

/******** MODALE ********/
//Création de la modale
const modal1 = document.createElement('section');
modal1.setAttribute("id", "modals");
const contact = document.querySelector('#contact');
let parent = contact.parentNode;
parent.insertBefore(modal1, contact);

modal1.innerHTML =
    `<aside id="modal1" class="modal" aria-hidden="true" role="dialog" aria-modal="false" aria-labelledby="titre-modale" style="display:none">
        <div class="modal-wrapper js-modal-stop">
            <div class="picto-nav-modal">
                <i class="fa-solid fa-arrow-right fa-rotate-180" style="visibility:hidden"></i>
                <i class="fa-solid fa-xmark js-modal-close iconeFermer"></i>
            </div>  
            <div id="modal-gallery">          
                <h3 id="titre-modale">Galerie Photos</h3>
                <div class="projet-galerie-photos"></div>
                <div class="separateur"></div>
                <button class="btn-ajout-photo-modal">Ajouter une photo</button>
            </div>
            <div id="modal-ajout-photo" style="display:none">
                <h3 id="titre-modale2">Ajout Photo</h3>
                <form class="container-new-photo" method="post" >
                    <div id="container-nouvelle-photo" class="container-nouvelle-photo">
                        <i class="fa-regular fa-image picto-visuel"></i>
                        <img alt="Aperçu de l'image téléchargée" id="file-preview" style="display:none;">
                        <label for="file-upload" class="input-file">+ Ajout photo</label>
                        <input type="file" name="file" id="file-upload" accept="image/*" style="opacity:0">
                        <p>jpg, png : 4mo max</p>
                    </div>
                    <label for="titreProjet">Titre</label>
                    <input type="text" name="titreProjet" id="titreProjet">
                    <label for="categoriesProjet">Catégorie</label>
                    <select name="categoriesProjet" id="categoriesProjet">
                        <option></option>
                </select>
                <div class="separateur"></div>
                <input type="submit" value="Valider" class="btn-valider-photo" disabled="disabled"/>
            </form>
            </div>
        </div>
    </aside>`


/******** AFFICHAGE MODAL ********/
let modal = null;

//Ouverture de la modale
const openModal = function (event) {
    event.preventDefault();
    modal = document.querySelector(event.target.getAttribute('href'));
    modal.style.display = null;
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);

    document.querySelector('#modal-gallery').style.display = null;
    document.querySelector('#modal-ajout-photo').style.display = "none";
    document.querySelector('.fa-arrow-right').style.visibility = "hidden";
}


//Fermeture de la modale
const closeModal = function (event) {
    if (modal === null) return
    event.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
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


/******** GÉNARATION DES PROJET DANS LA MODALE ********/
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
                    'Authorization': `Bearer ${token}`,
                },
                body: null
            })

            const supprimerId = document.getElementById(`${recupId}`);
            const suppElementGallery = document.getElementById(`element${recupId}`)
            supprimerId.remove();
            suppElementGallery.remove();
        })
    })
}

supprimerProjet();


//Navigation entre les modales
const btnAjoutPhoto = document.querySelector('.btn-ajout-photo-modal');
const divModalGallery = document.querySelector('#modal-gallery');
const divModalAjout = document.querySelector('#modal-ajout-photo');
const flecheRetour = document.querySelector('.fa-arrow-right');


btnAjoutPhoto.addEventListener("click", function (event) {
    event.preventDefault();
    divModalGallery.style.display = "none";
    divModalAjout.style.display = null;
    flecheRetour.style.visibility = null;
})

flecheRetour.addEventListener("click", function () {
    divModalGallery.style.display = null;
    divModalAjout.style.display = "none";
    flecheRetour.style.visibility = "hidden";
})

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

    let imageUrl = document.querySelector('#file-upload').files[0];
    const tailleMaxi = 4 * 1024 * 1024;

    if(imageUrl.size > tailleMaxi) {
        alert("votre image est trop volumineuse. Merci d’ajouter une image de 4Mo maximum");
        return
    }


    let title = document.querySelector('#titreProjet').value;
    let categoryId = document.querySelector('#categoriesProjet').value;
    parseInt(categoryId);

    const formData = new FormData();
    formData.append("image", imageUrl)
    formData.append("title", title)
    formData.append("category", categoryId)

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
            if (response.status === 500 || response.status === 400) {
                if (document.querySelector(".message-erreur") === null) {
                } else if (response.status === 201) {
                    document.querySelector(".container-new-photo .message-erreur").style.display = "none";
                }
            }
        })


    /********Ajout de l'image dans la gallery Home ********/

    const gallerie = document.querySelector('.gallery');

    const figureProjet = document.createElement("figure")
    figureProjet.setAttribute('id', `new`);

    const imageProjet = document.createElement("img");
    imageProjet.src = document.querySelector('#file-preview').src;

    const figureCaption = document.createElement("figcaption");
    figureCaption.innerText = title;

    gallerie.append(figureProjet);
    figureProjet.append(imageProjet);
    figureProjet.append(figureCaption)

    /********Ajout de la nouvelle image dans la modale ********/
    const gallerieModale = document.querySelector('.projet-galerie-photos');

    const divModale = document.createElement('div')
    divModale.setAttribute('class', 'lien-editer newLien');


    const imgModale = document.createElement('img')
    imgModale.src = document.querySelector('#file-preview').src;

    const pictoPoubelle = document.createElement("div");
    pictoPoubelle.classList = "picto-poubelle-lien"
    pictoPoubelle.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    gallerieModale.appendChild(divModale);
    divModale.appendChild(imgModale);
    divModale.appendChild(pictoPoubelle);
})

/*******Message d'erreur *********/

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
    } else if (balise.value != "") {
        balise.classList.remove("error");
    }
}

function verifierPhoto(balise) {
    const imagePhoto = document.querySelector('#file-upload');
    const form = document.querySelector("#container-nouvelle-photo");

    if (imagePhoto.value === '') {
        form.classList.add("error");
    } else if (imagePhoto.value != '') {
        form.classList.remove("error");
    }
}


let baliseTitreImg = document.getElementById("titreProjet");
let baliseOtionCategorie = document.getElementById("categoriesProjet");
let baliseImgSrc = document.querySelector('#file-upload');

//Supprimer le comportement par défaut + vérifier si les champs sont remplis ou non
form.addEventListener("submit", function (event) {
    event.preventDefault();
    verifierChamp(baliseTitreImg)
    verifierChamp(baliseOtionCategorie)
    verifierPhoto(baliseImgSrc)
})


//À l'ajout de l'IMAGE, vérifier si les autres champs sont remplis
baliseImgSrc.addEventListener("change", function () {
    verifierChamp(baliseTitreImg)
    verifierChamp(baliseOtionCategorie)
    verifierPhoto(baliseImgSrc)

    if (baliseImgSrc.value === '' || baliseTitreImg.value === '' || baliseOtionCategorie.value === '') {
        //Si les autres champs ne sont pas remplis, ajouter un message d'erreur, s'il n'est pas déjà afficher
        if (document.querySelector(".message-erreur") === null) {
            ajoutErreur();
        }
    }

    //Supprimer le message d'erreur si l'ensemble des champs est rempli
    if (baliseImgSrc.value != '' && baliseTitreImg.value != '' && baliseOtionCategorie.value != '') {
        document.querySelector('.message-erreur').remove();
    }
})

//À l'ajout d'un TITRE, vérifier si les autres champs sont remplis
baliseTitreImg.addEventListener("change", function () {
    verifierChamp(baliseTitreImg)
    verifierChamp(baliseOtionCategorie)
    verifierPhoto(baliseImgSrc)

    if (baliseImgSrc.value === '' || baliseTitreImg.value === '' || baliseOtionCategorie.value === '') {
        //Si les autres champs ne sont pas remplis, ajouter un message d'erreur, s'il n'est pas déjà afficher
        if (document.querySelector(".message-erreur") === null) {
            ajoutErreur();
        }
    }

    //Supprimer le message d'erreur si l'ensemble des champs est rempli
    if (baliseImgSrc.value != '' && baliseTitreImg.value != '' && baliseOtionCategorie.value != '') {
        document.querySelector('.message-erreur').remove();
    }
})

//À l'ajout de la CATEGORIE, vérifier si les autres champs sont remplis
baliseOtionCategorie.addEventListener("change", function () {
    verifierChamp(baliseTitreImg)
    verifierChamp(baliseOtionCategorie)
    verifierPhoto(baliseImgSrc)

    if (baliseImgSrc.value === '' || baliseTitreImg.value === '' || baliseOtionCategorie.value === '') {
        //Si les autres champs ne sont pas remplis, ajouter un message d'erreur, s'il n'est pas déjà afficher
        if (document.querySelector(".message-erreur") === null) {
            ajoutErreur();
        }
    }
    //Supprimer le message d'erreur si l'ensemble des champs est rempli
    if (baliseImgSrc.value != '' && baliseTitreImg.value != '' && baliseOtionCategorie.value != '') {
        document.querySelector('.message-erreur').remove();
    }
})


/********Bouton valider disabled ********/
const imagePhoto = document.querySelector('#file-upload');
const titrePhoto = document.querySelector('#titreProjet');
const optionPhoto = document.querySelector('#categoriesProjet');

let btnDisabled = document.querySelector('.btn-valider-photo');
btnDisabled.disabled = true;


let wrapper2 = document.querySelector('#modal-ajout-photo')
wrapper2.addEventListener("change", function () {
    if (titrePhoto.value != "" && imagePhoto.value != '' && optionPhoto.value != '') {
        btnDisabled.disabled = false;
        btnDisabled.style.backgroundColor = "#1D6154";
    }
})

const closeModalBtn = document.querySelector('.container-new-photo');
closeModalBtn.addEventListener('submit', function (event) {
    if (btnDisabled.disabled === false) {
        event.preventDefault();
        const modalClose = document.querySelector('#modal1');
        modalClose.style.display = 'none';
        modalClose.setAttribute('aria-hidden', 'true');
        modalClose.setAttribute('aria-modal', 'false');
        modalClose.removeEventListener('click', closeModal);
        modalClose.querySelector('.js-modal-close').removeEventListener('click', closeModal)
        modalClose.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    }

    //Suppression de l'image précédente, et possibilité d'ajouter de nouveaux projet
    document.querySelector('.container-new-photo').reset();
    document.querySelector('#file-upload').value = '';
    document.querySelector('#file-preview').style.display = "none";
    document.querySelector('.picto-visuel').style.display = null;
    document.querySelector('.input-file').style.display = null;
    document.querySelector('#file-upload').style.display = null;
    document.querySelector('.container-nouvelle-photo p').style.display = null;
    let btnValider = document.querySelector('.btn-valider-photo');
    btnValider.disabled = "true";

    if (btnValider.disabled === true) {
        btnValider.style.backgroundColor = "#A7A7A7";
    }


    let newProjet = document.querySelectorAll('.picto-poubelle-lien');
    newProjet.forEach(project => {
        project.addEventListener("click", function (event) {
            event.preventDefault()
            const supprimerId = document.querySelector(".newLien");
            const suppElementGallery = document.getElementById("new")
            supprimerId.remove();
            suppElementGallery.remove();


        })
    })
})