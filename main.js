// Função para gerar senha
function geraSenha() {
    const tamanhoSenha = Number(document.getElementById('tamanhoSenha').value);
    const chkMaiusculas = document.getElementById('maiusculas').checked;
    const chkMinusculas = document.getElementById('minusculas').checked;
    const chkNumeros = document.getElementById('numeros').checked;
    const chkSimbolos = document.getElementById('simbolos').checked;

    let alfabeto = '';
    if (chkMaiusculas) alfabeto += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chkMinusculas) alfabeto += 'abcdefghijklmnopqrstuvwxyz';
    if (chkNumeros) alfabeto += '0123456789';
    if (chkSimbolos) alfabeto += '!@#$%&*()_+-=[]{}|;:,.<>?';

    if (alfabeto.length === 0) {
        alert('Selecione pelo menos uma opção de caracteres!');
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        senha += alfabeto[Math.floor(Math.random() * alfabeto.length)];
    }

    document.getElementById('senhaGerada').value = senha;

    // Agora classificar a senha
    classificaSenha(tamanhoSenha, alfabeto.length);
}

// Função para classificar força da senha usando entropia
function classificaSenha(tamanhoSenha, tamanhoAlfabeto) {
    const forcaSenha = document.getElementById('forcaSenha');
    const entropiaElem = document.querySelector('.entropia');

    // Entropia = tamanhoSenha * log2(tamanho do alfabeto)
    const entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);

    // Mostrar força da senha visual
    forcaSenha.className = 'forcaSenha'; // resetar classes

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35) {
        forcaSenha.classList.add('media');
    } else {
        forcaSenha.classList.add('fraca');
    }

    // Calcular quantos dias para quebrar a senha
    // Supondo 100 milhões de tentativas por segundo
    const tentativas = 2 ** entropia;
    const segundosParaQuebrar = tentativas / 100e6;
    const diasParaQuebrar = Math.floor(segundosParaQuebrar / (60 * 60 * 24));

    entropiaElem.textContent = `Um computador pode levar até ${diasParaQuebrar} dias para descobrir essa senha.`;
}

// Eventos para atualizar senha automaticamente
document.getElementById('btnGerar').addEventListener('click', geraSenha);
document.getElementById('tamanhoSenha').addEventListener('input', geraSenha);
document.getElementById('maiusculas').addEventListener('change', geraSenha);
document.getElementById('minusculas').addEventListener('change', geraSenha);
document.getElementById('numeros').addEventListener('change', geraSenha);
document.getElementById('simbolos').addEventListener('change', geraSenha);

// Gerar senha inicial ao abrir
geraSenha();
