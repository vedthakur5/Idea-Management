const addButton = document.getElementById("addnote");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

addButton.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes" id = "notes">
            <div class="tools">
                <input type="text" class="form-control" id="usr">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `
    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");

    const main = note.querySelector(".main");
    const typeArea = note.querySelector("textarea");

    typeArea.value = text;
    main.innerHTML = marked(text);

    editButton.addEventListener("click", () => {
        main.classList.toggle("hidden");
        typeArea.classList.toggle("hidden");
    });


    deleteButton.addEventListener("click", () => {
        note.remove();

        updateNote();
    });

    typeArea.addEventListener("input", (e) => {
        const {value} = e.target;

        main.innerHTML = marked(value);

        updateNote();
    });

    document.body.appendChild(note);
}

function updateNote() {
    const Updatenote = document.querySelectorAll("textarea");

    const notes = [];

    Updatenote.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

$(document).ready(function() {
    $(".note").draggable();
  } );

for (var i=0; i < notes.length; i++) {
    console.log(notes[i])
 }