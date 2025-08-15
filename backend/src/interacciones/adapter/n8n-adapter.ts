import axios from 'axios';
import { CreateInteraccioneDto } from '../dto/create-interaccione.dto';

export const sendMessageByN8n = async (payload: CreateInteraccioneDto) => {
  const urls = [
    'https://primary-production-3577.up.railway.app/webhook-test/aa5d2a3d-9b3a-499d-9d51-fc11e6154cae',
    'https://primary-production-3577.up.railway.app/webhook/aa5d2a3d-9b3a-499d-9d51-fc11e6154cae',
  ];

  for (const url of urls) {
    try {
      await axios.post(url, payload);
      console.log(`Mensaje enviado correctamente a ${url}`);
    } catch (error) {
      console.error(`Error al enviar a ${url}:`, error.message);
    }
  }
};
