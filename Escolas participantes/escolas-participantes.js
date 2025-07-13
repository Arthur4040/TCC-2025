// Importações modernas do Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"

  // Configuração Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.appspot.com",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  }

  // Inicializar app e banco
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
 
  // Função para buscar e exibir escolas
  const lista = document.getElementById("lista-Escolas")
  const barraPesquisa = document.getElementById("barradepesquisa")

  // array vazio para armazenar todas as escolas recuperadas do Firebase.
  let todasAsEscolas = []

  // Função para buscar escolas no Firebase e preencher a lista:
  async function carregarEscolas() {
    const querySnapshot = await getDocs(collection(db, "escolas")) // busca as escolas no Firebase
    lista.innerHTML = "" // limpa a lista
    todasAsEscolas = [] // limpa array antes de atualizar

    querySnapshot.forEach((doc) => { 
      const dados = doc.data() 
      todasAsEscolas.push(dados) 
    })
    /* Percorre cada documento (doc) retornado do Firestore.
      doc.data() pega os dados do documento como objeto JS.
      Adiciona esse objeto ao array todasAsEscolas. */

    exibirEscolas(todasAsEscolas) 
  }

  // Função para exibir as escolas na lista
  function exibirEscolas(escolasFiltradas) {
    lista.innerHTML = "" 

    // percorre as escolas e cria um card para cada uma'
    escolasFiltradas.forEach((dados) => { 
      const card = document.createElement("div")
      card.className = "card"
      card.innerHTML = `
        <h2>${dados.nome}</h2>
        <p><strong>Endereço: </strong> ${dados.municipio}, ${dados.rua}, ${dados.bairro} - ${dados.numero}</p>
        <strong>Modalidade de ensino: </strong>${dados.modalidade} <br><br>
        <strong>Materiais:</strong> <br>
        ${dados.materiais.map((material) => `<li>${material}</li>`).join("")}
        
        <div class="btn-doar">
          <a href="quero-ajudar.html?escola=${encodeURIComponent(dados.nome)}">
            <button class="doar">Doar agora</button>
          </a>
        </div>
      `
      lista.appendChild(card)
    })
  }

  // Função para buscar escolas com base na barra de pesquisa
  barraPesquisa.addEventListener("input", () => {
    const termo = barraPesquisa.value.toLowerCase()
    const filtradas = todasAsEscolas.filter((escola) =>
      escola.nome.toLowerCase().includes(termo)
    )
    exibirEscolas(filtradas)
  })

  // Carregar escolas ao carregar a página
  carregarEscolas()
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

// menu da versão de celular
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
//-----------------------------------------------------------------------------------------------------------------------------------------------------

//  API de libras
new window.VLibras.Widget('https://vlibras.gov.br/app');