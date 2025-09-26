import { useState } from "react";
import { Camera, Edit2, Save, User, Mail, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - todo: remove mock functionality
  const [userProfile, setUserProfile] = useState({
    id: 1,
    username: "james_wellness",
    email: "james@example.com",
    fullName: "James Wilson",
    bio: "On a journey to better wellness through daily mindful practices. Love connecting with others who share the same passion for growth!",
    location: "San Francisco, CA",
    joinDate: "2024-03-15",
    avatar: "",
    level: 12,
    totalQuests: 47,
    totalJourneys: 6,
    favoriteCategories: ["mindfulness", "movement", "kindness"]
  });

  const [editForm, setEditForm] = useState({
    username: userProfile.username,
    fullName: userProfile.fullName,
    bio: userProfile.bio,
    location: userProfile.location
  });

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      username: editForm.username,
      fullName: editForm.fullName,
      bio: editForm.bio,
      location: editForm.location
    }));
    setIsEditing(false);
    console.log("Profile updated:", editForm);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setEditForm({
      username: userProfile.username,
      fullName: userProfile.fullName,
      bio: userProfile.bio,
      location: userProfile.location
    });
    setIsEditing(false);
  };

  const handleAvatarUpload = () => {
    console.log("Avatar upload triggered");
    // Mock file upload
    alert("Avatar upload feature would open file picker here");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground" data-testid="text-profile-title">
          Profile
        </h1>
        
        {!isEditing ? (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            data-testid="button-edit-profile"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancelEdit}
              data-testid="button-cancel-edit"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveProfile}
              data-testid="button-save-profile"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {userProfile.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8"
                  onClick={handleAvatarUpload}
                  data-testid="button-upload-avatar"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {!isEditing ? (
                <>
                  <h2 className="text-xl font-semibold text-foreground" data-testid="text-profile-name">
                    {userProfile.fullName}
                  </h2>
                  <p className="text-muted-foreground" data-testid="text-profile-username">
                    @{userProfile.username}
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    Level {userProfile.level}
                  </Badge>
                </>
              ) : (
                <div className="space-y-3 w-full max-w-sm">
                  <Input
                    placeholder="Full Name"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                    data-testid="input-full-name"
                  />
                  <Input
                    placeholder="Username"
                    value={editForm.username}
                    onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                    data-testid="input-username"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Bio Section */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">About</h3>
          
          {!isEditing ? (
            <p className="text-muted-foreground leading-relaxed" data-testid="text-profile-bio">
              {userProfile.bio}
            </p>
          ) : (
            <textarea
              className="w-full p-3 border border-border rounded-md bg-background text-foreground resize-none"
              rows={4}
              placeholder="Tell others about your wellness journey..."
              value={editForm.bio}
              onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
              data-testid="textarea-profile-bio"
            />
          )}
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span data-testid="text-profile-email">{userProfile.email}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {!isEditing ? (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid="text-profile-location">{userProfile.location}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <MapPin className="h-4 w-4" />
                <Input
                  placeholder="Location"
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  data-testid="input-location"
                  className="border-0 p-0 h-auto focus-visible:ring-0"
                />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Wellness Stats</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="text-profile-total-quests">
                {userProfile.totalQuests}
              </div>
              <p className="text-sm text-muted-foreground">Quests Completed</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" data-testid="text-profile-total-journeys">
                {userProfile.totalJourneys}
              </div>
              <p className="text-sm text-muted-foreground">Journeys Finished</p>
            </div>
          </div>
        </Card>

        {/* Favorite Categories */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Favorite Categories</h3>
          
          <div className="flex flex-wrap gap-2">
            {userProfile.favoriteCategories.map((category) => (
              <Badge key={category} variant="outline" data-testid={`badge-category-${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Settings Actions */}
        <Card className="p-6 space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Settings</h3>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => console.log("Notification settings")}
            data-testid="button-notification-settings"
          >
            Notification Preferences
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => console.log("Privacy settings")}
            data-testid="button-privacy-settings"
          >
            Privacy Settings
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => console.log("Account settings")}
            data-testid="button-account-settings"
          >
            Account Settings
          </Button>
        </Card>
      </div>

      <Navigation onNavigate={setLocation} />
    </div>
  );
}