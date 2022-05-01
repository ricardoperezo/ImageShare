import React, { useState } from "react";
import { Platform, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import * as SplashScreen from "expo-splash-screen";
import CardImage from "./components/CardImage/index";
import PickerView from "./components/PickerView/index";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
  };

  const openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }

    setDimensions({ width: pickerResult.width, height: pickerResult.height });
  };

  const cancelShareDialog = async () => {
    setSelectedImage(null);
    setDimensions({ width: null, height: null });
  };

  const ImagePickerView = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <PickerView handlePicker={openImagePickerAsync} />
      </View>
    );
  };

  const ShareView = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          padding: 30,
          marginTop: 50,
        }}
      >
        <CardImage
          title={"ricardoperezo"}
          description={`w:${dimensions.width}px, h:${dimensions.height}px`}
          selectedImage={selectedImage}
          handleShare={openShareDialogAsync}
          handleCancel={cancelShareDialog}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Picker") {
              iconName = focused ? "image-search" : "image-search-outline";
            } else if (route.name === "Share") {
              iconName = focused ? "file-upload" : "file-upload-outline";
            }

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {selectedImage ? (
          <>
            <Tab.Screen name="Picker" component={ImagePickerView} />
            <Tab.Screen name="Share" component={ShareView} />
          </>
        ) : (
          <Tab.Screen name="Picker" component={ImagePickerView} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
