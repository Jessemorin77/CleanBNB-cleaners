import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../screens/home";
import PropertyScreen from "../screens/PropertyScreen";
import { AddPropertyScreen } from "../screens/AddPropertyScreen";
import { View } from "react-native";
import ListingScreen from "../screens/ListingScreen";
import { AddListingScreen } from "../screens/AddListingScreen";
import { ScheduledAppointmentScreen } from "../screens/ScheduledAppointmentScreen";
import { BidScreen } from "../screens/BidScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type PropertyStackParamList = {
  Property: undefined;
  AddProperty: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type ChatStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

const PropertyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Property"
        component={PropertyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type ListingStackParamList = {
  Listing: undefined;
  AddListing: undefined;
};

const ListingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Listing"
        component={ListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddListing"
        component={AddListingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const TabNavigation = () => {
  return (
    <View style={{ backgroundColor: "#38bdf8", flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 20,
            height: 60,
            backgroundColor: "#1e40af",
            paddingBottom: 13,
          },
          //iconcolor
          tabBarActiveTintColor: "#a7f3d0",
          tabBarInactiveTintColor: "#fff",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Properties" component={PropertyStack} />
        <Tab.Screen name="Listings" component={ListingStack} />
        <Tab.Screen name="Bids" component={BidScreen} />
        <Tab.Screen name="Chats" component={ChatStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
};
