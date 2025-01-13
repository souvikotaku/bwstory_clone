import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

const ProfileScreen = () => {
  const userData = {
    name: "Souvik Das",
    location: "Kolkata, West Bengal",
    anonymity: "Anonymous",
    stats: {
      feed: 0,
      followers: 0,
      following: 0,
      blockedProfiles: 0,
    },
    about: "Anonymous",
    posts: [], // Array for posts, currently empty
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postSnippet}>{item.snippet}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.location}>{userData.location}</Text>
        <Text style={styles.anonymity}>{userData.anonymity}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {Object.entries(userData.stats).map(([key, value]) => (
          <View key={key} style={styles.stat}>
            <Text style={styles.statValue}>{value}</Text>
            <Text style={styles.statLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </View>
        ))}
      </View>

      {/* About Section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.sectionTitle}>About me</Text>
        <Text style={styles.aboutText}>{userData.about}</Text>
      </View>

      {/* Posts Section */}
      <View style={styles.postsContainer}>
        <Text style={styles.sectionTitle}>My Posts</Text>
        {userData.posts.length === 0 ? (
          <Text style={styles.noPostsText}>No Posts</Text>
        ) : (
          <FlatList
            data={userData.posts}
            renderItem={renderPost}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: "gray",
  },
  anonymity: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#0066CC",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "gray",
  },
  aboutContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "gray",
  },
  postsContainer: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postSnippet: {
    fontSize: 14,
    color: "gray",
  },
  noPostsText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    fontSize: 16,
  },
});

export default ProfileScreen;
