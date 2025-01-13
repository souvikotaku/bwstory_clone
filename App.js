import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
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
import Feather from "react-native-vector-icons/Feather";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { setSelectedItem } from "./redux/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.data.selectedItem);

  const handleNavigation = (screen) => {
    dispatch(setSelectedItem(screen)); // Set the selected item

    props.navigation.closeDrawer(); // Close the drawer
    if (screen === "Home") {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else if (screen === "Notifications") {
      alert("Notifications");
    } else if (screen === "Profile") {
      props.navigation.navigate("Home", { screen: "Profile" });
    } else if (screen === "Logout") {
      alert("Logout");
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.drawerImage}
        />
        <Text style={styles.drawerName}>Souvik Das</Text>
        <Text style={styles.drawerLocation}>Kolkata, West Bengal</Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => handleNavigation("Home")}
        style={[
          selectedItem === "Home" && styles.selectedDrawerItem, // Highlight if selected
        ]}
        labelStyle={[
          selectedItem === "Home" && styles.selectedLabel, // White font if selected
        ]}
      />

      <DrawerItem
        label="Notifications"
        onPress={() => handleNavigation("Notifications")}
        style={[
          selectedItem === "Notifications" && styles.selectedDrawerItem, // Highlight if selected
        ]}
        labelStyle={[
          selectedItem === "Notifications" && styles.selectedLabel, // White font if selected
        ]}
      />

      <DrawerItem
        label="Profile"
        onPress={() => handleNavigation("Profile")}
        style={[
          selectedItem === "Profile" && styles.selectedDrawerItem, // Highlight if selected
        ]}
        labelStyle={[
          selectedItem === "Profile" && styles.selectedLabel, // White font if selected
        ]}
      />

      <DrawerItem
        label="Logout"
        onPress={() => handleNavigation("Logout")}
        style={[
          selectedItem === "Logout" && styles.selectedDrawerItem, // Highlight if selected
        ]}
        labelStyle={[
          selectedItem === "Logout" && styles.selectedLabel, // White font if selected
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
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Disable header for all screens
      }}
    >
      <Stack.Screen name="Carwashprofile" component={Profilescreen} />
    </Stack.Navigator>
  );
};

// const TabNav = () => {
//   const dispatch = useDispatch();
//   const selectedItem = useSelector((state) => state.data.selectedItem);
//   useEffect(() => {
//     // Ensure that selectedItem state is synced with navigation actions
//     if (selectedItem) {
//       console.log("selected", selectedItem);
//       // You can also trigger other side effects or updates based on selectedItem here
//     }
//   }, [selectedItem]);
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false, // Disable header in tab navigator
//         tabBarActiveTintColor: "#144353", // Active tab color
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeStack} // Stack as a Tab.Screen
//         options={{
//           tabBarLabel: "Discover",
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <Ionicons
//                 name="compass-outline"
//                 color={focused ? "#144353" : color}
//                 size={size}
//               />
//             </View>
//           ),
//           tabPress: () => {
//             dispatch(setSelectedItem("Home"));
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Local"
//         // component={Categoryscreen}
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <FontAwesome6
//                 name="location-arrow"
//                 color={focused ? "#144353" : color}
//                 size={size}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Add"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <Ionicons
//                 name="add-circle-outline"
//                 color={focused ? "#144353" : color}
//                 size={size}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Alert"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <EvilIcons
//                 name="bell"
//                 color={focused ? "#144353" : color}
//                 size={35}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileStack}
//         options={{
//           tabBarIcon: ({ color, size, focused }) => (
//             <View style={{ alignItems: "center" }}>
//               <FontAwesome
//                 name="user-circle-o"
//                 color={focused ? "#144353" : color}
//                 size={size}
//               />
//             </View>
//           ),
//           tabPress: () => {
//             dispatch(setSelectedItem("Carwashprofile"));
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

const TabNav = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.data.selectedItem);

  useEffect(() => {
    // Ensure that selectedItem state is synced with navigation actions
    if (selectedItem) {
      console.log("selected", selectedItem);
    }
  }, [selectedItem]);

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
            dispatch(setSelectedItem("Local")); // Set the selected item
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
            dispatch(setSelectedItem("Add")); // Set the selected item
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
            dispatch(setSelectedItem("Alert")); // Set the selected item
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
    alignItems: "center",
    backgroundColor: "#144353",
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
  selectedDrawerItem: {
    backgroundColor: "#144353", // Background color when selected
    color: "#fff", // Text color when selected
  },
  selectedLabel: {
    color: "#FFFFFF", // White font color for the selected item
    fontWeight: "bold",
  },
});
