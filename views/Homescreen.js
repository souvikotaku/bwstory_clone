import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("All"); // State to track selected tab

  const categories = [
    "All",
    "Entertainment",
    "Lifestyle",
    "Sports",
    "Technology",
    "Government",
    "Business",
  ]; // Add more categories if needed

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.logo}>BWstory</Text> */}
        <TouchableOpacity style={styles.profileIcon}>
          <Image
            source={{ uri: "https://via.placeholder.com/30" }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                selectedTab === category && styles.activeTab,
                {
                  paddingHorizontal: index === 0 ? 40 : 15,
                },
              ]}
              onPress={() => setSelectedTab(category)} // Set selected tab on press
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === category && styles.activeTabText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.postCard}>
        <Text style={styles.postAuthor}>Anonymous</Text>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }}
          style={styles.postImage}
        />
        <Text style={styles.postText}>morning ☀️☀️</Text>
        <Text style={styles.locationText}>Basisthpur, Guwahati, Assam</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 0,
    backgroundColor: "#e6e6e6",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Darker bottom box shadow
  },
  logo: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  profileIcon: {
    alignSelf: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  postCard: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  postAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  postImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 5,
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#2c3e50",
    marginRight: 10,
    backgroundColor: "white",
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow direction (horizontal, vertical)
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 6, // How far the shadow spreads
    // Android shadow property
    elevation: 5, // Android shadow effect
  },
  activeTab: {
    backgroundColor: "#2c3e50",
  },
  tabText: {
    fontSize: 14,
    color: "#2c3e50",
  },
  activeTabText: {
    color: "#fff",
  },
});

export default HomeScreen;
