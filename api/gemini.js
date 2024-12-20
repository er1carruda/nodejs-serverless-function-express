export default async function handler(req, res) {
  const query = req.query.query || 'Explain how AI works';

  const body = {
    "contents": [{
      "parts": [{"text": query}]
    }]
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD1n_eWixzYfOr5pbCuAx88D_tI1j-DLu0`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  console.log('Dados recebidos da API Gemini:', JSON.stringify(data, null, 2));
  const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Não foi possível obter uma resposta.';
  res.status(200).send(answer);
}