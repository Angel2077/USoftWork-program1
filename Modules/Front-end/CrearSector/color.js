document.querySelectorAll('.color-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remueve la clase 'selected' de todos los items
        document.querySelectorAll('.color-item').forEach(el => el.classList.remove('selected'));
        // Agrega la clase 'selected' al item clickeado
        this.classList.add('selected');
    });
});
