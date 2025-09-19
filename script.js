document.addEventListener('DOMContentLoaded', () => {

    // --- SELEÇÃO DOS ELEMENTOS ---
    const modal = document.getElementById('meuModal');
    const btnAbrir = document.getElementById('abrirModalBtn');
    const btnFechar = document.getElementById('fecharModalBtn');
    const feedbackMensagem = document.getElementById('feedbackMensagem');
    
    const form = document.getElementById("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const jobSelect = document.getElementById("job");
    const messageInput = document.getElementById("message");

    // --- FUNÇÕES DE CONTROLE DO MODAL ---
    function abrirModal() {
        form.reset();
        limparFeedback();
        modal.style.display = 'block';
    }

    function fecharModal() {
        modal.style.display = 'none';
    }

    // --- FUNÇÕES DE FEEDBACK ---
    function limparFeedback() {
        feedbackMensagem.style.display = 'none';
        feedbackMensagem.textContent = '';
        feedbackMensagem.className = ''; 
    }

    function exibirFeedback(mensagem, tipo = 'erro') {
        limparFeedback(); 
        feedbackMensagem.textContent = mensagem;
        feedbackMensagem.className = (tipo === 'erro') ? 'mensagem-erro' : 'mensagem-sucesso';
        feedbackMensagem.style.display = 'block';
    }

    // --- FUNÇÕES DE VALIDAÇÃO ---
    function isEmailValid(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    }

    function validatePassword(password, minDigits) {
        return password.length >= minDigits;
    }

    // --- EVENT LISTENERS (AÇÕES DO USUÁRIO) ---
    btnAbrir.addEventListener('click', abrirModal);
    btnFechar.addEventListener('click', fecharModal);

   
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });

  
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

     
        if (nameInput.value.trim() === "") {
            exibirFeedback("Por favor, preencha o seu nome.");
            return;
        }

        if (emailInput.value.trim() === "" || !isEmailValid(emailInput.value)) {
            exibirFeedback("Por favor, preencha um e-mail válido.");
            return;
        }

        if (!validatePassword(passwordInput.value, 8)) {
            exibirFeedback("A senha precisa ter no mínimo 8 caracteres.");
            return;
        }

        if (jobSelect.value === "") {
            exibirFeedback("Por favor, selecione a sua situação de trabalho.");
            return;
        }

        if (messageInput.value.trim() === "") { 
            exibirFeedback("Por favor, escreva uma mensagem.");
            return;
        }

     
        exibirFeedback("Formulário enviado com sucesso!", 'sucesso');
        
        setTimeout(() => {
            fecharModal();
        }, 2000); 
    });
});