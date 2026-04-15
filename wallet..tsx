import { ScrollView, Text, View, TouchableOpacity, Alert, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Transaction {
  id: string;
  type: "referral" | "withdrawal" | "course_purchase";
  amount: number;
  date: string;
  description: string;
}

export default function WalletScreen() {
  const [balance, setBalance] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "referral",
      amount: 50,
      date: "2024-04-10",
      description: "إحالة من صديق",
    },
    {
      id: "2",
      type: "referral",
      amount: 30,
      date: "2024-04-09",
      description: "إحالة من صديق",
    },
    {
      id: "3",
      type: "course_purchase",
      amount: -299,
      date: "2024-04-08",
      description: "شراء كورس الأمن السيبراني",
    },
  ]);

  useEffect(() => {
    loadWalletData();
  }, []);

  const loadWalletData = async () => {
    const userAlias = await AsyncStorage.getItem("user_alias");
    setBalance(Math.floor(Math.random() * 5000));
    // Generate unique referral code
    setReferralCode(`REF-${userAlias?.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(7).toUpperCase()}`);
  };

  const handleShareReferral = () => {
    Alert.alert(
      "شارك رابط الإحالة",
      `رابطك الفريد: ${referralCode}\n\nشارك هذا الرابط واحصل على 10 جنيهات لكل شخص يسجل عبره`,
      [
        {
          text: "نسخ الرابط",
          onPress: () => Alert.alert("تم", "تم نسخ الرابط"),
        },
        {
          text: "إغلاق",
          onPress: () => {},
        },
      ]
    );
  };

  const handleWithdrawal = () => {
    if (balance < 100) {
      Alert.alert("خطأ", "الحد الأدنى للسحب هو 100 جنيه");
      return;
    }
    Alert.alert("طلب سحب", `سيتم تحويل ${balance} جنيه لحسابك في فودافون كاش`);
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="bg-surface border border-border rounded-lg p-4 mb-3 flex-row justify-between items-center">
      <View className="flex-1">
        <Text className="text-foreground font-semibold">{item.description}</Text>
        <Text className="text-muted text-xs mt-1">{item.date}</Text>
      </View>
      <Text
        className={`font-bold text-lg ${
          item.amount > 0 ? "text-success" : "text-error"
        }`}
      >
        {item.amount > 0 ? "+" : ""}{item.amount} EGP
      </Text>
    </View>
  );

  return (
    <ScreenContainer className="flex-1 bg-black">
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="pb-6 gap-6">
            {/* Balance Card */}
            <View
              className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 border border-border"
              style={{
                shadowColor: "#A020F0",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 15,
              }}
            >
              <View className="gap-3">
                <Text className="text-foreground text-sm opacity-80">
                  رصيد المحفظة
                </Text>
                <Text className="text-foreground text-5xl font-bold">
                  {balance}
                </Text>
                <Text className="text-foreground text-sm">جنيه مصري</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="gap-3">
              <TouchableOpacity
                onPress={handleShareReferral}
                className="bg-primary py-4 rounded-lg items-center"
                style={{
                  shadowColor: "#A020F0",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.7,
                  shadowRadius: 10,
                }}
              >
                <Text className="text-background font-bold text-lg">
                  شارك واربح
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleWithdrawal}
                className={`py-4 rounded-lg items-center border border-border ${
                  balance >= 100 ? "bg-surface" : "bg-surface opacity-50"
                }`}
              >
                <Text className="text-foreground font-bold text-lg">
                  سحب الأرباح
                </Text>
              </TouchableOpacity>
            </View>

            {/* Referral Code */}
            <View className="bg-surface border border-border rounded-lg p-4">
              <Text className="text-muted text-xs mb-2">رمز الإحالة الخاص بك</Text>
              <View className="bg-background bg-opacity-30 rounded-lg p-3 flex-row justify-between items-center">
                <Text className="text-foreground font-mono">{referralCode}</Text>
                <TouchableOpacity>
                  <Text className="text-primary font-semibold">نسخ</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Transactions Header */}
            <View className="gap-2">
              <Text className="text-xl font-bold text-foreground">
                السجل
              </Text>
              <View className="h-1 bg-primary rounded-full w-12" />
            </View>
          </View>
        }
        scrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
      />
    </ScreenContainer>
  );
}
