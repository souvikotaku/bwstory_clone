import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
  DrawerActions,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import Homescreen from "./views/Homescreen"; // Adjust the path based on your project structure
import Profilescreen from "./views/Profilescreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { setSelectedItem } from "./redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import profile from "./assets/profilepic.png";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.data.selectedItem);

  const handleNavigation = (screen) => {
    // console.log("selectedItem", selectedItem);
    dispatch(setSelectedItem(screen)); // Set the selected item

    props.navigation.closeDrawer(); // Close the drawer
    if (screen === "Home") {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else if (screen === "Profile") {
      props.navigation.navigate("Home", { screen: "Profile" });
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingHorizontal: 0 }}
    >
      {/* <View style={styles.drawerHeader}>
        <Image source={profile} style={styles.drawerImage} />
        <Text style={styles.drawerName}>Souvik Das</Text>
        <Text style={styles.drawerLocation}>Kolkata, West Bengal</Text>
      </View> */}
      <ImageBackground
        source={require("./assets/japan.jpg")} // Path to your background image
        style={styles.drawerHeader}
      >
        <View style={styles.headerContent}>
          <Image source={profile} style={styles.drawerImage} />
          <Text style={styles.drawerName}>Souvik Das</Text>
          <Text style={styles.drawerLocation}>
            <FontAwesome6 name="location-arrow" color={"#bdc3c7"} size={15} />{" "}
            Kolkata, West Bengal
          </Text>
        </View>
      </ImageBackground>

      <DrawerItem
        label={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="home"
              size={20}
              color={selectedItem === "Home" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Home"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Home
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Home")}
        style={[
          styles.drawerItem,
          selectedItem === "Home" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />

      <DrawerItem
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <EvilIcons
              name="bell"
              size={25}
              color={selectedItem === "Notifications" ? "white" : "black"}
              style={{ marginRight: 21, marginLeft: 3 }}
            />
            <Text
              style={[
                selectedItem === "Notifications"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Notifications
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Notifications")}
        style={[
          styles.drawerItem,
          selectedItem === "Notifications" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />

      <DrawerItem
        // label="Profile"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="user"
              size={20}
              color={selectedItem === "Profile" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Profile"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Profile
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Profile")}
        style={[
          styles.drawerItem,
          selectedItem === "Profile" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />

      <DrawerItem
        // label="Invite Friends"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="adduser"
              size={20}
              color={selectedItem === "Invite Friends" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Invite Friends"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Invite Friends
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Invite Friends")}
        style={[
          styles.drawerItem,
          selectedItem === "Invite Friends" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />
      <DrawerItem
        // label="About us"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="infocirlceo"
              size={20}
              color={selectedItem === "About us" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "About us"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              About us
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("About us")}
        style={[
          styles.drawerItem,
          selectedItem === "About us" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />
      <DrawerItem
        // label="Support"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome5
              name="headphones-alt"
              size={20}
              color={selectedItem === "Support" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Support"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Support
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Support")}
        style={[
          styles.drawerItem,
          selectedItem === "Support" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />
      <DrawerItem
        // label="FAQ"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="questioncircleo"
              size={20}
              color={selectedItem === "FAQ" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "FAQ"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              FAQ
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("FAQ")}
        style={[
          styles.drawerItem,
          selectedItem === "FAQ" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />
      <DrawerItem
        // label="Settings"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="setting"
              size={20}
              color={selectedItem === "Settings" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Settings"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Settings
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Settings")}
        style={[
          styles.drawerItem,
          selectedItem === "Settings" && styles.selectedDrawerItem, // Highlight if selected
        ]}
        // labelStyle={[
        //   styles.drawerLabel,
        //   selectedItem === "Settings" && styles.selectedLabel, // White font if selected
        // ]}
      />
      <DrawerItem
        // label="Logout"
        label={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign
              name="poweroff"
              size={20}
              color={selectedItem === "Logout" ? "white" : "black"}
              style={{ marginRight: 25, marginLeft: 5 }}
            />
            <Text
              style={[
                selectedItem === "Logout"
                  ? styles.selectedLabel
                  : styles.drawerLabel, // White font if selected
              ]}
            >
              Logout
            </Text>
          </View>
        )}
        onPress={() => handleNavigation("Logout")}
        style={[
          styles.drawerItem,
          selectedItem === "Logout" && styles.selectedDrawerItem, // Highlight if selected
        ]}
      />
    </DrawerContentScrollView>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable header for all screens
      }}
    >
      <Stack.Screen name="Home" component={Homescreen} />
      <Stack.Screen name="Carwashprofile" component={Profilescreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const selectedItem = useSelector((state) => state.data.selectedItem);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable header for all screens
      }}
    >
      {selectedItem === "Home" ? (
        <Stack.Screen name="Home" component={Homescreen} />
      ) : (
        <Stack.Screen name="Carwashprofile" component={Profilescreen} />
      )}
    </Stack.Navigator>
  );
};

const TabNav = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.data.selectedItem);

  // useEffect(() => {
  //   // Ensure that selectedItem state is synced with navigation actions
  //   if (selectedItem) {
  //     console.log("selected", selectedItem);
  //   }
  // }, [selectedItem]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Disable header in tab navigator
        tabBarActiveTintColor: "#144353", // Active tab color
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // Stack as a Tab.Screen
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="compass-outline"
                color={focused ? "#144353" : color}
                size={size}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            dispatch(setSelectedItem("Home")); // Set the selected item
            console.log("Home tab pressed");
          },
        }}
      />
      <Tab.Screen
        name="Local"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome6
                name="location-arrow"
                color={focused ? "#144353" : color}
                size={size}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            if (selectedItem === "Home") {
              dispatch(setSelectedItem("Home"));
            } else {
              dispatch(setSelectedItem("Profile"));
            }
            // dispatch(setSelectedItem("Local")); // Set the selected item
            console.log("Local tab pressed");
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="add-circle-outline"
                color={focused ? "#144353" : color}
                size={size}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            if (selectedItem === "Home") {
              dispatch(setSelectedItem("Home"));
            } else {
              dispatch(setSelectedItem("Profile"));
            }
            // dispatch(setSelectedItem("Add")); // Set the selected item
            console.log("Add tab pressed");
          },
        }}
      />
      <Tab.Screen
        name="Alert"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <EvilIcons
                name="bell"
                color={focused ? "#144353" : color}
                size={35}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            if (selectedItem === "Home") {
              dispatch(setSelectedItem("Home"));
            } else {
              dispatch(setSelectedItem("Profile"));
            }
            // dispatch(setSelectedItem("Alert")); // Set the selected item
            console.log("Alert tab pressed");
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesome
                name="user-circle-o"
                color={focused ? "#144353" : color}
                size={size}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            dispatch(setSelectedItem("Profile")); // Set the selected item
            console.log("Profile tab pressed");
          },
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigation = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="Home"
      component={TabNav}
      options={{
        headerTitle: () => (
          <Image
            source={require("./assets/bwlogo.png")} // Replace with your PNG path
            style={{ width: 170, height: 60 }} // Adjust dimensions as needed
            resizeMode="contain" // Ensure the image fits properly
          />
        ),
        headerTitleAlign: "center", // Center-aligns the header title/logo
        headerStyle: {
          backgroundColor: "#144353", // Background color of the header
        },
        headerTintColor: "#fff",
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#2c3e50",
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
  drawerHeader: {
    padding: 20,
    // alignItems: "left",
    // backgroundColor: "#144353",
    // justifyContent: "center", // Center the content if needed
    alignItems: "left", // Center the content horizontally
  },
  headerContent: {
    alignItems: "left", // Center the content inside
    // justifyContent: "center",
    // padding: 20,
  },
  drawerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  drawerName: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  drawerLocation: {
    color: "#bdc3c7",
    fontSize: 14,
  },
  // selectedDrawerItem: {
  //   backgroundColor: "#607d8b", // Background color when selected
  //   color: "#fff", // Text color when selected
  //   borderTopLeftRadius: 20, // Top-left corner radius
  //   borderTopRightRadius: 0, // Top-right corner radius
  //   borderBottomLeftRadius: 20, // Bottom-left corner radius
  //   borderBottomRightRadius: 0, // Bottom-right corner radius
  // },
  selectedLabel: {
    color: "#FFFFFF", // White font color for the selected item
    fontWeight: "bold",
    fontSize: 16,
  },
  // drawerItem: {
  //   borderBottomWidth: 1, // Adds a bottom border
  //   borderBottomColor: "#ccc", // Light gray border color
  //   paddingVertical: 5, // Optional padding for spacing
  //   paddingTop: 0,
  //   // backgroundColor: "yellow",
  // },

  drawerItem: {
    borderBottomWidth: 1, // Adds a bottom border
    borderBottomColor: "#ccc", // Light gray border color
    marginHorizontal: 0, // Ensures no horizontal gap
    paddingHorizontal: 0, // Removes padding on the sides
    paddingVertical: 5, // Optional padding for spacing
    paddingTop: 0,
  },
  selectedDrawerItem: {
    backgroundColor: "#6c7a89", // Adjust as per your selected item's design
    borderRadius: 0, // Remove any rounding if it's causing the gap
    borderTopLeftRadius: 20, // Top-left corner radius
    borderTopRightRadius: 0, // Top-right corner radius
    borderBottomLeftRadius: 20, // Bottom-left corner radius
    borderBottomRightRadius: 0, // Bottom-right corner radius
  },
  drawerLabel: {
    color: "#000", // Default text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
