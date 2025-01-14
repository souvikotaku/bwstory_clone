import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  Share,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [selectedArticleComments, setSelectedArticleComments] = useState([]);

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
    setLoading(true);
    try {
      const endpoint =
        category === "All"
          ? "https://bwstoryconebackend.onrender.com/api/articles/fetch"
          : `https://bwstoryconebackend.onrender.com/api/articles/fetch?category=${category}`;

      const { data } = await axios.get(endpoint);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (article) => {
    // console.log("article", article);
    try {
      const result = await Share.share({
        message: `Check out this article by ${article.author} (${
          article.location
        }):\n\n"${article.content}"\n\nImage: ${
          article.postImage
        }\n\nRead more here: ${article.link || "No link available"}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type:", result.activityType);
        } else {
          console.log("Shared successfully");

          // Show a toast after successful share
          Toast.show({
            type: "success",
            position: "top",
            text1: "Article Shared!",
            text2: "The article has been shared successfully.",
            visibilityTime: 3000, // Toast visible for 3 seconds
          });
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing the article:", error.message);

      // Show error toast in case of failure
      Toast.show({
        type: "error",
        position: "top",
        text1: "Share Failed",
        text2: "An error occurred while sharing the article.",
        visibilityTime: 3000, // Toast visible for 3 seconds
      });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Avoid submitting an empty comment

    try {
      const user = "Souvik Das"; // Replace with actual user data

      // Send the new comment to the backend
      const response = await axios.post(
        `https://bwstoryconebackend.onrender.com/api/articles/${selectedArticleId}/comments`,
        {
          text: newComment,
          user,
        }
      );

      // Update the UI by resetting the comment input and closing the modal
      setNewComment("");
      setCommentModalVisible(false);
      fetchArticles(selectedTab);
      Toast.show({
        type: "success",
        position: "top",
        text1: "Comment Added",
        text2: "Your comment has been added successfully.",
        visibilityTime: 4000,
        autoHide: true,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "There was an error adding your comment.",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  };

  // const handleLike = async (articleId) => {
  //   try {
  //     await axios.patch(
  //       `https://bwstoryconebackend.onrender.com/api/articles/${articleId}/likes`
  //     );
  //     fetchArticles(selectedTab); // Refresh articles
  //   } catch (error) {
  //     console.error("Error liking the article:", error);
  //   }
  // };

  useEffect(() => {
    fetchArticles(selectedTab);
  }, [selectedTab]);

  return (
    <View style={styles.container}>
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

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#144353"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView>
          {articles.map((article, index) => (
            <View key={index} style={styles.postCard}>
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
              <Image
                source={{ uri: article.postImage }}
                style={styles.postImage}
              />
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
              <Text style={styles.postText}>{article.content}</Text>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity
                  style={{ paddingHorizontal: 10, position: "relative" }}
                  // onPress={() => handleLike(article._id)}
                >
                  <FontAwesome name="heart-o" size={22} color={"#144353"} />
                  <Text
                    style={{
                      position: "absolute",
                      top: -10, // Adjust the top value to move the text above the icon
                      left: "50%", // Center horizontally
                      transform: [{ translateX: -20 }], // Adjust horizontal centering of the text
                      fontSize: 10, // Text size
                      fontWeight: "bold", // Bold text
                      color: "red", // Text color
                      textAlign: "center", // Center the text horizontally
                      width: 50, // Fix the width to ensure no wrapping
                      overflow: "hidden", // Hide any overflow if the text is too long
                    }}
                  >
                    {article.likes || 0}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ paddingHorizontal: 10, position: "relative" }}
                  onPress={() => {
                    setSelectedArticleId(article._id);
                    setCommentModalVisible(true);
                  }}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={22}
                    color={"#144353"}
                  />
                  <Text
                    style={{
                      position: "absolute",
                      top: -10, // Adjust the top value to move the text above the icon
                      left: "50%", // Center horizontally
                      transform: [{ translateX: -20 }], // Adjust horizontal centering of the text
                      fontSize: 10, // Text size
                      fontWeight: "bold", // Bold text
                      color: "blue", // Text color
                      textAlign: "center", // Center the text horizontally
                      width: 50, // Fix the width to ensure no wrapping
                      overflow: "hidden", // Hide any overflow if the text is too long
                    }}
                  >
                    {article.comments?.length || 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingHorizontal: 10 }}
                  onPress={() => handleShare(article)}
                >
                  <Ionicons name="share-social-outline" size={22} />
                </TouchableOpacity>
              </View>
              <Text style={styles.locationText}>
                <FontAwesome
                  name="location-arrow"
                  size={14}
                  color={"#144353"}
                />{" "}
                {article.location}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={commentModalVisible}
        transparent
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Existing Comments Section */}
            <TouchableOpacity
              onPress={() => setCommentModalVisible(false)}
              style={{
                position: "absolute",
                left: "101%",
                top: 10,
                zIndex: 100,
                borderRadius: "60%", // Make it a circle by setting border radius to half the width/height
                backgroundColor: "white", // Background color of the circle
                width: 23,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="close" size={22} color={"#144353"} />
            </TouchableOpacity>
            <View style={styles.commentsContainer}>
              <FlatList
                data={
                  articles.find((article) => article._id === selectedArticleId)
                    ?.comments || []
                }
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <Text style={styles.commentUser}>{item.user}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={
                  <Text style={styles.emptyComments}>
                    No comments yet. Be the first to comment!
                  </Text>
                }
              />
            </View>

            {/* Add New Comment Section */}
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleAddComment}
            >
              <Text style={styles.commentButtonText}>Submit</Text>
            </TouchableOpacity>

            {/* Cancel Button to Close Modal */}
            {/* <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setCommentModalVisible(false)}
            >
              <Text style={styles.commentButtonText}>Cancel</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#e6e6e6", padding: 10 },
  scrollContainer: { flexDirection: "row", alignItems: "center" },
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
  activeTab: { backgroundColor: "#144353" },
  tabText: { fontSize: 14, color: "#144353" },
  activeTabText: { color: "#fff" },
  postCard: {
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  profileImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postAuthor: { fontWeight: "bold", fontSize: 16 },
  postImage: { width: "100%", height: 300, marginBottom: 10 },
  postText: { fontSize: 16, paddingHorizontal: 10 },
  postText2: { fontSize: 12, color: "gray" },
  locationText: {
    fontSize: 12,
    color: "#7f8c8d",
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  commentsContainer: { maxHeight: 200, marginBottom: 20 },
  commentItem: { marginBottom: 10 },
  commentUser: { fontWeight: "bold", color: "#333" },
  commentText: { color: "#666" },
  emptyComments: { textAlign: "center", color: "#aaa" },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  commentButton: {
    backgroundColor: "#144353",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF6F61",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  commentButtonText: { color: "white", fontSize: 16 },
});

export default HomeScreen;
