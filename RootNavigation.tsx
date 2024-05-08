import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

// StartUp Screen
import U_SplashScreen from "./Screens/Module/User/StartUpScreen/U_SplashScreen";
import U_SignInScreen from "./Screens/Module/User/StartUpScreen/U_SignInScreen";
import U_SignUpScreen from "./Screens/Module/User/StartUpScreen/U_SignUpScreen";
import U_ForgotPasswordScreen from "./Screens/Module/User/StartUpScreen/U_ForgotPasswordScreen";
import U_ChooseProfileScreen from "./Screens/Module/User/StartUpScreen/U_ChooseProfileScreen";

import O_SplashScreen from "./Screens/Module/Organizer/StartUpScreen/O_SplashScreen";
import O_SignInScreen from "./Screens/Module/Organizer/StartUpScreen/O_SignInScreen";
import O_SignUpScreen from "./Screens/Module/Organizer/StartUpScreen/O_SignUpScreen";
import O_ForgotPasswordScreen from "./Screens/Module/Organizer/StartUpScreen/O_ForgotPasswordScreen";
import O_ChooseProfileScreen from "./Screens/Module/Organizer/StartUpScreen/O_ChooseProfileScreen";

// Home Screen
import U_HomeScreen from "./Screens/Module/User/U_HomeScreen";

import O_HomeScreen from "./Screens/Module/Organizer/O_HomeScreen";

// Other Screen
import U_AlarmScreen from "./Screens/Module/User/OtherScreen/U_AlarmScreen";
import U_EventScreen from "./Screens/Module/User/EventScreen/U_EventScreen";
import U_AboutUsScreen from "./Screens/Module/User/OtherScreen/U_AboutUsScreen";
import U_PrivacyPolicyScreen from "./Screens/Module/User/OtherScreen/U_PrivacyPolicyScreen";
import U_TermsConditionScreen from "./Screens/Module/User/OtherScreen/U_TermsConditionScreen";
import U_ChangePasswordScreen from "./Screens/Module/User/OtherScreen/U_ChangePasswordScreen";
import U_ContactUsScreen from "./Screens/Module/User/OtherScreen/U_ContactUsScreen";
import U_SettingScreen from "./Screens/Module/User/OtherScreen/U_SettingScreen";

import O_AlarmScreen from "./Screens/Module/Organizer/OtherScreen/O_AlarmScreen";
import O_AboutUsScreen from "./Screens/Module/Organizer/OtherScreen/O_AboutUsScreen";
import O_PrivacyPolicyScreen from "./Screens/Module/Organizer/OtherScreen/O_PrivacyPolicyScreen";
import O_TermsConditionScreen from "./Screens/Module/Organizer/OtherScreen/O_TermsConditionScreen";
import O_ChangePasswordScreen from "./Screens/Module/Organizer/OtherScreen/O_ChangePasswordScreen";
import O_ContactUsScreen from "./Screens/Module/Organizer/OtherScreen/O_ContactUsScreen";
import O_SettingScreen from "./Screens/Module/Organizer/OtherScreen/O_SettingScreen";

// Prayer Board
import U_PrayerBoardScreen from "./Screens/Module/User/PrayerBoardScreen/U_PrayerBoardScreen";
import U_PrayerDetailsScreen from "./Screens/Module/User/PrayerBoardScreen/U_PrayerDetailsScreen";
import U_PrayerJoinScreen from "./Screens/Module/User/PrayerBoardScreen/U_PrayerJoinScreen";

import O_PrayerBoardScreen from "./Screens/Module/Organizer/PrayerBoardScreen/O_PrayerBoardScreen";
import O_PrayerDetailsScreen from "./Screens/Module/Organizer/PrayerBoardScreen/O_PrayerDetailsScreen";
import O_PrayerJoinScreen from "./Screens/Module/Organizer/PrayerBoardScreen/O_PrayerJoinScreen";
import O_PrayerEditScreen from "./Screens/Module/Organizer/ProfileScreen/O_PrayerEditScreen";

// Podcast
import U_PodcastScreen from "./Screens/Module/User/PodcastScreen/U_PodcastScreen";
import U_PodcastListScreen from "./Screens/Module/User/PodcastScreen/U_PodcastListScreen";
import U_LikePodcastScreen from "./Screens/Module/User/PodcastScreen/U_LikePodcastScreen";

import O_PodcastScreen from "./Screens/Module/Organizer/PodcastScreen/O_PodcastScreen";
import O_PodcastListScreen from "./Screens/Module/Organizer/PodcastScreen/O_PodcastListScreen";
import O_LikePodcastScreen from "./Screens/Module/Organizer/PodcastScreen/O_LikePodcastScreen";
import O_PrayerAddScreen from "./Screens/Module/Organizer/ProfileScreen/O_PrayerAddScreen";
import O_PodcastAddScreen from "./Screens/Module/Organizer/ProfileScreen/O_PodcastAddScreen";

