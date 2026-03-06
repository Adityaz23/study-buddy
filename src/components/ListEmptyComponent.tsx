import { View,Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { COLORS } from "@/lib/theme";
export default function ListEmptyComponent() {
  return (
    <View>
      <MaterialIcons name="people-outline" size={18} color={COLORS.textSubtle}/>
      <Text className="text-[17px] font-semibold text-foreground">No Users Found!</Text>
    </View>
  );
}
