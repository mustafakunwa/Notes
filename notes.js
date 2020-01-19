const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title == title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body,
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'));
    } else {
        console.log(chalk.yellow('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNotes = notes.filter((note) => note.title !== title)

    if (notes.length == remainingNotes.length) {
        console.log(chalk.red.inverse('No note found'));
    }
    else {
        saveNotes(remainingNotes);
        console.log(chalk.green.inverse('Note remove:', title));
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length > 0) {
        console.log(chalk.green.inverse('Your notes:'));
        notes.forEach((note, index) => {
            console.log(chalk.bold(index + 1, '.', note.title));
        });
    }
    else {
        console.log(chalk.red.inverse('No note found!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    if (notes.length == 0) {
        console.log(chalk.red.inverse('No note found'));
    }
    else {
        const note = notes.find((note) => note.title === title);
        if (note) {
            console.log(chalk.bold.green(note.title), ':', note.body)
        } else {
            console.log(chalk.red.inverse('No note found'));
        }
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);

    fs.writeFileSync('notes.json', dataJSON);

}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }

}

module.exports = {
    readNote: readNote,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
};