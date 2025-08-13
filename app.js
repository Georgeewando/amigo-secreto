// Array para armazenar os nomes dos amigos
let amigos = [];


// Função para adicionar um amigo
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo) {
        amigos.push(nomeAmigo);
        exibirAmigos();
        inputAmigo.value = '';
        document.getElementById('resultado').textContent = '';
    } else {
        alert('Por favor, digite um nome para adicionar.');
    }
}

// Função para exibir a lista de amigos  
function exibirAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';

    if (amigos.length === 0) {
        listaAmigos.innerHTML = '<li>Nenhum amigo adicionado ainda.</li>';
        return;
    }

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;

        const removerBtn = document.createElement('button');
        removerBtn.textContent = 'Remover';
        removerBtn.className = 'button-remove';
        removerBtn.onclick = () => removerAmigo(index); 
        li.appendChild(removerBtn);

        listaAmigos.appendChild(li);
    });
}

// Função para remover um amigo
function removerAmigo(index) {
    amigos.splice(index, 1); 
    exibirAmigos();
    document.getElementById('resultado').textContent = '';
console.log(amigos)

}

// Função para sortear os amigos
function sortearAmigo() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (amigos.length < 2) {
        alert('Adicione pelo menos dois amigos para fazer o sorteio!');
        return;
    }

    let amigosEmbaralhados = [...amigos].sort(() => Math.random() - 0.5);

    let sorteioResultado = [];
    for (let i = 0; i < amigos.length; i++) {
        const doador = amigos[i];
        let receptor = amigosEmbaralhados[i];

        if (doador === receptor) {
            if (i === amigos.length - 1) {
                [sorteioResultado[0].receptor, receptor] = [receptor, sorteioResultado[0].receptor];
            } else {
                [amigosEmbaralhados[i], amigosEmbaralhados[i + 1]] =
                [amigosEmbaralhados[i + 1], amigosEmbaralhados[i]];
                receptor = amigosEmbaralhados[i];
            }
        }
        sorteioResultado.push({ doador: doador, receptor: receptor });
    }

    sorteioResultado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.doador} tirou ${item.receptor}`;
        resultadoDiv.appendChild(li);
    });
}



document.addEventListener('DOMContentLoaded', exibirAmigos);
