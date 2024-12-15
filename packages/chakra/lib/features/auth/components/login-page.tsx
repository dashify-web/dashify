import React from 'react';
import { Box, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { Field } from '../../../chakra/snippets/field';
import { BaseButton } from '../../buttons';

import { FC, useState } from 'react';

export type LoginPageProps = {
  signup?: boolean;
};

type LoginType = 'signin' | 'signup';
export const LoginPage: FC<LoginPageProps> = ({
  signup: allowSignup = true,
}) => {
  const [loginType, setLoginType] = useState<LoginType>('signin');
  const isSignin = loginType === 'signin';

  const toggleLoginType = () => {
    setLoginType((prev) => (prev === 'signin' ? 'signup' : 'signin'));
  };

  return (
    <Box px="10" py="7" borderRadius="15px" w="100%" maxW="450px">
      <Text as="h1" fontSize="1.5rem" fontWeight="bold" mb="10px">
        {isSignin ? 'Sign In' : 'Sign Up'}
      </Text>
      <form style={{ width: '100%' }}>
        <Stack gap="4" align="flex-start" width="100%">
          <Field label={<Text fontSize="1rem">Username</Text>}>
            <Input />
          </Field>
          <Field label={<Text fontSize="1rem">Password</Text>}>
            <Input type="password" />
          </Field>
          {!isSignin && (
            <Field label={<Text fontSize="17px">Confirm password</Text>}>
              <Input type="password" />
            </Field>
          )}
          <Flex
            mt="20px"
            flexDirection={{ base: 'column', md: 'row' }}
            justifyContent={{ base: 'center' }}
            flexWrap={'wrap'}
            alignItems="center"
            gap="35px"
            width={{ base: '100%', md: 'initial' }}
          >
            <BaseButton type="submit">
              {isSignin ? 'Sign In' : 'Sign Up'}
            </BaseButton>
            {allowSignup && (
              <BaseButton
                onClick={allowSignup ? toggleLoginType : undefined}
                variant="plain"
              >
                {isSignin ? "Don't have an account ?" : 'Have an account ?'}
              </BaseButton>
            )}
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};
