import React, { FC, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { BaseButton } from '../../buttons';
import { TextInput } from '../../form/components';
import { LoginFormSchema, LoginFormType, LoginType } from './types';
import { useAuthProviderContext } from '@dashify/auth';

export type LoginPageProps = {
  signup?: boolean;
};

export const LoginPage: FC<LoginPageProps> = ({
  signup: allowSignup = true,
}) => {
  const form = useForm<LoginFormType>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      type: LoginType.SIGNIN,
    },
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <Box
      px="10"
      py="7"
      boxShadow="0px 0px 5px rgba(0,0,0,.1)"
      borderRadius="15px"
      w="100%"
      maxW="450px"
    >
      <FormProvider {...form}>
        <LoginFormContent allowSignup={allowSignup} />
      </FormProvider>
    </Box>
  );
};

const LoginFormContent = ({ allowSignup }: { allowSignup: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { provider: authProvider } = useAuthProviderContext();
  const { handleSubmit, setValue } = useFormContext<LoginFormType>();
  const loginType = useWatch<LoginFormType>({ name: 'type' });
  const isSignin = loginType === LoginType.SIGNIN;

  const toggleLoginType = () => {
    setValue('type', isSignin ? LoginType.SIGNUP : LoginType.SIGNIN);
  };

  const doLogin = async (data: LoginFormType) => {
    try {
      setIsLoading(true);
      if (isSignin) {
        await authProvider.signin(data);
      } else {
        await authProvider.signup(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Text fontSize="1.5rem" fontWeight="bold" mb="10px">
        {isSignin ? 'Sign In' : 'Sign Up'}
      </Text>
      <form onSubmit={handleSubmit(doLogin)} style={{ width: '100%' }}>
        <Stack gap="4" width="100%">
          <TextInput source="username" label="Username" />
          <TextInput
            source="password"
            label="Password"
            inputProps={{ type: 'password' }}
          />
          {!isSignin && (
            <TextInput
              source="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
            />
          )}
          <Flex
            mt="4"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <BaseButton loading={isLoading} type="submit">
              {isSignin ? 'Sign In' : 'Sign Up'}
            </BaseButton>
            {allowSignup && (
              <BaseButton
                variant="plain"
                onClick={allowSignup ? toggleLoginType : undefined}
              >
                {isSignin ? "Don't have an account ?" : 'Have an account ?'}
              </BaseButton>
            )}
          </Flex>
        </Stack>
      </form>
    </>
  );
};
