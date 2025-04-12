function cesarDecifrar(mensagem, cifra) {
    let resultado = "";
    let cifraNumerica = parseInt(cifra);
    if (typeof mensagem === 'string' && typeof cifraNumerica === 'number' && !isNaN(cifraNumerica)) {
        for (let i = 0; i < mensagem.length; i++) {
            let char = mensagem[i];
            if (char.match(/[a-z]/i)) {
                let codigo = mensagem.charCodeAt(i);
                if (char >= 'A' && char <= 'Z') {
                    char = String.fromCharCode(((codigo - 65 + cifraNumerica) % 26) + 65);
                } else if (char >= 'a' && char <= 'z') {
                    char = String.fromCharCode(((codigo - 97 + cifraNumerica) % 26) + 97);
                }
            }
            resultado += char;
        }
        return resultado;
    } else {
        return "Erro: Mensagem ou cifra inválida.";
    }
}
