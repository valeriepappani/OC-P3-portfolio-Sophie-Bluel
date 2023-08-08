// Récupération des données depuis l'API
const reponse = await fetch('http://localhost:5678/api/works');
const projet = await reponse.json(); //Traduit les données de l'API en JSON


const sectionProjet = document.getElementById("portfolio"); //Récupération de l'id #portfolio

const divProjet = document.createElement("div")//Création d'une nouvelle div
divProjet.classList.add("gallery"); //ajout de la class "gallery" à la div

sectionProjet.appendChild(divProjet); //Rattacher la div à la section #portfolio

//Création d'une boucle pour faire apparaitre les différents projets
for (let i = 0; i < projet.length; i++) {
    const elementProjet = projet[i]; //On récupère les données des projets via le JSON

    // Création des balises
    const figureProjet = document.createElement("figure")

    const imageProjet = document.createElement("img");
    imageProjet.src = elementProjet.imageUrl;

    const figureCaption = document.createElement("figcaption");
    figureCaption.innerText = elementProjet.title;

    //Ratacher les balises au parent
    divProjet.appendChild(figureProjet);
    figureProjet.appendChild(imageProjet);
    figureProjet.appendChild(figureCaption)
}