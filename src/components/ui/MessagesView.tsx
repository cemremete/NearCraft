import { Search, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';

// TODO: hook this up to real backend eventually
interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean;
  isOnline?: boolean;
}

// mock data for now - will replace with API calls
const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Candle Making Group',
    avatar: '🕯️',
    lastMessage: 'Looking forward to Saturday!',
    time: '2m',
    unread: 3,
    isGroup: true,
  },
  {
    id: '2',
    name: 'Emma Wilson',
    avatar: 'EW',
    lastMessage: 'The materials are ready for you',
    time: '1h',
    unread: 1,
    isOnline: true,
  },
  {
    id: '3',
    name: 'Michael Chen',
    avatar: 'MC',
    lastMessage: 'Great job on your first pot! 🎉',
    time: '3h',
    unread: 0,
  },
  {
    id: '4',
    name: 'Pottery Enthusiasts',
    avatar: '🏺',
    lastMessage: 'Sofia: Who else is coming next week?',
    time: '1d',
    unread: 0,
    isGroup: true,
  },
  {
    id: '5',
    name: 'Sarah Martinez',
    avatar: 'SM',
    lastMessage: 'See you at the workshop!',
    time: '2d',
    unread: 0,
    isOnline: false,
  },
];

const MessagesView = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConv, setSelectedConv] = useState<string | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-12 bg-[#f8f7fc] dark:bg-[#1a1625] min-h-screen">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          {t('messages')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Chat with workshop hosts and attendees</p>
      </div>

      {/* Main Content - two column on desktop */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-full border-0 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
          </div>

          {/* List */}
          <div className="max-h-[500px] overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${selectedConv === conv.id ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className={conv.isGroup ? 'bg-purple-100 dark:bg-purple-900 text-xl' : 'bg-gray-100 dark:bg-gray-700 text-sm font-semibold'}>
                      {conv.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{conv.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{conv.unread}</span>
                  </div>
                )}
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area - placeholder for now */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[500px] flex flex-col">
          {selectedConv ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900">
                    {conversations.find(c => c.id === selectedConv)?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {conversations.find(c => c.id === selectedConv)?.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Online</p>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-gray-600 dark:text-gray-400 text-sm py-8">
                  {/* placeholder - would load actual messages here */}
                  Messages will appear here
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-700 rounded-full border-0 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 transition-all text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <button className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors text-sm">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Select a conversation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Choose from your existing conversations</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Workshop Buddy CTA */}
      <div className="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-200 dark:bg-purple-700 rounded-full flex items-center justify-center text-2xl">
            👥
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Looking for a Workshop Buddy?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find someone to attend workshops with
            </p>
          </div>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
            Find Buddies
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
