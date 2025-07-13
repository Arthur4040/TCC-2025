// Modo claro e escuro
 const html = document.documentElement;
// CORREÇÃO: Altera o ID para 'checkbox' para corresponder ao HTML
const toggleSwitch = document.getElementById('checkbox'); // Assumindo que este é o seu checkbox de alternância de tema

function atualizarBotao(tema) {
    // Atualiza o estado do checkbox (marcado/desmarcado)
    if (toggleSwitch) {
        toggleSwitch.checked = (tema === 'dark');
    }
}

function alternarTema() {
    // Pega o tema atual baseado no estado do checkbox
    const novoTema = toggleSwitch.checked ? 'dark' : 'light';
    html.setAttribute('data-theme', novoTema);
    localStorage.setItem('tema', novoTema); // Salva a preferência no localStorage
    // Não é necessário chamar atualizarBotao aqui, pois o estado do checkbox já reflete o novo tema.
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
        atualizarBotao('light'); // Atualiza o estado visual do checkbox
    }

    // Adiciona o event listener ao checkbox de alternância de tema
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', alternarTema);
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  }
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------

// API de libras
new window.VLibras.Widget('https://vlibras.gov.br/app');