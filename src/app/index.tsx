import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const {isSignedIn} = useAuth();
  if(!isSignedIn){
    return <Redirect href={"/(auth)"}/>
  }
  return (
    <View style={styles.container}>
      <Text className="text-pink-700">Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
