import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, useRouter } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize the router

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all of the fields');
      return; // Exit if fields are missing
    }

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      router.replace('/home'); // Navigate to the home screen
    } catch (error) {
      Alert.alert('Error', error.message || 'An unknown error occurred'); // Display actual error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo} // Aora Logo
            resizeMode='contain' 
            className="w-[115px] h-[35px]" 
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          
          <FormField // Email field
            title="Email"
            value={form.email}
            handleChangeText={(email) => setForm({ ...form, email })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField // Password field
            title="Password"
            value={form.password}
            handleChangeText={(password) => setForm({ ...form, password })}
            otherStyles="mt-7"
            secureTextEntry // Optional: Hide the password
          />

          <CustomButton // Sign in button
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2"> 
            <Text className="text-lg text-gray-100 font-pregular">
              Don't Have an Account?
            </Text>

            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;