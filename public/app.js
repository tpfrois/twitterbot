const botaoTweetar = document.querySelector("#tweetButton");

botaoTweetar.addEventListener("click", () => {
  const tweet = {
    status: document.querySelector("#tweetText").value,
  };

  fetch("/api/tweet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tweet),
  })
    .then(response => {
      if (response.status === 200)
        alert(`Tweet postado com sucesso! @botdatribo`);
      if (response.status === 429)
        alert("Você está tweetando muito! Aguarde 1 minuto.");
      return response.json();
    })
    .then(json => {
      if (json.code === 187) {
        alert("Tweet duplicado! Insira um tweet novo.");
        document.querySelector("#tweetText").value = "";
      }
    });
  // TODO - CRIAR FUNÇÃO errorHandler
  //--
});
