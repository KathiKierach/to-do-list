"use strict";

////////////////////////////////////////////////////////
////////////////////// Variablen ///////////////////////
////////////////////////////////////////////////////////

///// HTML - Elemente
let textInput = document.getElementById("textfeld");
let mainListe = document.getElementById("mainListe");
let sendBtn = document.getElementById("sendBtn");

//// Diese APi gibt einen zufälligen JSON String aus
let apiUrl = "https://www.boredapi.com/api/activity/";


///////////////////////////////////////////////////////
////////////// Auslesen der JSON Datei ////////////////
////////////       via Fetch            ///////////////
///////////////////////////////////////////////////////

function getRandomActivityViaFetch() {
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let newElement = listElementFactory().createOneElement(data.activity);
            attachToListContainer(newElement);
        });
}


///////////////////////////////////////////////////////
//////////////////   Init Function ////////////////////
/////////////Listen-Elemente ins HTML packen///////////
///////////////////////////////////////////////////////

let defaultEntries = ['Eine To Do Liste erstellen', 'Einen Kaffee essen', 'Jemandem was Nettes sagen', 'Auf die Knöpfe drücken'];

function init() {
    //minimierte Init Funktion
    attachToListContainer(listElementFactory().createManyElements(defaultEntries));
}
init();

//////////////////////////////////////////////////////
//////////////////// Factory /////////////////////////
//////////////////////////////////////////////////////

function listElementFactory() {

    //CreateOneElement:  
    //Eingabe: String (zB Texteingabe aus Feld)
    //Return = Html-Element "Li"

    function createOneElement(textContent) {

        //Elemente erschaffen
        let listElement = document.createElement("li");
        let textNode = document.createTextNode(" " + textContent);
        let removeButton = document.createElement("span");

        //Txt + X-button dranhängen         
        listElement.appendChild(removeButton);
        listElement.appendChild(textNode);

        //Durchgestrichen-Klasse aus dem CSS hinzufügen
        listElement.addEventListener("click", (a) => {
            a.target.classList.toggle("durchgestrichen");
        });

        //Remove Button
        removeButton.textContent = "+";
        removeButton.classList.add("removeBtn");
        removeButton.classList.add("clearfix");
        removeButton.addEventListener("click", event => {
            event.target.parentNode.remove();
        });

        return listElement;
    }

    // Arrays verarbeiten und in die LIs packen
    function createManyElements(arrayOfStrings) {

        // überprüfen ob Array
        if (!Array.isArray(arrayOfStrings)) {
            alert("Das ist kein Array :C. Gib mir ein Array!");
            //wirft ein leeres Array raus. Empfehlung weil sonst Fehler.
            return [];
        }
        let result = [];

        //Ein Li-Element für jeden Array-String 
        for (let i = 0; i < arrayOfStrings.length; i++) {
            let tempElement = createOneElement(arrayOfStrings[i]);
            result.push(tempElement);
        }
        return result;
    }

    // Unten: "Revealing Module Pattern"
    // Innere Funktion von Aussen zugänglich machen 
    // indem man das create Element in ein Objekt verwandelt 
    return {
        createOneElement: createOneElement,
        createManyElements: createManyElements
    };

}

///// Listen Elemente an MainListe dranhängen
/////  je nachdem ob sie Array sind oder LIs

function attachToListContainer(content) {
    if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            mainListe.appendChild(content[i]);
        }
    } else {
        mainListe.appendChild(content);
    }
}


////////////////////////////////////////////////////////////////////
/////////////////// TextInput in die Factory geben /////////////////
////////////////////////////////////////////////////////////////////

//textInput aus dem HTML
textInput.addEventListener("keyup", function (event) {
    let inputText = textInput.value;

    //Beim Drücken der Entertaste
    if (event.keyCode === 13) {

        //Wenn nichts im Input steht, Fehlermeldung
        if (inputText === '') {
            alert("Bitte to Do angeben");
        }

        //sonst wird es in die Funktion geworfen
        //die Listen-Elemente erstellt
        //und an die UL angefügt
        else {
            let newListElement = listElementFactory().createOneElement(inputText);
            mainListe.appendChild(newListElement)
                ;
        }
    }
}
);


sendBtn.addEventListener("click", function (event) {
    let inputText = textInput.value;

    //Wenn nichts im Input steht, Fehlermeldung
    if (inputText === '') {
        return;
    }

    else {
        let newListElement = listElementFactory().createOneElement(inputText);
        mainListe.appendChild(newListElement)
            ;
    }
})


//////////////////////////////////////////////
///////// Toggeln des Designs ////////////////
//////////////////////////////////////////////

const toggleBtn = document.querySelector("#designToggle");
const body = document.body;

//nimmt den Value von "theme"
const theme = localStorage.getItem("theme");

// Wenn es im LocalStorage vorhanden ist, 
// füge das jeweilige Theme hinzu
if (theme == "light") {
    body.classList.remove("dark");
    body.classList.add("light");
    console.log(theme);
}
else if (theme == "dark") {
    body.classList.remove("light");
    body.classList.add("dark");
    console.log(theme);
}


toggleBtn.addEventListener("click", () => {

    //Wenn Light zu Dark werden soll
    if (body.classList.contains("light")) {
        body.classList.replace("light", "dark");
        localStorage.setItem('theme', 'dark');
    }

    //Wenn Dark zu Light werden soll
    else if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        localStorage.setItem('theme', 'light');
    }

    else console.log("Fehler bei Klassen");
})