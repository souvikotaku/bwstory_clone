import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("All"); // State to track selected tab
  const [articles, setArticles] = useState([]); // State to hold fetched articles
  const [loading, setLoading] = useState(true); // State for loading indicator

  const categories = [
    "All",
    "Entertainment",
    "Lifestyle",
    "Sports",
    "Technology",
    "Government",
    "Business",
  ];

  const fetchArticles = async (category) => {
    setLoading(true); // Show loading spinner
    try {
      const endpoint =
        category === "All"
          ? "https://bwstoryconebackend.onrender.com/api/articles/fetch"
          : `https://bwstoryconebackend.onrender.com/api/articles/fetch?category=${category}`;

      const { data } = await axios.get(endpoint); // Axios GET request
      setArticles(data); // Set articles state with the response data
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };
  // Fetch articles on category change
  useEffect(() => {
    fetchArticles(selectedTab);
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      {/* Header with Tabs */}
      <View style={styles.header}>
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
              ]}
              onPress={() => setSelectedTab(category)}
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

      {/* Content */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#144353"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <View key={index} style={styles.postCard}>
                {/* Profile Section */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <Image
                    source={{ uri: article.authorImage }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.postAuthor}>{article.author}</Text>
                </View>

                {/* Post Image */}
                <Image
                  source={{ uri: article.postImage }}
                  style={styles.postImage}
                />

                {/* Date and Views Section */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginVertical: 5,
                  }}
                >
                  <Text style={styles.postText2}>
                    {new Date(article.date).toDateString()}
                  </Text>
                  <Text style={styles.postText2}>
                    {article.category} | {article.views} Views
                  </Text>
                </View>

                {/* Post Content */}
                <Text style={styles.postText}>{article.content}</Text>
                {/* Icons Section */}
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <FontAwesome name="heart-o" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Ionicons name="share-social-outline" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Ionicons name="chatbubble-outline" size={22} />
                  </TouchableOpacity>
                </View>
                {/* Location */}
                <Text style={styles.locationText}>
                  <FontAwesome name="location-arrow" size={14} />{" "}
                  {article.location}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No articles found for this category.
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#e6e6e6",
    padding: 10,
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
    elevation: 5,
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
  postCard: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
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
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10, // Add marginBottom to the location text
  },
});

export default HomeScreen;
