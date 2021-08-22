import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { theme } from '../core/theme'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import{ AuthContext } from '../components/context';

export function DrawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

    // const paperTheme = useTheme();
    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    // const [isDarkTheme, setDarkTheme] = React.useState(false);


    // const toggleTheme = () => {
    //     setDarkTheme(!isDarkTheme);
    // }


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    {/* User Information */}
                    <View style={styles.userInfoSection}>
                        <TouchableOpacity style={{flexDirection:'row',marginTop: 15}}
                            onPress={() => {props.navigation.navigate('Profile')}}
                        >
                            <Avatar.Image 
                                source={require('../assets/aamirDp.jpeg')}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Aamir Ali</Title>
                                <Caption style={styles.caption}>Medical Rep-Colombo</Caption>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>4.5</Paragraph>
                                <Caption style={styles.caption}>Rating</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Indicator</Caption>
                            </View>
                        </View>
                    </View>


                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cash-100" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Manage Expenses"
                            onPress={() => {props.navigation.navigate('ManageExpenses')}}

                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Manage Leaves"
                            onPress={() => {props.navigation.navigate('ManageLeaves')}}

                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="file-document-outline" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Visit Summary Report"
                            onPress={() => {props.navigation.navigate('VisitSummaryReport')}}

                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="doctor" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Doctor Details"
                            onPress={() => {props.navigation.navigate('DoctorDetails')}}

                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="hexagon-multiple" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Product Details"
                            onPress={() => {props.navigation.navigate('ProductDetails')}}

                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="comment-multiple-outline" 
                                color={theme.colors.primary}
                                size={30}
                                />
                            )}
                            label="Discussion Forum"
                            onPress={() => {props.navigation.navigate('DiscussionForum')}}

                        />
                    </Drawer.Section>

                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>

            {/* Drawer SignOut Button */}

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
