export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

const CONVERSATIONS_KEY = 'nearcraft_conversations';

const getConversationsKey = (userId: string) => `${CONVERSATIONS_KEY}_${userId}`;

export const getConversations = (userId: string): Conversation[] => {
  try {
    const conversationsJson = localStorage.getItem(getConversationsKey(userId));
    return conversationsJson ? JSON.parse(conversationsJson) : [];
  } catch {
    return [];
  }
};

export const getConversation = (userId: string, conversationId: string): Conversation | null => {
  const conversations = getConversations(userId);
  return conversations.find(c => c.id === conversationId) || null;
};

export const sendMessage = (
  userId: string,
  conversationId: string,
  content: string
): Message | null => {
  const conversations = getConversations(userId);
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) return null;

  const newMessage: Message = {
    id: crypto.randomUUID(),
    senderId: userId,
    senderName: 'You',
    content,
    timestamp: new Date().toISOString(),
    read: true,
  };

  conversation.messages.push(newMessage);
  conversation.lastMessage = content;
  conversation.lastMessageTime = newMessage.timestamp;

  localStorage.setItem(getConversationsKey(userId), JSON.stringify(conversations));
  return newMessage;
};

export const markAsRead = (userId: string, conversationId: string): void => {
  const conversations = getConversations(userId);
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (conversation) {
    conversation.unreadCount = 0;
    conversation.messages.forEach(m => m.read = true);
    localStorage.setItem(getConversationsKey(userId), JSON.stringify(conversations));
  }
};

export const getTotalUnreadCount = (userId: string): number => {
  const conversations = getConversations(userId);
  return conversations.reduce((total, c) => total + c.unreadCount, 0);
};

export const getMessageCount = (userId: string): number => {
  const conversations = getConversations(userId);
  return conversations.reduce((total, c) => total + c.messages.length, 0);
};

export const createConversation = (
  userId: string,
  participantId: string,
  participantName: string
): Conversation => {
  const conversations = getConversations(userId);
  
  const existing = conversations.find(c => c.participantId === participantId);
  if (existing) return existing;

  const newConversation: Conversation = {
    id: crypto.randomUUID(),
    participantId,
    participantName,
    lastMessage: '',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    messages: [],
  };

  conversations.push(newConversation);
  localStorage.setItem(getConversationsKey(userId), JSON.stringify(conversations));
  return newConversation;
};
