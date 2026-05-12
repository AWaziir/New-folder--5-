import http from 'http';

const model = 'gemma4';
const prompt = process.argv.slice(2).join(' ');

if (!prompt) {
  console.error('Please provide a prompt.');
  process.exit(1);
}

const data = JSON.stringify({
  model: model,
  prompt: prompt,
  stream: false,
});

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = http.request(options, (res) => {
  let responseBody = '';

  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(responseBody);
      console.log(jsonResponse.response);
    } catch (e) {
      console.error('Failed to parse response:', responseBody);
    }
  });
});

req.on('error', (error) => {
  console.error('Ollama connection error. Is Ollama running?', error.message);
});

req.write(data);
req.end();
