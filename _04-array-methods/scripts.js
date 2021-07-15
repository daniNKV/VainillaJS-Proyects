const DOM = {
    toggle: document.getElementById('toggle') ,
    open: document.getElementById('open') ,
    close: document.getElementById('close') ,
    modal: document.getElementById('modal') ,
    submit: document.querySelector('.submit')
}

// Toggle Nav

DOM.toggle.addEventListener('click', (e) => {
    document.body.classList.toggle('show-nav')
})

// Show Modal
DOM.open.addEventListener('click', () => DOM.modal.classList.add('show-modal'))

// Hide Modal
DOM.modal.addEventListener('click', () => DOM.modal.classList.remove('show-modal'));

// Hide Modal clicking outside 
window.addEventListener('click', e => e.target == modal ? DOM.modal.classList.remove('show-modal') : false);

// Prevent Default 
DOM.submit.addEventListener('click', e => e.preventDefault())