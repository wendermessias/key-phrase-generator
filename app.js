document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos elementos do DOM
    const palavra1Input = document.getElementById('palavra1');
    const palavra2Input = document.getElementById('palavra2');
    const palavra3Input = document.getElementById('palavra3');
    const embaralharBtn = document.getElementById('embaralharBtn');
    const limparBtn = document.querySelector('.buttonRefresh');
    const senhaGeradaInput = document.getElementById('senhaGerada');
    const copiarBtn = document.getElementById('copiarBtn');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Seleciona o elemento onde a mensagem de erro será exibida
    const errorMessage = document.getElementById('errorMessage');
    // Seleciona o ícone de atualização pela sua ID para a animação
    const refreshIcon = document.getElementById('RefreshIcons');

    // --- Funções Auxiliares ---

    // Função para embaralhar uma string
    function embaralhar(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    // Função principal para gerar a senha forte
    function gerarSenhaForte() {
        const palavra1 = palavra1Input.value.trim();
        const palavra2 = palavra2Input.value.trim();
        const palavra3 = palavra3Input.value.trim();

        // Limpa qualquer mensagem de erro anterior e a oculta
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // Validação: verifica se pelo menos duas palavras foram inseridas
        if (!palavra1 || !palavra2) {
            // Exibe a mensagem de erro diretamente na página
            errorMessage.textContent = 'Por favor, insira pelo menos duas palavras.';
            errorMessage.style.display = 'block'; // Torna o elemento visível
            return; // Interrompe a execução da função
        }

        // Constrói a base da senha com as palavras fornecidas
        let palavras = [palavra1, palavra2];
        if (palavra3) {
            palavras.push(palavra3);
        }

        let senhaBase = palavras.join('-');
        let senhaEmbaralhada = embaralhar(senhaBase);

        // Adiciona caracteres especiais e números aleatórios
        const caracteresEspeciais = "!@#$%^&*()_+=-`~[]{}|;':\",./<>?";
        const numeros = "0123456789";

        const adicionarAleatorio = (str) => {
            const indiceAleatorio = Math.floor(Math.random() * str.length);
            return str.charAt(indiceAleatorio);
        };

        senhaEmbaralhada += adicionarAleatorio(caracteresEspeciais);
        senhaEmbaralhada += adicionarAleatorio(numeros);
        senhaEmbaralhada = embaralhar(senhaEmbaralhada); // Embaralha novamente a senha final

        // Exibe a senha gerada no campo de input
        senhaGeradaInput.value = senhaEmbaralhada;
    }

    // Função para limpar os campos e animar o ícone de refresh
    function limparCampos() {
        palavra1Input.value = '';
        palavra2Input.value = '';
        palavra3Input.value = '';
        senhaGeradaInput.value = '';

        // Limpa a mensagem de erro ao limpar os campos
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';

        // Animação do ícone de refresh
        if (refreshIcon) { // Garante que o ícone foi encontrado
            refreshIcon.classList.add('spin-animation'); // Adiciona a classe para iniciar a animação
            // Remove a classe após a animação terminar para que possa ser reativada
            setTimeout(() => {
                refreshIcon.classList.remove('spin-animation');
            }, 500); // O tempo (500ms) deve corresponder à duração da animação no CSS
        }
    }

    // Função para alternar o tema da página
    function alternarTema() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.classList.remove('ativo');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeToggle.classList.add('ativo');
        }
    }

    // --- Adição dos Event Listeners ---

    embaralharBtn.addEventListener('click', gerarSenhaForte);
    limparBtn.addEventListener('click', limparCampos);

    themeToggle.addEventListener('click', alternarTema);

    // Função para copiar a senha gerada
    copiarBtn.addEventListener('click', () => {
        // Seleciona o texto no input da senha gerada
        senhaGeradaInput.select();
        senhaGeradaInput.setSelectionRange(0, 99999); // Para dispositivos móveis

        // Copia o texto para a área de transferência
        navigator.clipboard.writeText(senhaGeradaInput.value)
            .then(() => {
                // Opcional: feedback para o usuário
                alert('Senha copiada para a área de transferência!');
            })
            .catch(err => {
                console.error('Erro ao copiar a senha: ', err);
                alert('Falha ao copiar a senha. Por favor, copie manualmente.');
            });
    });
});