// Donation
import U_DonationScreen from "./Screens/Module/User/DonationScreen/U_DonationScreen";
import U_OrganizationListScreen from "./Screens/Module/User/DonationScreen/U_OrganizationListScreen";
import U_OrganizationDetailsScreen from "./Screens/Module/User/DonationScreen/U_OrganizationDetailsScreen";
import U_DonationPaidScreen from "./Screens/Module/User/DonationScreen/U_DonationPaidScreen";

import O_DonationScreen from "./Screens/Module/Organizer/DonationScreen/O_DonationScreen";
import O_OrganizationListScreen from "./Screens/Module/Organizer/DonationScreen/O_OrganizationListScreen";
import O_OrganizationDetailsScreen from "./Screens/Module/Organizer/DonationScreen/O_OrganizationDetailsScreen";
import O_DonationPaidScreen from "./Screens/Module/Organizer/DonationScreen/O_DonationPaidScreen";
import O_DonationAddScreen from "./Screens/Module/Organizer/ProfileScreen/O_DonationAddScreen";

// Profile
import U_MyProfileScreen from "./Screens/Module/User/ProfileScreen/U_MyProfileScreen";

import O_MyProfileScreen from "./Screens/Module/Organizer/ProfileScreen/O_MyProfileScreen";

// Social Screen
import U_SocialScreen from "./Screens/Module/User/SocialScreen/U_SocialScreen";
import U_SocialCommentScreen from "./Screens/Module/User/SocialScreen/U_SocialCommentScreen";

import O_SocialScreen from "./Screens/Module/Organizer/SocialScreen/O_SocialScreen";
import O_SocialCommentScreen from "./Screens/Module/Organizer/SocialScreen/O_SocialCommentScreen";

// Video Screen
import U_VideoScreen from "./Screens/Module/User/VideoScreen/U_VideoScreen";
import U_VideoDetailsScreen from "./Screens/Module/User/VideoScreen/U_VideoDetailsScreen";
import U_VideoPlayerScreen from "./Screens/Module/User/VideoScreen/U_VideoPlayerScreen";

import O_VideoScreen from "./Screens/Module/Organizer/VideoScreen/O_VideoScreen";
import O_VideoDetailsScreen from "./Screens/Module/Organizer/VideoScreen/O_VideoDetailsScreen";
import O_VideoPlayerScreen from "./Screens/Module/Organizer/VideoScreen/O_VideoPlayerScreen";
import O_VideoAddScreen from "./Screens/Module/Organizer/ProfileScreen/O_VideoAddScreen";

// Store Screen
import U_StoreScreen from "./Screens/Module/User/StoreScreen/U_StoreScreen";
import U_ProductScreen from "./Screens/Module/User/StoreScreen/U_ProductScreen";
import U_ProductCartScreen from "./Screens/Module/User/StoreScreen/U_ProductCartScreen";
import U_CheckoutScreen from "./Screens/Module/User/StoreScreen/U_CheckoutScreen";
import U_OrderDetailScreen from "./Screens/Module/User/StoreScreen/U_OrderDetailScreen";

import O_StoreScreen from "./Screens/Module/Organizer/StoreScreen/O_StoreScreen";
import O_ProductScreen from "./Screens/Module/Organizer/StoreScreen/O_ProductScreen";
import O_ProductCartScreen from "./Screens/Module/Organizer/StoreScreen/O_ProductCartScreen";
import O_CheckoutScreen from "./Screens/Module/Organizer/StoreScreen/O_CheckoutScreen";
import O_OrderDetailScreen from "./Screens/Module/Organizer/StoreScreen/O_OrderDetailScreen";

// Module Choose Screen
import ModuleOptionScreen from "./ModuleOptionScreen";
import O_EditProfile from "./Screens/Module/Organizer/ProfileScreen/O_EditProfile";
import U_EditProfile from "./Screens/Module/User/ProfileScreen/U_EditProfile";
import All_Forgotpassword from "./Screens/Module/User/StartUpScreen/All_Forgotpassword";
import { DeleteAccount } from "./Screens/Module/Organizer/OtherScreen/DeleteAccount";
import O_EventScreen from "./Screens/Module/Organizer/PodcastScreen/EventScreen/O_EventScreen";
import U_VideoPlayerSecondScreen from "./Screens/Module/User/VideoScreen/U_VideoPlayerSecondScreen";
import O_VideoPlayerSecondScreen from "./Screens/Module/Organizer/VideoScreen/O_VideoPlayerSecondScreen";
import U_Paymentscreen from "./Screens/Module/User/StoreScreen/U_Paymentscreen";

