import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenContainer } from '@/components/screen-container';

const ACCESS_CODE = '123123mmA';

export default function AccessGatewayScreen() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user already has access
    checkAccess();
  }, []);

  const checkAccess = async () => {
    const hasAccess = await AsyncStorage.getItem('access_granted');
    if (hasAccess === 'true') {
      router.replace('/(auth)/login');
    }
  };

  const handleAccessSubmit = async () => {
    if (!code.trim()) {
      Alert.alert('خطأ', 'يرجى إدخال رمز الوصول');
      return;
    }

    setLoading(true);
    
    // Simulate verification delay
    setTimeout(async () => {
      if (code === ACCESS_CODE) {
        // Store access granted state
        await AsyncStorage.setItem('access_granted', 'true');
        router.replace('/(auth)/login');
      } else {
        Alert.alert('خطأ', 'رمز الوصول غير صحيح');
        setCode('');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <ScreenContainer className="flex-1 justify-center items-center p-6 bg-black">
      <View className="w-full max-w-sm gap-8">
        {/* Title */}
        <View className="items-center gap-2">
          <Text className="text-4xl font-bold text-primary text-center">
            CYBER
          </Text>
          <Text className="text-sm text-border tracking-widest">
            ACCESS GATEWAY
          </Text>
        </View>

        {/* Access Code Input */}
        <View className="gap-4">
          <Text className="text-foreground text-sm font-semibold">
            رمز الوصول الخاص
          </Text>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="أدخل رمز الوصول"
            placeholderTextColor="#666"
            secureTextEntry={true}
            editable={!loading}
            className="bg-surface border border-border rounded-lg p-4 text-foreground text-base"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleAccessSubmit}
          disabled={loading}
          className={`py-4 rounded-lg items-center ${
            loading ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            backgroundColor: '#A020F0',
            shadowColor: '#A020F0',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
        >
          <Text className="text-background font-bold text-lg">
            {loading ? 'جاري التحقق...' : 'دخول'}
          </Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text className="text-muted text-xs text-center">
          هذا التطبيق محمي برمز وصول خاص
        </Text>
      </View>
    </ScreenContainer>
  );
}
