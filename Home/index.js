// Sistema do carrosel de autoplay dele
const images = document.querySelectorAll('#carousel img');
let currentIndex = 0;
let intervalId = null;
let timeoutId = null;
let userInteracted = false;

function showSlide(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) img.classList.add('active');
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(currentIndex);
}

function startAutoplay() {
    intervalId = setInterval(() => {
        if (!userInteracted) {
            nextSlide();
        }
    }, 4000);
}

function stopAutoplay() {
    clearInterval(intervalId);
}

function userInteraction() {
    userInteracted = true;
    stopAutoplay();

    // Limpa timeout anterior
    clearTimeout(timeoutId);

    // Define novo timeout para retomar autoplay após 60s
    timeoutId = setTimeout(() => {
        userInteracted = false;
        startAutoplay();
    }, 60000); // 60 segundos
}

// Iniciar ao carregar a página
startAutoplay();

//--------------------------------------------------------------------------------------------------------------------------------

// Modo claro e escuro
const html = document.documentElement;
const toggleSwitch = document.getElementById('checkbox'); 

function atualizarBotao(tema) {
    if (toggleSwitch) {
        toggleSwitch.checked = (tema === 'dark');
    }
}

function alternarTema() {
    // Pega o tema atual baseado no estado do checkbox
    const novoTema = toggleSwitch.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema); // Salva a preferência no localStorage
}

document.addEventListener('DOMContentLoaded', () => {
    // Pega o tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema');

    // Aplica o tema salvo ou padroniza para 'light'
    if (temaSalvo === 'dark') {
        html.setAttribute('data-theme', 'dark');
        atualizarBotao('dark'); // Atualiza o estado visual do checkbox
    } else {
        // Se não houver tema salvo ou for 'light', define como 'light'
        html.setAttribute('data-theme', 'light');
        atualizarBotao('light'); 
    }

    // Adiciona o event listener ao checkbox de alternância de tema
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', alternarTema);
    }
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------

// Menu da versão de celular
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    console.log("Toggle clicado");
    navbar.classList.toggle("show");
  });
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------

 // Carrossel de depoimentos 
let currentSlideDepo = 0;
const carrosselDepo = document.getElementById("carrossel-card");
const cards = carrosselDepo.querySelectorAll(".card-avaliacao");
const totalSlidesDepo = cards.length;

function updateCarouselDepo() {
  carrosselDepo.style.transform = `translateX(-${currentSlideDepo * 100}%)`;
}

function antSlide() {
  currentSlideDepo = (currentSlideDepo - 1 + totalSlidesDepo) % totalSlidesDepo;
  updateCarouselDepo();
}

function proxSlide() {
  currentSlideDepo = (currentSlideDepo + 1) % totalSlidesDepo;
  updateCarouselDepo();
}
//-----------------------------------------------------------------------------------------------------------------------------------------------------

// API de libras
new window.VLibras.Widget('https://vlibras.gov.br/app');