import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "../screens/home"
import  PropertyScreen  from "../screens/PropertyScreen"
import  {AddPropertyScreen}  from "../screens/AddPropertyScreen"
import { View } from "react-native"
import  MarketplaceScreen  from "../screens/MarketplaceScreen"
import { ScheduledAppointmentScreen } from "../screens/ScheduledAppointmentScreen"
import { ChatScreen } from "../screens/ChatScreen"
import { WalletScreen } from "../screens/WalletScreen"
import { ProfileScreen } from "../screens/ProfileScreen"
import ListingDetailsScreen from "../screens/ListingDetailsScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export type PropertyStackParamList = {
  Property: undefined;
  AddProperty: undefined;
};


export type MarketplaceStackParamList = {
  Marketplace: undefined;
  ListingDetails: undefined;
};

const MarketplaceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Marketplace"
        component={MarketplaceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListingDetails"
        component={ListingDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export type ListingStackParamList = {
    Listing: undefined;
    AddListing: undefined;
}

const ChatStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export const TabNavigation = () => {
  return (
    <View style={{ backgroundColor: '#38bdf8', flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 20,
            height: 60,
            backgroundColor: '#1e40af',
            paddingBottom: 13,
          },
          //iconcolor
          tabBarActiveTintColor: '#a7f3d0',
          tabBarInactiveTintColor: '#fff',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="MarketPlace" component={MarketplaceStack} />
        <Tab.Screen name="Chat" component={ChatStack} />
        <Tab.Screen name='Wallet' component={WalletScreen} />
        <Tab.Screen name='Profile' component={ProfileStack} />
      </Tab.Navigator>
    </View>
  );
};
