import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Categorynavigator from './Categorynavigator';
import Usernavigator from './Usernavigator';
import Ordernavigator from './Ordernavigator';

const Tab = createBottomTabNavigator();

const Rootnavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="categories"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#ff3b30',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    height: 60,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'categories') {
                        iconName = 'view-grid-outline';
                    } else if (route.name === 'orders') {
                        iconName = 'cart-outline';
                    } else if (route.name === 'users') {
                        iconName = 'account-outline';
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={24}
                            color={color}
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="categories"
                component={Categorynavigator}
                options={{ title: 'Categories' }}
            />
            <Tab.Screen
                name="orders"
                component={Ordernavigator}
                options={{ title: 'Orders' }}
            />
            <Tab.Screen
                name="users"
                component={Usernavigator}
                options={{ title: 'Users' }}
            />
        </Tab.Navigator>
    );
};

export default Rootnavigator;
