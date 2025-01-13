import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";

import sidney from "../assets/sidney.jpg";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

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
      <View style={{ ...styles.header, paddingLeft: 10 }}>
        {/* <Text style={styles.logo}>BWstory</Text> */}
        {/* <TouchableOpacity style={styles.profileIcon}>
          <Image
            source={{ uri: "https://via.placeholder.com/30" }}
            style={styles.profileImage}
          />
        </TouchableOpacity> */}
        <ScrollView
          // style={{
          //   backgroundColor: "pink",
          // }}
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
      {/* <View style={styles.postCard}>
        <Text style={styles.postAuthor}>Sidney Sweeney</Text>
        <Image source={sidney} style={styles.postImage} alt="sidney" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // backgroundColor: "yellow",
            padding: 0.1, // Optional padding for spacing
            width: "100%", // Ensure the View takes up full width of the screen
          }}
        >
          <Text style={styles.postText2}>Jan 5, 2025</Text>
          <Text style={styles.postText2}>Internet | 43 Views</Text>
        </View>
        <Text style={styles.postText}>morning ☀️☀️</Text>
        <Text style={styles.locationText}>Paris, France</Text>
      </View> */}
      <View style={styles.postCard}>
        {/* Profile Section */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Image source={sidney} style={styles.profileImage} />
          <Text style={styles.postAuthor}>Sidney Sweeney</Text>
        </View>

        {/* Post Image */}
        <Image source={sidney} style={styles.postImage} alt="sidney" />

        {/* Date and Views Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <Text style={styles.postText2}>Jan 5, 2025</Text>
          <Text style={styles.postText2}>Internet | 43 Views</Text>
        </View>

        {/* Post Text */}
        <Text style={styles.postText}>morning ☀️☀️</Text>

        {/* Location */}

        {/* Icons Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "left",
            paddingHorizontal: 10,
            marginTop: 10,
            // marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingLeft: 0,
              paddingVertical: 5,
            }}
          >
            <FontAwesome name="heart-o" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Ionicons name="share-social-outline" size={22} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Ionicons name="chatbubble-outline" size={22} />
          </TouchableOpacity>
        </View>
        <Text style={styles.locationText}>
          <FontAwesome name="location-arrow" size={14} /> Paris, France
        </Text>
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
  // postCard: {
  //   margin: 15,
  //   backgroundColor: "#fff",
  //   borderRadius: 10,
  //   // padding: 10,
  //   elevation: 3,
  //   height: 420,
  // },
  // postAuthor: {
  //   fontWeight: "bold",
  //   padding: 10,
  //   marginBottom: 5,
  // },
  // postImage: {
  //   width: "100%",
  //   height: 300,
  //   // borderRadius: 10,
  //   marginBottom: 10,
  // },
  // postText: {
  //   fontSize: 16,
  //   paddingHorizontal: 10,
  // },
  // postText2: {
  //   fontSize: 12,
  //   paddingHorizontal: 10,
  //   color: "gray",
  // },
  // locationText: {
  //   fontSize: 12,
  //   color: "#7f8c8d",
  //   marginTop: 5,
  //   paddingHorizontal: 10,
  // },
  postCard: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    height: 500,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10, // Spacing between image and text
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postImage: {
    width: "100%",
    height: 300,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  postText2: {
    fontSize: 12,
    color: "gray",
  },
  locationText: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 18,
    color: "#000", // Adjust color if needed
    paddingHorizontal: 5,
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
    borderColor: "#144353",
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
    backgroundColor: "#144353",
  },
  tabText: {
    fontSize: 14,
    color: "#144353",
  },
  activeTabText: {
    color: "#fff",
  },
});

export default HomeScreen;
