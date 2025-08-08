import axios from 'axios';
import { CreateInteraccioneDto } from '../dto/create-interaccione.dto';

export const sendMessageByN8n = async (payload: CreateInteraccioneDto) => {
  const urls = [""];

  for (const url of urls) {
    try {
      await axios.post(url);
      console.log(`Mensaje enviado correctamente a ${url}`);
    } catch (error) {
      console.error(`Error al enviar a ${url}:`, error.message);
    }
  }
};
