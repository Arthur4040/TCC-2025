  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.appspot.com",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const selectEscola = document.getElementById("escolaSelecionada");
  const materiaisDiv = document.getElementById("materiaisDisponiveis");
  const mapaEscolas = {};

  // Preencher o select com as escolas
  const params = new URLSearchParams(window.location.search);
  const escolaSelecionada = params.get("escola");

  // Função para buscar escolas no Firebase e preencher o select
  async function carregarEscolas() {
    const querySnapshot = await getDocs(collection(db, "escolas"));
    selectEscola.innerHTML = `<option disabled selected>Selecione uma escola</option>`;

    querySnapshot.forEach((doc) => {
      const dados = doc.data();
      const option = document.createElement("option");
      option.value = dados.nome;
      option.textContent = dados.nome;

      if (dados.nome === escolaSelecionada) {
        option.selected = true;
      }

      mapaEscolas[dados.nome] = dados;
      selectEscola.appendChild(option);
    });

    // Mostrar materiais se a escola já foi selecionada via URL
    if (escolaSelecionada && mapaEscolas[escolaSelecionada]) {
      mostrarMateriais(mapaEscolas[escolaSelecionada]);
    }
  }

  function mostrarMateriais(escola) {
    materiaisDiv.innerHTML = `<h1>MATERIAIS NECESSÁRIOS</h1>`;
    if (escola.materiais && escola.materiais.length > 0) {
      escola.materiais.forEach(material => {
        const id = material.toLowerCase().replace(/\s/g, "-");
        materiaisDiv.innerHTML += `
          <label for="${id}">
            <input type="checkbox" name="materiaisParaDoar" class="checkbox-materiais" id="${id}" value="${material}">
            ${material}
          </label><br>
        `;
      });
    } else {
      materiaisDiv.innerHTML += "<p>Essa escola ainda não marcou materiais necessários.</p>";
    }
  }

  selectEscola.addEventListener("change", function () {
    const escola = mapaEscolas[this.value];
    mostrarMateriais(escola);
  });

  document.getElementById("tipoEntrega").addEventListener("change", function () {
  const isRetirada = this.value === "retirada";
  const container = document.getElementById("enderecoContainer");

  // Mostrar ou ocultar o container
  container.classList.toggle("visivel", isRetirada);

  // Lista de IDs dos campos de endereço
  const camposEndereco = ["rua", "numero", "bairro", "CEP", "munincipio"];

  camposEndereco.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      if (isRetirada) {
        campo.setAttribute("required", "required");
      } else {
        campo.removeAttribute("required");
      }
    }
  });
});

 document.getElementById("enviar doação").addEventListener("submit", (e) => {
  e.preventDefault(); // Previne envio do formulário

  // Verifica se pelo menos uma checkbox está marcada
  const selecionados = document.querySelectorAll('.checkbox-materiais:checked');
  
  if (selecionados.length === 0) {
    alert("Por favor, selecione pelo menos um material para doar.");
    return; // Impede o envio se nada estiver marcado
  }

  alert("Doação realizada com sucesso!");
  e.target.reset();
});

  carregarEscolas();
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
//--------------------------------------------------------------------------------------------------------------------------------

// Mewnu da versão de celular
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
