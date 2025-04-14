import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React from "react";
import { Redirect, Stack } from 'expo-router';
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useAuth } from "@/store/authStore";


const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const setUser = useAuth((user: any) => user.setUser)
  const setToken = useAuth((token: any) => token.setToken)
  const setIsLoggedIn = useAuth((isLoggedIn: any) => isLoggedIn.setIsLoggedIn);
  const isLoggedIn = useAuth((state: any) => state.isLoggedIn);

  console.log("Login screen rendered with the isLoggedIn state: ", isLoggedIn);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleLoginSubmit = useMutation({
    mutationFn: (data: any) => {
      return login(data.email, data.password)
    },
    onSuccess: (data) => {
      console.log("Login successful: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        setIsLoggedIn(true);
      }
      setSuccess(true)
      setLoading(false)
    },
    onError: (error: any) => {
      console.log("Login error: ", error);
      setError(error.message)
      setLoading(false)
    },
  });

  if (isLoggedIn) {
    console.log("User is logged in");
    return <Redirect href="/" />
  }

  return (
    <FormControl isInvalid={handleLoginSubmit.error} className="p-4 border rounded-lg border-outline-300">
    <Stack.Screen options={{ title: "Login" }} />
      <VStack space="xl">
        <Heading className="text-typography-900">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input className="min-w-[250px]">
            <InputField type="text" value={email} onChangeText={setEmail} />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="text-center">
            <InputField type={showPassword ? "text" : "password"} value={password} onChangeText={setPassword} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm">
        <Button
            variant="outline"
            className="flex-1"
            onPress={() => {
                handleLoginSubmit.mutate({
                    email,
                    password,
                })
            }}
            >
            <ButtonText className="color-black">Login</ButtonText>
            </Button>
            <Button
            className="flex-1"
            onPress={() => {
                console.log("Register button pressed")
            }}
            >
            <ButtonText className="text-typography-0">Register</ButtonText>
            </Button>        
            </HStack>
          </VStack>
    </FormControl>
  )
}

export default LoginScreen