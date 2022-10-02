const butInstall = document.getElementById('buttonInstall');
let savedEvent;
// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (e) => {
    // prevent older browsers from showing the event;
    e.preventDefault();

    // save it to be shown later
    savedEvent = e;

    // show install button
    butInstall.style.display = 'block';

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (!savedEvent) {
        return;
    }
    savedEvent.prompt();
    savedEvent.userChoice.then((result)=>{
        if(result.outcome === 'accepted') {
            console.log('User accepted the prompt.');
        }
        savedEvent = null;
    });
});

window.addEventListener('appinstalled', (event) => {
    console.log('installed');
});
