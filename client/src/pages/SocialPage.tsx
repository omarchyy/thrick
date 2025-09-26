import { useState } from "react";
import { Send, UserPlus, Search, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

export default function SocialPage() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"messages" | "friends">("messages");
  const [selectedFriend, setSelectedFriend] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState("");
  const [newFriendUsername, setNewFriendUsername] = useState("");

  // Mock data - todo: remove mock functionality
  const [friends] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarahc",
      avatar: "",
      status: "online",
      level: 15,
      lastActive: "2 minutes ago"
    },
    {
      id: 2,
      name: "Mike Johnson", 
      username: "mikej",
      avatar: "",
      status: "away",
      level: 8,
      lastActive: "1 hour ago"
    },
    {
      id: 3,
      name: "Emma Wilson",
      username: "emmaw",
      avatar: "",
      status: "offline",
      level: 12,
      lastActive: "3 hours ago"
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      friendId: 1,
      sender: "Sarah Chen",
      message: "Just completed my morning meditation! How's your wellness journey going today?",
      timestamp: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      friendId: 1,
      sender: "Me",
      message: "That's awesome! I just finished my nature walk. The fresh air was so refreshing 🌳",
      timestamp: "10:35 AM", 
      isMe: true
    },
    {
      id: 3,
      friendId: 1,
      sender: "Sarah Chen",
      message: "Nature walks are the best! I should join you sometime. Want to start a mindfulness journey together?",
      timestamp: "10:40 AM",
      isMe: false
    }
  ]);

  const selectedFriendData = friends.find(f => f.id === selectedFriend);
  const friendMessages = messages.filter(m => m.friendId === selectedFriend);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedFriend) {
      const newMsg = {
        id: messages.length + 1,
        friendId: selectedFriend,
        sender: "Me",
        message: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
      console.log(`Sent message: ${newMessage}`);
    }
  };

  const handleAddFriend = () => {
    if (newFriendUsername.trim()) {
      console.log(`Adding friend: ${newFriendUsername}`);
      setNewFriendUsername("");
      // Mock success feedback
      alert(`Friend request sent to ${newFriendUsername}!`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-social-title">
          Social
        </h1>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "messages" ? "default" : "outline"}
            onClick={() => setActiveTab("messages")}
            data-testid="tab-messages"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Messages
          </Button>
          <Button
            variant={activeTab === "friends" ? "default" : "outline"}
            onClick={() => setActiveTab("friends")}
            data-testid="tab-friends"
          >
            <Users className="h-4 w-4 mr-2" />
            Friends
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "messages" && (
          <div className="flex h-full">
            {/* Friends List */}
            <div className="w-1/3 border-r border-border p-4 space-y-3">
              {friends.map((friend) => (
                <Card 
                  key={friend.id} 
                  className={`p-3 cursor-pointer hover-elevate ${
                    selectedFriend === friend.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedFriend(friend.id)}
                  data-testid={`friend-${friend.username}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                        friend.status === "online" ? "bg-green-500" :
                        friend.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {friend.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Level {friend.level} • {friend.lastActive}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedFriendData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedFriendData.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {selectedFriendData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-foreground" data-testid="text-chat-friend-name">
                          {selectedFriendData.name}
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedFriendData.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    {friendMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                        data-testid={`message-${msg.id}`}
                      >
                        <div className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.isMe 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                        data-testid="input-message"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        size="icon"
                        data-testid="button-send-message"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-muted-foreground">Select a friend to start chatting</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "friends" && (
          <div className="p-6 space-y-6">
            {/* Add Friend */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add Friend
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter username..."
                  value={newFriendUsername}
                  onChange={(e) => setNewFriendUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddFriend()}
                  className="flex-1"
                  data-testid="input-add-friend"
                />
                <Button 
                  onClick={handleAddFriend}
                  data-testid="button-add-friend"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </Card>

            {/* Friends List */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Your Friends</h3>
              {friends.map((friend) => (
                <Card key={friend.id} className="p-4 hover-elevate">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={friend.avatar} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {friend.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                          friend.status === "online" ? "bg-green-500" :
                          friend.status === "away" ? "bg-yellow-500" : "bg-gray-400"
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground" data-testid={`text-friend-${friend.username}`}>
                          {friend.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          @{friend.username} • Level {friend.level}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active {friend.lastActive}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={friend.status === "online" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {friend.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}