const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ROTORES = [
    "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    "AJDKSIRUXBLHWTMCQGZNPYFVO3",
    "BDFHJLCPRTXVZNYEIWGAKMUSQO"
];
const REFLETOR = { // todas as letras correspondem ao seu oposto (A: "Y", Y: "A")
    A: "Y", B: "R", C: "U", D: "H", E: "Q", F: "S", G: "L", H: "D", I: "P", J: "X", K: "N", L: "G", M: "O",
    N: "K", O: "M", P: "I", Q: "E", R: "B", S: "F", T: "Z", U: "C", V: "W", W: "V", X: "J", Y: "A", Z: "T"
};

const PLUGBOARD = {
    A: "M", M: "A", G: "L", L: "G", E: "T", T: "E"
}

function rotateRotor(rotor, offset) {
    return rotor.slice(offset) + rotor.slice(0, offset);
}

function plugboardSwap(char) {
    return PLUGBOARD[char] || char;
}

function enigmaProcess(text, rotorPositions) {
    let result = "";
    let [r1, r2, r3] = rotorPositions;

    for (let i = 0; i < text.length; i++) {
        let char = text[i].toUpperCase();
        if (!ALFABETO.includes(char)) {
            result += char;
            continue;
        }

        char = plugboardSwap(char);

        r1 = (r1 + 1) % 26;
        if (i % 26 === 0) r2 = (r2 + 1) % 26;
        if (i % (26 * 26) === 0) r3 = (r3 + 1) % 26;

        const rotor1 = rotateRotor(ROTORES[0], r1);
        const rotor2 = rotateRotor(ROTORES[1], r2);
        const rotor3 = rotateRotor(ROTORES[2], r3);

        let index = ALFABETO.indexOf(char);
        char = rotor1[index];
        index = ALFABETO.indexOf(char);
        char = rotor2[index];
        index = ALFABETO.indexOf(char);
        char = rotor3[index];

        char = REFLETOR[char];
        index = rotor3.indexOf(char);
        char = ALFABETO[index];
        index = rotor2.indexOf(char);
        char = ALFABETO[index];
        index = rotor1.indexOf(char);
        char = ALFABETO[index];

        char = plugboardSwap(char);

        result += char;
    }
    return result;
}

let rotor1 = document.getElementById("rotor1").value;
let rotor2 = document.getElementById("rotor2").value;
let rotor3 = document.getElementById("rotor3").value;
let posicoesIniciais = [
    parseInt(rotor1),
    parseInt(rotor2),
    parseInt(rotor3)
];
const mensagem = document.getElementById("txaMensagem").value;

let mensagemCifrada = enigmaProcess(mensagem, [...posicoesIniciais]);