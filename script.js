const addBox = document.querySelector(".addBox");
const popupBox = document.querySelector(".popupMenu");
const popupTitle = document.querySelector("header p");
const closeIcon = document.querySelector("header i");
const titleTag = document.querySelector("#title");
const descTag = document.querySelector("#description");
const addButton = document.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

let isUpdate = false;
let updateId;

let notes = [];
let lcNotes = localStorage.getItem("notes");

if (lcNotes == null) {
    notes = [];
}
else {
    notes = JSON.parse(lcNotes);
}

addBox.addEventListener("click", function () {
    titleTag.focus();
    addButton.innerText = "Add Note";
    popupTitle.innerText = "Add a new Note";
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", function () {
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".notes").forEach((note) => { note.remove() });
    notes.forEach((note, index) => {
        let liTag = `<li class="notes">
                    <div class="details">
                        <p>${note.title}</p>
                        <span>${note.description}</span>
                    </div>
                    <div class="bottomContent">
                        <span>${note.date}</span>
                        <div class="settings">
                        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <div class="menu">
                            <ul>
                            <li onclick="editNote(${index},'${note.title}','${note.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                            <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash-can"></i>Delete</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDelete = confirm("Are you sure to delete this note?");
    if (!confirmDelete) return;
    notes.splice(noteId, 1); //removing selected note
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// let deleteAll = document.getElementById('deleteAll');
// deleteAll.addEventListener("click", function () {
//     notes = [];
//     localStorage.clear();
//     showNotes()

// })

function editNote(noteId, title, desc) {
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    addButton.innerText = "Update Note";
    popupTitle.innerText = "Update a Note";
    titleTag.value = title;
    descTag.value = desc;
    console.log(noteId, title, desc)
}

addButton.addEventListener("click", function (e) {
    e.preventDefault();
    let noteTitle = titleTag.value;
    let noteDescription = descTag.value;
    if (noteTitle || noteDescription) {
        let dateObj = new Date();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let year = dateObj.getFullYear();

        let notesInfo = {
            title: noteTitle,
            description: noteDescription,
            date: `${month} ${day}, ${year}`
        }

        if (!isUpdate) {
            notes.push(notesInfo);
        }
        else {
            notes[updateId] = notesInfo;
            isUpdate = false;
        }

        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }

});