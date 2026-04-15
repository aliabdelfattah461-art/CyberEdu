import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function PaymentScreen() {
  const [transferNumber, setTransferNumber] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [screenshotUploaded, setScreenshotUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUploadScreenshot = () => {
    Alert.alert("رفع صورة", "يمكنك اختيار صورة من المعرض أو التقاط صورة جديدة");
    setScreenshotUploaded(true);
  };

  const handleSubmitPayment = async () => {
    if (!transferNumber.trim() || !senderNumber.trim() || !screenshotUploaded) {
      Alert.alert("خطأ", "يرجى ملء جميع الحقول ورفع الصورة");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      Alert.alert(
        "تم الإرسال",
        "تم إرسال طلب الشراء للتحقق. سيتم تفعيل الكورس بعد التأكيد",
        [
          {
            text: "حسناً",
            onPress: () => router.replace("/(tabs)"),
          },
        ]
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <ScreenContainer className="flex-1 bg-black">
      <ScrollView className="p-4">
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-primary">
              تحويل الدفع
            </Text>
            <Text className="text-muted text-sm">
              أكمل عملية الشراء
            </Text>
          </View>

          {/* Payment Info */}
          <View
            className="bg-surface border border-border rounded-lg p-4 gap-3"
            style={{
              shadowColor: "#A020F0",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <View>
              <Text className="text-muted text-xs mb-1">رقم الحساب</Text>
              <Text className="text-foreground font-bold text-lg">
                01080821381
              </Text>
            </View>
            <View>
              <Text className="text-muted text-xs mb-1">المبلغ</Text>
              <Text className="text-primary font-bold text-lg">299 EGP</Text>
            </View>
            <View>
              <Text className="text-muted text-xs mb-1">الخدمة</Text>
              <Text className="text-foreground font-bold">
                فودافون كاش
              </Text>
            </View>
          </View>

          {/* Instructions */}
          <View className="bg-background bg-opacity-20 border border-border rounded-lg p-4 gap-2">
            <Text className="text-foreground font-semibold">خطوات الدفع:</Text>
            <Text className="text-muted text-sm">
              1. افتح تطبيق فودافون كاش
            </Text>
            <Text className="text-muted text-sm">
              2. اختر "تحويل أموال"
            </Text>
            <Text className="text-muted text-sm">
              3. أدخل الرقم: 01080821381
            </Text>
            <Text className="text-muted text-sm">
              4. أدخل المبلغ: 299 جنيه
            </Text>
            <Text className="text-muted text-sm">
              5. أكمل العملية وخذ صورة من الشاشة
            </Text>
          </View>

          {/* Screenshot Upload */}
          <View className="gap-3">
            <Text className="text-foreground font-semibold">
              رفع سكرين شوت التحويل
            </Text>
            <TouchableOpacity
              onPress={handleUploadScreenshot}
              className={`border-2 border-dashed rounded-lg p-6 items-center justify-center ${
                screenshotUploaded
                  ? "border-success bg-success bg-opacity-10"
                  : "border-border"
              }`}
            >
              <Text className="text-muted text-sm">
                {screenshotUploaded
                  ? "✓ تم رفع الصورة بنجاح"
                  : "اضغط لرفع الصورة"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            <View>
              <Text className="text-foreground text-sm font-semibold mb-2">
                رقم التحويل (الراسل)
              </Text>
              <TextInput
                value={transferNumber}
                onChangeText={setTransferNumber}
                placeholder="أدخل رقم التحويل من الشاشة"
                placeholderTextColor="#666"
                editable={!loading}
                className="bg-surface border border-border rounded-lg p-4 text-foreground text-base"
              />
            </View>

            <View>
              <Text className="text-foreground text-sm font-semibold mb-2">
                رقم الهاتف المرسل منه
              </Text>
              <TextInput
                value={senderNumber}
                onChangeText={setSenderNumber}
                placeholder="01xxxxxxxxx"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                editable={!loading}
                className="bg-surface border border-border rounded-lg p-4 text-foreground text-base"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitPayment}
            disabled={loading}
            className={`py-4 rounded-lg items-center ${
              loading ? "opacity-50" : "opacity-100"
            }`}
            style={{
              backgroundColor: "#A020F0",
              shadowColor: "#A020F0",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.7,
              shadowRadius: 10,
            }}
          >
            <Text className="text-background font-bold text-lg">
              {loading ? "جاري الإرسال..." : "إرسال للتحقق"}
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View className="bg-warning bg-opacity-10 border border-warning rounded-lg p-3">
            <Text className="text-warning text-xs">
              ملاحظة: سيتم تفعيل الكورس بعد تحقق الإدمن من صحة التحويل
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
