import React from 'react';
import { Box, Button, Flex, Input, Link, Stack, Text } from '@chakra-ui/react';
import { Field } from '../../chakra/snippets/field';

const Register = () => {
  return (
    <Flex
      alignItems="center"
      bg="colorPalette.800"
      justifyContent={'center'}
      h="100vh"
      w="100vw"
      px="20px"
    >
      <Box
        bg="blackAlpha.800"
        py="70px"
        px="50px"
        borderRadius="15px"
        w={{ base: '100%', md: '500px' }}
        maxW="500px"
      >
        <Text
          as="h1"
          fontSize={'35px'}
          mb="20px"
          textAlign={{ base: 'center', md: 'initial' }}
        >
          Sign Up
        </Text>
        <form>
          <Stack gap="4" align="flex-start" maxW="500px">
            <Field
              label={
                <Text fontSize="17px" fontWeight="medium">
                  Username
                </Text>
              }
            >
              <Input />
            </Field>
            <Field
              label={
                <Text fontSize="17px" fontWeight="medium">
                  Password
                </Text>
              }
            >
              <Input type="password" />
            </Field>
            <Field
              label={
                <Text fontSize="17px" fontWeight="medium">
                  Confirm password
                </Text>
              }
            >
              <Input type="password" />
            </Field>
            <Flex
              mt="20px"
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'center' }}
              flexWrap={'wrap'}
              alignItems="center"
              gap="35px"
              width={{ base: '100%', md: 'initial' }}
            >
              <Button
                type="submit"
                w={{ base: '60%', md: '150px' }}
                fontSize="16px"
                py="3"
              >
                Sign Up
              </Button>
              <Link href="/login" textAlign={{ base: 'center', md: 'initial' }}>
                Have an account ?
              </Link>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
