const aplicarMascaraCEP = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length > 5) {
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
  }
  return value;
};

const cepInput = document.getElementById("novoCepInput");
cepInput.addEventListener("input", (event) => {
  event.target.value = aplicarMascaraCEP(event.target.value);
});

function buscarCEP(cep) {
  if (cep.length !== 9) {
    alert("CEP inválido. Deve conter 8 dígitos.");
    return;
  }

  const loadingScreen = document.getElementById("loading");
  loadingScreen.style.display = "block"; // mostrar animação de carregamento

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        document.getElementById("resultado").innerHTML =
          "<p>CEP não encontrado.</p>";
      } else {
        const resultado = `
            <p><strong>CEP:</strong> ${data.cep}</p>
            <p><strong>Logradouro:</strong> ${data.logradouro}</p>
            <p><strong>Complemento:</strong> ${data.complemento || "N/A"}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
            <p><strong>Localidade:</strong> ${data.localidade}</p>
            <p><strong>UF:</strong> ${data.uf}</p>
            <p><strong>DDD:</strong> ${data.ddd}</p>
          `;
        document.getElementById("resultado").innerHTML = resultado;
      }
    })
    .catch((error) => {
      console.error("Erro na requisição", error);
      document.getElementById("resultado").innerHTML =
        "<p>Erro ao buscar o CEP. Tente novamente mais tarde.</p>";
    })
    .finally(() => {
      loadingScreen.style.display = "none";
    });
}

document.getElementById("novoBuscarBotao").addEventListener("click", () => {
  const novoCep = document.getElementById("novoCepInput").value;
  buscarCEP(novoCep);
});

// busca o CEP da página anterior
document.addEventListener("DOMContentLoaded", function () {
  const cepInicial = localStorage.getItem("cep");
  if (cepInicial) {
    buscarCEP(cepInicial); // Busca o CEP salvo no localStorage
  }
});

// mostra o resultado salvo no localStorage (se tiver)
const resultado = localStorage.getItem("resultado");
document.getElementById("resultado").innerHTML =
  resultado || "Nenhum resultado encontrado.";
