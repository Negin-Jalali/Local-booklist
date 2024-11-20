const $ = document;

let submit = $.getElementById('submit-book')
let titleInp = $.getElementById('title');
let authorInp = $.getElementById('author');
let yearInp = $.getElementById('year');
let modal = $.getElementById('bookModal');
let book = $.querySelectorAll('.book');
let booksContainer = $.querySelector('#book-list')


let booksArr = []


//prevent button from refreshing the page
submit.addEventListener('click', function(event) {  
    event.preventDefault();
});



// creat the book
function MakeBook(){
    // check user doesnt leave it empty
    if(titleInp.value === ''|| authorInp.value === '' || yearInp.value === ''){
        alert('Please fill the sections')
        return
    }

    let bookObj = {
        id: booksArr.length + 1,
        name: titleInp.value,
        author: authorInp.value,
        year: yearInp.value,
    }
    booksArr.push(bookObj);

    pushToLocal(booksArr);
    clearInputs();
    hideModal();
}


// hide modal 
function hideModal(){
    modal.className = 'modal fade'
    modal.style.display = 'none'
    $.body.classList.remove('modal-open')
    modal.setAttribute('aria-modal', 'true')
    modal.removeAttribute('aria-hidden')
    let modalBackdrop = $.querySelector('.modal-backdrop');
    modalBackdrop.remove()
}


// clear inputs
function clearInputs(){
    titleInp.value = ''
    authorInp.value = ''
    yearInp.value = ''
}


// push to local storage
function pushToLocal(allBooks){
    localStorage.setItem('booksArray',JSON.stringify(allBooks))
    booksGenerator(allBooks)
}

// books generator and show in DOM
function booksGenerator(allBooks){
    booksContainer.innerHTML = ''
    allBooks.forEach(book => {
        let colDiv = $.createElement('div');
        colDiv.className = 'col-md-4 mb-4 book';
    
        let cardDiv = $.createElement('div');
        cardDiv.className = 'card book-card';
    
        let cardBodyDiv = $.createElement('div');
        cardBodyDiv.className = 'card-body text-center';
    
        let title = $.createElement('h5');
        title.className = 'card-title';
        title.innerHTML = book.name;
    
        let author = $.createElement('p');
        author.className = 'card-text';
        author.innerHTML = book.author;
    
        let year = $.createElement('p');
        year.className = 'card-text';
    
        let yearSmallTag = $.createElement('small');
        yearSmallTag.className = 'text-muted'
        yearSmallTag.innerHTML = book.year;
    
    
        year.append(yearSmallTag);
        cardBodyDiv.append(title, author, year);
        cardDiv.append(cardBodyDiv);
        colDiv.append(cardDiv);
        booksContainer.append(colDiv)
    
        // delete book
        colDiv.addEventListener('click', deleteBook)
    });

        
}


// onload event on window
window.onload = function(){
    getBooksFromLocal()
}

function getBooksFromLocal(){ 
    let item = localStorage.getItem('booksArray');  
    if (item) {  
        booksArr = JSON.parse(item);
        booksGenerator(booksArr)
    }
}


submit.addEventListener('click', MakeBook)


// delete book
function deleteBook(event){
    event.target.remove();
    localStorage.removeItem("booksArray[event]");
}
