// This is a client-side API handler that would normally be handled by an edge function
// For now, it's a placeholder that shows how the OpenAI integration would work

export async function chatWithOpenAI(message: string, apiKey: string, systemPrompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error('Erreur API OpenAI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}