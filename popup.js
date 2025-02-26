document.addEventListener("DOMContentLoaded", async function() {
  const resultadoDiv = document.getElementById("resultado");
  
  try {
    const formData = new URLSearchParams();

    const response = await fetch("https://api.adviceslip.com/advice", {
      method: "GET",      
    });

    const text = await response.text();
    
    try {
      const data = JSON.parse(text);
    
      if (!data || Object.keys(data).length === 0) {
        resultadoDiv.innerHTML = `
        <h2><strong>Nenhum conselho encontrado</strong></h2>
        <h5>Por favor, tente novamente.</h5>`;
        throw new Error("Nenhum conselho encontrado. Por favor, tente novamente.");        
      }

      //EXEMPLO DE RETORNO DA API
      //{"slip": { "id": 27, "advice": "Don't wear clean trousers when walking your dog in the park."}}

      resultadoDiv.innerHTML = `
          <h2><strong>Conselho do dia:</strong></h2>          
          <hr> 
          <h5>${data.slip.advice}</h5>                     
      `;
    } catch (error) {
      console.error("Erro ao processar JSON:", error);
      resultadoDiv.innerHTML = `<p style='color: red;'>Erro ao buscar conselho: ${error.message}</p>`;
    }
  } catch (error) {
    resultadoDiv.innerHTML = `<p style='color: red;'>Erro ao buscar conselho: ${error.message}</p>`;
  }
});