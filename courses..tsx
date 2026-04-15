import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useRouter } from "expo-router";

interface Course {
  id: string;
  title: string;
  price: number;
  description: string;
  level: string;
  instructor: string;
  duration: string;
  lessons: number;
}

const COURSES: Course[] = [
  {
    id: "1",
    title: "أساسيات الأمن السيبراني",
    price: 299,
    description: "تعلم المبادئ الأساسية للأمن السيبراني والحماية من التهديدات",
    level: "مبتدئ",
    instructor: "أحمد علي",
    duration: "4 أسابيع",
    lessons: 12,
  },
  {
    id: "2",
    title: "اختبار الاختراق",
    price: 599,
    description: "تقنيات متقدمة لاختبار الاختراق والكشف عن الثغرات",
    level: "متقدم",
    instructor: "محمد حسن",
    duration: "8 أسابيع",
    lessons: 24,
  },
  {
    id: "3",
    title: "الهندسة الاجتماعية",
    price: 399,
    description: "فهم تقنيات الهندسة الاجتماعية والدفاع ضدها",
    level: "متوسط",
    instructor: "فاطمة محمود",
    duration: "6 أسابيع",
    lessons: 18,
  },
  {
    id: "4",
    title: "تحليل البرامج الضارة",
    price: 699,
    description: "تحليل وفهم البرامج الضارة وطرق مكافحتها",
    level: "متقدم",
    instructor: "عمر السيد",
    duration: "10 أسابيع",
    lessons: 30,
  },
];

export default function CoursesScreen() {
  const router = useRouter();

  const handlePurchase = (courseId: string) => {
    Alert.alert("شراء الكورس", "سيتم نقلك لصفحة الدفع");
  };

  return (
    <ScreenContainer className="flex-1 bg-black">
      <ScrollView className="p-4">
        <View className="gap-2 mb-6">
          <Text className="text-3xl font-bold text-primary">الكورسات</Text>
          <Text className="text-muted text-sm">
            اختر من مجموعة الكورسات المتخصصة
          </Text>
        </View>

        <View className="gap-4">
          {COURSES.map((course) => (
            <TouchableOpacity
              key={course.id}
              className="bg-surface border border-border rounded-xl p-4 active:opacity-70"
              style={{
                shadowColor: "#A020F0",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              }}
            >
              <View className="gap-3">
                {/* Title and Price */}
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-foreground font-bold text-lg">
                      {course.title}
                    </Text>
                    <Text className="text-muted text-xs mt-1">
                      {course.instructor}
                    </Text>
                  </View>
                  <Text className="text-primary font-bold text-xl">
                    {course.price}
                  </Text>
                </View>

                {/* Description */}
                <Text className="text-muted text-sm leading-relaxed">
                  {course.description}
                </Text>

                {/* Course Info */}
                <View className="flex-row justify-between bg-background bg-opacity-30 rounded-lg p-3">
                  <View className="items-center">
                    <Text className="text-muted text-xs">المستوى</Text>
                    <Text className="text-foreground text-sm font-semibold">
                      {course.level}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-muted text-xs">المدة</Text>
                    <Text className="text-foreground text-sm font-semibold">
                      {course.duration}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-muted text-xs">الدروس</Text>
                    <Text className="text-foreground text-sm font-semibold">
                      {course.lessons}
                    </Text>
                  </View>
                </View>

                {/* Purchase Button */}
                <TouchableOpacity
                  onPress={() => handlePurchase(course.id)}
                  className="bg-primary py-3 rounded-lg items-center"
                  style={{
                    shadowColor: "#A020F0",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: 10,
                  }}
                >
                  <Text className="text-background font-bold">
                    اشتري الآن - {course.price} EGP
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
