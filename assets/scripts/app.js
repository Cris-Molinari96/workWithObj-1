const addModalElement = document.getElementById('add-modal');
const deleteModalElement = document.getElementById('delete-modal');
const buttonEnterMovie = document.querySelector('header button');
const backDropBackground = document.getElementById('backdrop');
const modalButtonComeBack = addModalElement.querySelector('.btn--passive');
const modalButtonAdd = addModalElement.querySelector('.btn--success');
const usrInput = addModalElement.querySelectorAll('input'); 
const entryTextSection = document.getElementById('entry-text');
const movies = [];


const deleteModal = (movieId) => {
    let movieIndex = 0 ; 
    for(const movie of movies ){
        if(movie.id === movieId ){
            break 
        }
        movieIndex++
    }
    movies.splice(movieIndex, 1);
    const unorderList = document.getElementById('movie-list');
    unorderList.children[movieIndex].remove();
        // unorderList.removeChild(unorderList.children[movieIndex]);
    deleteModalElement.classList.remove('visible');
    backgroundBackdrop();
    headlerEntryTextSection();
}

const recoverIdForDeleteMovieElement = movieId => {
    deleteModalElement.classList.add('visible');
    backgroundBackdrop();
    const cancelDeletionMoive = deleteModalElement.querySelector('.btn--passive');
    let confirmDeletionMovie = deleteModalElement.querySelector('.btn--danger');
    
    
    // confirmDeletionMovie.removeEventListener('click', deleteModal.bind(null, movieId));
    confirmDeletionMovie.replaceWith(confirmDeletionMovie.cloneNode(true));
    confirmDeletionMovie = deleteModalElement.querySelector('.btn--danger');

cancelDeletionMoive.removeEventListener('click', () => {
    deleteModalElement.classList.remove('visible');
    backDropBackground.classList.remove('visible')
} )

cancelDeletionMoive.addEventListener('click', () => {
    deleteModalElement.classList.remove('visible');
    backDropBackground.classList.remove('visible')
} )
confirmDeletionMovie.addEventListener('click', deleteModal.bind(null, movieId));
}

const addMovieElement  = (id, title, imgUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
    <div class = "movie-element__image" >
    <img src = "${imgUrl} " alt = "${title}">
    </div>
    
    <div class = "movie-element__info" >
    <h2>${title} </h2>
    <p>${rating} / 5 stars </p>
    </div>
    `;
    // Method bind mi permette di passare l'id del film a la funzione recover, collegandolo all'evento click, senza il bind non avrei mai l'id ottenuto tramite il click, ma verrebbe eseguito subito in quanto sarebbe scritto tra le parentesi e quindi la funzione verrebbe subito eseguita quando verrebbe creato un nuovo elemento film
    newMovieElement.addEventListener('click',  recoverIdForDeleteMovieElement.bind(null, id));
    const unorderList = document.getElementById('movie-list');
    unorderList.append(newMovieElement);
}

const headlerEntryTextSection = () => {
    if(movies.length === 0){
        entryTextSection.style.display = 'block';
    } else {
        entryTextSection.style.display = 'none';
    }
}

const clearInput = () => {
usrInput[0].value = '';
usrInput[1].value = '';
usrInput[2].value = '';
}

const addValueUserInput = () => {
    const title = usrInput[0].value
    const img = usrInput[1].value
    const rating = usrInput[2].value
        
    if (title.trim() === '' ||  img.trim() ==='' || rating.trim() === ''){
            alert('Please enter a valid values');
            return;
        }
        if(+rating <1 || +rating > 5){
            alert('Please enter a valid rating between 1 and 5');
            usrInput[0].value = usrInput[0].value ;
            usrInput[1].value = usrInput[1].value ;
            usrInput[2].value = '' ;
            return;
    }
    let movieObj = {
        id : Math.random().toString(),
        title: usrInput[0].value,
        imgUrl: usrInput[1].value,
        rating: usrInput[2].value
    }
    movies.push(movieObj);
    console.log(movies);
    
    addMovieElement(movieObj.id, movieObj.title, movieObj.imgUrl, movieObj.rating);
    headlerButtonPassive();
    headlerEntryTextSection();
}

const headlerButtonPassive = () => {
    headlerRemoveModalAndBackdrop()
    clearInput();
}

const backgroundBackdrop = () => {
    backDropBackground.classList.toggle('visible');
}

const headlerRemoveModalAndBackdrop = () => {
    addModalElement.classList.remove('visible');
    backDropBackground.classList.remove('visible');
    deleteModalElement.classList.remove('visible');
}
const addModalAndBackdrop = () => {
    addModalElement.classList.add('visible');
    backDropBackground.classList.add('visible');
}

buttonEnterMovie.addEventListener('click',addModalAndBackdrop);
// headlerToggleMovieModal);
backDropBackground.addEventListener('click', headlerRemoveModalAndBackdrop);

modalButtonComeBack.addEventListener('click', headlerButtonPassive);
modalButtonAdd.addEventListener('click', addValueUserInput);