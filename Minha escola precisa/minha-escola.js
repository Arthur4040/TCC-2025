const firebaseConfig = {
    apiKey: "AIzaSyDgiVxEr2eRS2PmVziqgwaUUTRjkPBRHww",
    authDomain: "caminhos-do-saber-c55dc.firebaseapp.com",
    projectId: "caminhos-do-saber-c55dc",
    storageBucket: "caminhos-do-saber-c55dc.firebasestorage.app",
    messagingSenderId: "329237494439",
    appId: "1:329237494439:web:d6c4fb0fdff07ed1ee3982",
    measurementId: "G-EHM4TJY8W8"
  };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    document.getElementById('Registrar').addEventListener('submit', function (e) {
      e.preventDefault();

      const materiaisSelecionados = Array.from(document.querySelectorAll('.checkbox-materiais'))
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      if (materiaisSelecionados.length === 0) {
        alert('Por favor, selecione pelo menos um material.');
        return;
      }

      let escola = {
        nome: document.getElementById('nome').value,
        modalidade: document.getElementById('modalidade').value,
        porte: document.getElementById('porte').value,
        codigoINEP: document.getElementById('codigoINEP').value,
        municipio: document.getElementById('municipio').value,
        cep: document.getElementById('CEP').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        materiais: materiaisSelecionados
      };

      db.collection('escolas').add(escola).then(() => {
         alert('Escola registrada com sucesso!');
        document.getElementById('Registrar').reset();
      });
    });
//--------------------------------------------------------------------------------------------------------------------------------------

// Busca CEP
function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('rua').value=("");
            document.getElementById('bairro').value=("");
            document.getElementById('municipio').value=("");
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('rua').value=(conteudo.logradouro);
            document.getElementById('bairro').value=(conteudo.bairro);
            document.getElementById('municipio').value=(conteudo.localidade);
      
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value="...";
                document.getElementById('bairro').value="...";
                document.getElementById('municipio').value="...";

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };
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
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
//-----------------------------------------------------------------------------------------------------------------------------------------------------

// API libras
 new window.VLibras.Widget('https://vlibras.gov.br/app');