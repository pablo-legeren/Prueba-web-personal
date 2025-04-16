/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
	  const { HF_TOKEN, CV_CONTEXT } = env;
  
	  const body = await request.json();
	  const userMessage = body.message;
  
	  const fullPrompt = `${CV_CONTEXT}\n\nPregunta: ${userMessage}\nRespuesta:`;
  
	  const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1", {
		method: "POST",
		headers: {
		  Authorization: `Bearer ${HF_TOKEN}`,
		  "Content-Type": "application/json"
		},
		body: JSON.stringify({
		  inputs: fullPrompt,
		  parameters: {
			max_new_tokens: 300,
			temperature: 0.7
		  }
		})
	  });
  
	  const data = await response.json();
  
	  return new Response(
		JSON.stringify({ reply: data[0]?.generated_text || "Lo siento, no pude generar una respuesta." }),
		{
		  headers: { "Content-Type": "application/json" }
		}
	  );
	}
  }  
  
