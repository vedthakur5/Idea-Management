const addButton = document.getElementById("addnote");
const addButton2 = document.getElementById("addbucket");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

addButton.addEventListener("click", () => {
    addNewNote();
});

addButton2.addEventListener("click", () => {
    addNewBucket();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

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
        const { value } = e.target;

        main.innerHTML = marked(value);

        updateNote();
    });

    document.body.appendChild(note);
}

function addNewBucket(){
    const buck = document.createElement("div");
    buck.classList.add("bucket");
}

function updateNote() {
    const Updatenote = document.querySelectorAll("textarea");

    const notes = [];

    Updatenote.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}
