const cepInput = document.getElementById("floatingInput");
const buscarBotao = document.getElementById("botaoBuscar");
const loadingScreen = document.getElementById("loading");

buscarBotao.addEventListener("click", () => {
  const cep = cepInput.value;

  if (cep.length !== 8) {
    alert("CEP inválido. Deve conter 8 dígitos.");
    return;
  }

  loadingScreen.style.display = "block";

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        localStorage.setItem("resultado", "CEP não encontrado");
      } else {
        const resultado = `
                    <p>CEP: ${data.cep}</p>
                    <p>Logradouro: ${data.logradouro}</p>
                    <p>Complemento: ${data.complemento}</p>
                    <p>Bairro: ${data.bairro}</p>
                    <p>Localidade: ${data.localidade}</p>
                    <p>UF: ${data.uf}</p>
                    <p>DDD: ${data.ddd}</p>
                `;
        localStorage.setItem("resultado", resultado);
      }
      // vai redirecionar para a pagina de resultado.html
      window.location.href = "resultado.html";
    })
    .catch((error) => {
      console.error("Erro na requisição", error);
      localStorage.setItem(
        "resultado",
        "Erro ao buscar o CEP. Tente novamente mais tarde."
      );
      window.location.href = "resultado.html";
    })

    .finally(() => {
      // esconde a tela de carregamento quando o redirecionamento é muito rápido)
      loadingScreen.style.display = "none";
    });
});
