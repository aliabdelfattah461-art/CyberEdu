import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [userAlias, setUserAlias] = useState("User");
  const [vodafoneCash, setVodafoneCash] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const alias = await AsyncStorage.getItem("user_alias");
    const vodafone = await AsyncStorage.getItem("vodafone_cash");
    if (alias) setUserAlias(alias);
    if (vodafone) setVodafoneCash(vodafone);
  };

  const handleLogout = async () => {
    Alert.alert(
      "تسجيل الخروج",
      "هل تريد تسجيل الخروج من حسابك؟",
      [
        {
          text: "إلغاء",
          onPress: () => {},
        },
        {
          text: "تسجيل الخروج",
          onPress: async () => {
            await AsyncStorage.removeItem("user_authenticated");
            await AsyncStorage.removeItem("access_granted");
            router.replace("/access-gateway");
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer className="flex-1 bg-black">
      <ScrollView className="p-4">
        <View className="gap-6">
          {/* Profile Header */}
          <View className="items-center gap-4 py-6">
            <View
              className="w-24 h-24 bg-primary rounded-full items-center justify-center"
              style={{
                shadowColor: "#A020F0",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 15,
              }}
            >
              <Text className="text-4xl font-bold text-background">
                {userAlias.substring(0, 1).toUpperCase()}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">
                {userAlias}
              </Text>
              <Text className="text-muted text-sm">مستخدم نشط</Text>
            </View>
          </View>

          {/* Profile Info */}
          <View className="gap-3">
            <View className="bg-surface border border-border rounded-lg p-4">
              <Text className="text-muted text-xs mb-2">اسم المستخدم</Text>
              <Text className="text-foreground font-semibold text-base">
                {userAlias}
              </Text>
            </View>

            <View className="bg-surface border border-border rounded-lg p-4">
              <Text className="text-muted text-xs mb-2">رقم فودافون كاش</Text>
              <Text className="text-foreground font-semibold text-base">
                {vodafoneCash}
              </Text>
            </View>
          </View>

          {/* Stats */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">الإحصائيات</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface border border-border rounded-lg p-4 items-center">
                <Text className="text-muted text-xs mb-2">الكورسات</Text>
                <Text className="text-primary font-bold text-2xl">0</Text>
              </View>
              <View className="flex-1 bg-surface border border-border rounded-lg p-4 items-center">
                <Text className="text-muted text-xs mb-2">الإحالات</Text>
                <Text className="text-primary font-bold text-2xl">0</Text>
              </View>
            </View>
          </View>

          {/* Settings */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">الإعدادات</Text>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">تغيير كلمة المرور</Text>
              <Text className="text-muted">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">سياسة الخصوصية</Text>
              <Text className="text-muted">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">شروط الاستخدام</Text>
              <Text className="text-muted">→</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface border border-border rounded-lg p-4 flex-row justify-between items-center">
              <Text className="text-foreground font-semibold">حول التطبيق</Text>
              <Text className="text-muted">v0.1.0</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-error py-4 rounded-lg items-center mt-4"
            style={{
              shadowColor: "#FF0080",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 10,
            }}
          >
            <Text className="text-background font-bold text-lg">
              تسجيل الخروج
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
