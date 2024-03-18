let bookList = [];

class Book {
    constructor (title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info () {
        return `<strong>${this.title}</strong><br>by<br>${this.author}<br>${this.pages} pages`
    }
}

const startButton = document.getElementById('start');

startButton.addEventListener('click', function (){
    setApp();
})

function setApp () {
    const mainArea = document.getElementById('main');
    const header = document.querySelector('.header');
    mainArea.setAttribute('class','grid empty');
    header.classList.toggle('top');
    startButton.remove();
    const newButton = document.createElement('button');
    const delButton = document.createElement('button');
    newButton.setAttribute('class','add');
    newButton.textContent = 'New Book';
    delButton.setAttribute('class','del');
    delButton.textContent = 'Delete Book';
    header.appendChild(newButton);
    header.appendChild(delButton);
    const dialog = document.querySelector('dialog');
    newButton.addEventListener('click',function () {
        dialog.showModal();
    });
    const cancelButton = document.querySelector('dialog .del');
    cancelButton.addEventListener('click', function () {
        dialog.close();
    });
    const addButton = document.querySelector('dialog .add');
    addButton.addEventListener('click', function () {
        getInput();
    });
    delButton.addEventListener('click',function(){
        const cards = document.querySelectorAll('.card button.delete');
        cards.forEach(button => {
            button.classList.toggle('enable');
        });
    })
}

function getInput (){
    const dialog = document.querySelector('dialog');
    const form = document.querySelector('form');
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');
    title = capitalize(title.value);
    author = capitalize(author.value);
    bookList.push(new Book (title,author,pages.value,read.value));
    console.log(bookList);
    createCard(bookList.length-1);
    form.reset();
    dialog.close();
}

function createCard(index){
    const mainArea = document.getElementById('main');
    const newCard = document.createElement('div');
    newCard.setAttribute('id',index);
    newCard.setAttribute('class','card');
    newCard.innerHTML = bookList[index].info();
    mainArea.classList.remove('empty');
    const delButton = document.createElement('button');
    const readButton = document.createElement('button');
    delButton.setAttribute('class','delete');
    console.log(bookList[index].read);
    if (bookList[index].read === 'true') {
        readButton.setAttribute('class','status');
        console.log('first if');
    } else {
        readButton.setAttribute('class','status not-read');
    }
    delButton.addEventListener('click', function (){
        removeCard(index);
    });
    readButton.addEventListener('click', function () {
        readButton.classList.toggle('not-read');
    })
    newCard.appendChild(delButton);
    newCard.appendChild(readButton);
    mainArea.appendChild(newCard);
}

function removeCard (index){
    const card = document.getElementById(index);
    card.remove();
    bookList.splice(index,1);
}

function capitalize(string){
    let words = string.split(' ');
    let capitalized = words.map(function(word){
        console.log(word);
        return word[0].toUpperCase()+word.slice(1);
    });
    return capitalized.join(' ');
}