export function RootNavigation() {
  // Fonts
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/Fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/Fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/Fonts/Inter-ExtraBold.ttf"),
    "Inter-ExtraLight": require("./assets/Fonts/Inter-ExtraLight.ttf"),
    "Inter-Light": require("./assets/Fonts/Inter-Light.ttf"),
    "Inter-Medium": require("./assets/Fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("./assets/Fonts/Inter-Regular.ttf"),
    "Inter-SemiBold": require("./assets/Fonts/Inter-SemiBold.ttf"),
    "Inter-Thin": require("./assets/Fonts/Inter-Thin.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function Root() {
  return (
    <Stack.Navigator
      initialRouteName="U_SignInScreen"
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      {/* Startup Screen */}
      {/* <Stack.Screen
        name="ModuleOptionScreen"
        component={ModuleOptionScreen}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="U_SplashScreen"
        component={U_SplashScreen}
        options={{ animation: "fade" }}
      /> */}
      <Stack.Screen name="U_SignInScreen" component={U_SignInScreen} />
      <Stack.Screen name="U_SignUpScreen" component={U_SignUpScreen} />
      <Stack.Screen
        name="U_ForgotPasswordScreen"
        component={U_ForgotPasswordScreen}
      />
      <Stack.Screen name="All_Forgotpassword" component={All_Forgotpassword} />
      <Stack.Screen
        name="U_ChooseProfileScreen"
        component={U_ChooseProfileScreen}
      />
      <Stack.Screen
        name="O_SplashScreen"
        component={O_SplashScreen}
        options={{ animation: "fade" }}
      />
      <Stack.Screen name="O_SignInScreen" component={O_SignInScreen} />
      <Stack.Screen name="O_SignUpScreen" component={O_SignUpScreen} />
      <Stack.Screen
        name="O_ForgotPasswordScreen"
        component={O_ForgotPasswordScreen}
      />
      <Stack.Screen
        name="O_ChooseProfileScreen"
        component={O_ChooseProfileScreen}
      />
      {/* Home Screen */}
      <Stack.Screen name="U_HomeScreen" component={U_HomeScreen} />
      <Stack.Screen name="O_HomeScreen" component={O_HomeScreen} />
      {/* Other Screen */}
      <Stack.Screen
        name="U_AlarmScreen"
        component={U_AlarmScreen}
        options={{
          animation: "slide_from_bottom",
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen name="U_EventScreen" component={U_EventScreen} />
      <Stack.Screen name="U_AboutUsScreen" component={U_AboutUsScreen} />
      <Stack.Screen
        name="U_PrivacyPolicyScreen"
        component={U_PrivacyPolicyScreen}
      />
      <Stack.Screen
        name="U_TermsConditionScreen"
        component={U_TermsConditionScreen}
      />
      <Stack.Screen
        name="U_ChangePasswordScreen"
        component={U_ChangePasswordScreen}
      />
      <Stack.Screen name="U_ContactUsScreen" component={U_ContactUsScreen} />
      <Stack.Screen name="U_SettingScreen" component={U_SettingScreen} />
      <Stack.Screen
        name="O_AlarmScreen"
        component={O_AlarmScreen}
        options={{
          animation: "slide_from_bottom",
          presentation: "transparentModal",
        }}
      />
      <Stack.Screen name="O_EventScreen" component={O_EventScreen} />
      <Stack.Screen name="O_AboutUsScreen" component={O_AboutUsScreen} />
      <Stack.Screen
        name="O_PrivacyPolicyScreen"
        component={O_PrivacyPolicyScreen}
      />
      <Stack.Screen name="U_Paymentscreen" component={U_Paymentscreen} />

      <Stack.Screen
        name="O_TermsConditionScreen"
        component={O_TermsConditionScreen}
      />
      <Stack.Screen
        name="O_ChangePasswordScreen"
        component={O_ChangePasswordScreen}
      />
      <Stack.Screen name="O_ContactUsScreen" component={O_ContactUsScreen} />
      <Stack.Screen name="O_SettingScreen" component={O_SettingScreen} />
      {/* Prayer Board */}
      <Stack.Screen
        name="U_PrayerBoardScreen"
        component={U_PrayerBoardScreen}
      />
      <Stack.Screen
        name="U_PrayerDetailsScreen"
        component={U_PrayerDetailsScreen}
      />
      <Stack.Screen name="U_PrayerJoinScreen" component={U_PrayerJoinScreen} />
      <Stack.Screen
        name="O_PrayerBoardScreen"
        component={O_PrayerBoardScreen}
      />
      <Stack.Screen
        name="O_PrayerDetailsScreen"
        component={O_PrayerDetailsScreen}
      />
      <Stack.Screen name="O_PrayerJoinScreen" component={O_PrayerJoinScreen} />
      <Stack.Screen name="O_PrayerEditScreen" component={O_PrayerEditScreen} />
      <Stack.Screen name="O_PrayerAddScreen" component={O_PrayerAddScreen} />
      <Stack.Screen name="O_EditProfile" component={O_EditProfile} />
      <Stack.Screen name="U_EditProfile" component={U_EditProfile} />
      {/* Donation Screen */}
      <Stack.Screen name="U_DonationScreen" component={U_DonationScreen} />
      <Stack.Screen
        name="U_OrganizationListScreen"
        component={U_OrganizationListScreen}
      />
      <Stack.Screen
        name="U_OrganizationDetailsScreen"
        component={U_OrganizationDetailsScreen}
      />
      <Stack.Screen
        name="U_DonationPaidScreen"
        component={U_DonationPaidScreen}
      />
      <Stack.Screen name="O_DonationScreen" component={O_DonationScreen} />
      <Stack.Screen
        name="O_OrganizationListScreen"
        component={O_OrganizationListScreen}
      />
      <Stack.Screen
        name="O_OrganizationDetailsScreen"
        component={O_OrganizationDetailsScreen}
      />
      <Stack.Screen
        name="O_DonationPaidScreen"
        component={O_DonationPaidScreen}
      />
      <Stack.Screen
        name="O_DonationAddScreen"
        component={O_DonationAddScreen}
      />
      {/* Podcast Screen */}
      <Stack.Screen name="U_PodcastScreen" component={U_PodcastScreen} />
      <Stack.Screen
        name="U_PodcastListScreen"
        component={U_PodcastListScreen}
      />
      <Stack.Screen
        name="U_LikePodcastScreen"
        component={U_LikePodcastScreen}
      />
      <Stack.Screen name="O_PodcastScreen" component={O_PodcastScreen} />
      <Stack.Screen
        name="O_PodcastListScreen"
        component={O_PodcastListScreen}
      />
      <Stack.Screen
        name="O_LikePodcastScreen"
        component={O_LikePodcastScreen}
      />
      <Stack.Screen name="O_PodcastAddScreen" component={O_PodcastAddScreen} />
      {/* Social Screen */}
      <Stack.Screen name="U_SocialScreen" component={U_SocialScreen} />
      <Stack.Screen
        name="U_SocialCommentScreen"
        component={U_SocialCommentScreen}
      />
      <Stack.Screen name="O_SocialScreen" component={O_SocialScreen} />
      <Stack.Screen
        name="O_SocialCommentScreen"
        component={O_SocialCommentScreen}
      />
      {/* Porfile Screen */}
      <Stack.Screen name="U_MyProfileScreen" component={U_MyProfileScreen} />
      <Stack.Screen name="O_MyProfileScreen" component={O_MyProfileScreen} />
      {/* Video Screen */}
      <Stack.Screen name="U_VideoScreen" component={U_VideoScreen} />
      <Stack.Screen
        name="U_VideoDetailsScreen"
        component={U_VideoDetailsScreen}
      />
      <Stack.Screen
        name="U_VideoPlayerScreen"
        component={U_VideoPlayerScreen}
      />
      <Stack.Screen name="O_VideoScreen" component={O_VideoScreen} />
      <Stack.Screen
        name="O_VideoDetailsScreen"
        component={O_VideoDetailsScreen}
      />
      <Stack.Screen
        name="O_VideoPlayerScreen"
        component={O_VideoPlayerScreen}
      />
      <Stack.Screen name="O_VideoAddScreen" component={O_VideoAddScreen} />
      {/* Store Screen */}
      <Stack.Screen name="U_StoreScreen" component={U_StoreScreen} />
      <Stack.Screen name="U_ProductScreen" component={U_ProductScreen} />
      <Stack.Screen
        name="U_ProductCartScreen"
        component={U_ProductCartScreen}
      />
      <Stack.Screen name="U_CheckoutScreen" component={U_CheckoutScreen} />
      <Stack.Screen
        name="U_OrderDetailScreen"
        component={U_OrderDetailScreen}
      />
      <Stack.Screen name="O_StoreScreen" component={O_StoreScreen} />
      <Stack.Screen name="O_ProductScreen" component={O_ProductScreen} />
      <Stack.Screen
        name="O_ProductCartScreen"
        component={O_ProductCartScreen}
      />
      <Stack.Screen name="O_CheckoutScreen" component={O_CheckoutScreen} />
      <Stack.Screen
        name="O_OrderDetailScreen"
        component={O_OrderDetailScreen}
      />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen
        name="U_VideoPlayerSecondScreen"
        component={U_VideoPlayerSecondScreen}
      />
      <Stack.Screen
        name="O_VideoPlayerSecondScreen"
        component={O_VideoPlayerSecondScreen}
      />
    </Stack.Navigator>
  );
}
