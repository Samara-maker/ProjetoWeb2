const btnMusica = document.getElementById('btnMusica');
const musica = document.getElementById('musicaFundo');

btnMusica.addEventListener('click', () => {
    musica.play().then(() => {
        btnMusica.style.display = 'none'; // esconde o botão depois
    }).catch(erro => {
        console.error("Erro ao tentar tocar a música:", erro);
    });
});