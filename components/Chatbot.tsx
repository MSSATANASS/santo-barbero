import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse, Modality } from '@google/genai';

// Icons
const ChatIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const SpeakerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
);
const LoadingSpinner: React.FC<{ size?: string }> = ({ size = 'w-5 h-5' }) => (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-white ${size}`}></div>
);


// Audio decoding functions for TTS
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const aiRef = useRef<GoogleGenAI | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        chatRef.current = aiRef.current.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are a helpful assistant for Santo Barbero, a high-end barbershop. Be friendly, professional, and a little stylish. Your name is 'SantoBot'. Keep your answers concise and well-formatted using markdown.",
            },
        });
        
        try {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        } catch (e) {
            console.error("Web Audio API is not supported in this browser.", e);
        }
        
        setMessages([{ id: 1, text: "¡Hola! Soy SantoBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy con tus citas, servicios o productos?", sender: 'bot' }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (chatRef.current) {
                const response: GenerateContentResponse = await chatRef.current.sendMessage({ message: input });
                const botMessage: Message = { id: Date.now() + 1, text: response.text, sender: 'bot' };
                setMessages(prev => [...prev, botMessage]);
            }
        } catch (error) {
            console.error("Error sending message to Gemini:", error);
            const errorMessage: Message = { id: Date.now() + 1, text: "Lo siento, algo salió mal. Por favor, intenta de nuevo.", sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSpeak = async (message: Message) => {
        if (speakingMessageId === message.id || !aiRef.current || !audioContextRef.current) return;
        setSpeakingMessageId(message.id);

        try {
            const ai = aiRef.current;
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: message.text }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });
            
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
                const audioBuffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
                const source = audioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContextRef.current.destination);
                source.start();
                source.onended = () => setSpeakingMessageId(null);
            } else {
                 setSpeakingMessageId(null);
            }

        } catch (error) {
            console.error("TTS Error:", error);
            setSpeakingMessageId(null);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col h-[60vh] w-80 sm:w-96 bg-[#1f1a17] rounded-lg shadow-2xl border border-gray-700">
                    <header className="flex items-center justify-between p-4 bg-[#2a211c] border-b border-gray-700 rounded-t-lg">
                        <h3 className="text-lg font-semibold text-[#e0e0e0] font-cinzel">Asistente Virtual</h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <CloseIcon />
                        </button>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#c5a47e] text-gray-900 rounded-br-none' : 'bg-[#2a211c] text-gray-200 rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                {msg.sender === 'bot' && (
                                    <button onClick={() => handleSpeak(msg)} className="text-gray-400 hover:text-[#c5a47e] transition-colors self-center flex-shrink-0" disabled={speakingMessageId !== null}>
                                        {speakingMessageId === msg.id ? <LoadingSpinner size="w-4 h-4"/> : <SpeakerIcon />}
                                    </button>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[#2a211c] p-3 rounded-lg rounded-bl-none inline-flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-[#2a211c] rounded-b-lg">
                        <div className="flex items-center bg-[#1f1a17] border-2 border-gray-700 rounded-lg overflow-hidden focus-within:border-[#c5a47e]">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="w-full bg-transparent p-2 text-gray-200 focus:outline-none"
                                disabled={isLoading}
                            />
                            <button type="submit" className="p-3 text-[#c5a47e] hover:text-white disabled:text-gray-600" disabled={isLoading || !input.trim()}>
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-[#c5a47e] text-gray-900 rounded-full p-4 shadow-lg hover:bg-[#b5946e] transition-all duration-300 transform hover:scale-110 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
                aria-label="Abrir chat"
            >
                <ChatIcon />
            </button>
        </div>
    );
};

export default Chatbot;
