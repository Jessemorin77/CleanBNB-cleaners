import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "../screens/home"
import  PropertyScreen  from "../screens/PropertyScreen"
import  {AddPropertyScreen}  from "../screens/AddPropertyScreen"
import { View } from "react-native"
import  MarketplaceScreen  from "../screens/MarketplaceScreen"
import { ScheduledAppointmentScreen } from "../screens/ScheduledAppointmentScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export type PropertyStackParamList = {
  Property: undefined;
  AddProperty: undefined;
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

export type ListingStackParamList = {
    Listing: undefined;
    AddListing: undefined;
}

const ListingStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Listing"
                component={MarketplaceScreen}
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
        <Tab.Screen name="Properties" component={PropertyStack} />
        <Tab.Screen name="Listings" component={ListingStack} />
        <Tab.Screen name='Appointments' component={ScheduledAppointmentScreen} />
      </Tab.Navigator>
    </View>
  );
};
