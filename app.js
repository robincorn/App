function showScreen(screenId){

    document
        .querySelectorAll('.screen')
        .forEach(el => el.classList.add('hidden'));

    document
        .getElementById(screenId)
        .classList.remove('hidden');
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}