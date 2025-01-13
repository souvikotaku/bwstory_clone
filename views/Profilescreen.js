import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import profile from "../assets/profilepic.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View
          style={{
            // backgroundColor: "pink",
            flexDirection: "row",
          }}
        >
          <Image source={profile} style={styles.profileImage} />
          <View
            style={{
              paddingHorizontal: 5,
            }}
          >
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.location}>
              {" "}
              <FontAwesome name="location-arrow" size={14} />{" "}
              {userData.location}
            </Text>
            <Text style={styles.anonymity}>
              {" "}
              <Ionicons name="bag" size={14} /> {userData.anonymity}
            </Text>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: "yellow",
            paddingVertical: 10,
            height: "100%",
          }}
        >
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                width: 80,
              },
            ]}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: "yellow",
          justifyContent: "space-between",
          marginTop: "-5%",
        }}
      >
        <View
          style={{
            ...styles.statsContainer,
            // backgroundColor: "blue",
            alignItems: "center",
            padding: 5,
            paddingLeft: 0,
          }}
        >
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Trash</Text>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.statsContainer }}>
          {Object.entries(userData.stats).map(([key, value], index) => (
            <View
              key={key}
              style={{
                ...styles.stat,
                paddingHorizontal: 3,
                borderLeftWidth: 1, // Set the border width
                borderLeftColor: index !== 0 ? "#ccc" : "transparent", // Set the border color
              }}
            >
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* About Section */}

      <View>
        {/* About Container */}
        <View style={[styles.aboutContainer]}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                // backgroundColor: "yellow",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    margin: "auto",
                  },
                ]}
              >
                About me
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row", // Stack buttons vertically
                alignItems: "flex-end", // Align buttons to the right
                flexShrink: 1, // Prevent buttons from overflowing
                // backgroundColor: "yellow",
                alignItems: "start",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    marginLeft: 0,
                  },
                ]}
              >
                <Text style={styles.editButtonText}>Drafts</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.editButton,
                  {
                    marginRight: 0,
                  },
                ]}
              >
                <Text style={styles.editButtonText}>History</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.aboutText}>{userData.about}</Text>
        </View>

        {/* Buttons Container */}
        {/* <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row", // Stack buttons vertically
            alignItems: "flex-end", // Align buttons to the right
            flexShrink: 1, // Prevent buttons from overflowing
            backgroundColor: "yellow",
            alignItems: "start",
          }}
        >
          <TouchableOpacity
            style={[
              styles.editButton,
              {
                marginLeft: 0,
              },
            ]}
          >
            <Text style={styles.editButtonText}>Drafts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.editButton,
              {
                marginRight: 0,
              },
            ]}
          >
            <Text style={styles.editButtonText}>History</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Posts Section */}
      <View style={styles.postsContainer}>
        {/* <Text style={styles.sectionTitle}>My Posts</Text> */}
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
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: "gray",
  },
  anonymity: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#144353",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    margin: 5,
    marginTop: 0,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow direction (horizontal, vertical)
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 6, // How far the shadow spreads
    // Android shadow property
    elevation: 5, // Android shadow effect
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
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
    fontSize: 13,
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
