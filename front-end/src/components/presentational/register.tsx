import React, { VFC } from 'react';
import {
  HStack,
  Stack,
  Box,
  Spacer,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormErrorMessage,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type InputProduct = {
  name: string;
  category: string;
  description: string;
  price: number;
};

const Register: VFC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<InputProduct>({
    mode: 'all',
  });

  const outputLog = (data: any) => {
    console.log(data);
  };

  return (
    // login required
    <HStack p={4}>
      <Spacer />

      <Stack>
        <FormControl id="name" isRequired isInvalid>
          <Stack direction={['column', 'row']} align={['center', 'left']}>
            <Box w={['100%', '170px']} align="center">
              商品名
            </Box>
            <VStack w="320px">
              <Input {...register('name', { required: '必須項目です' })} />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </VStack>
          </Stack>
        </FormControl>

        <FormControl id="category" isRequired isInvalid>
          <Stack direction={['column', 'row']} align={['center', 'left']}>
            <Box w={['100%', '170px']} align="center">
              カテゴリーを選択
            </Box>
            <VStack w="320px">
              <Select {...register('category', { required: '必須項目です' })}>
                <option value="book">本</option>
                <option value="appliance">家電</option>
                <option value="toy">おもちゃ</option>
              </Select>

              <FormErrorMessage>
                {errors.category && errors.category.message}
              </FormErrorMessage>
            </VStack>
          </Stack>
        </FormControl>

        <FormControl id="price" isRequired isInvalid>
          <Stack direction={['column', 'row']} align={['center', 'left']}>
            <Box w={['100%', '170px']} align="center">
              希望価格
            </Box>
            <VStack w="320px">
              <Input
                {...register('price', { required: '必須項目です' })}
                type="number"
              />
              <FormErrorMessage>
                {errors.price && errors.price.message}
              </FormErrorMessage>
            </VStack>
          </Stack>
        </FormControl>

        <FormControl id="description" isRequired isInvalid>
          <Stack direction={['column', 'row']} align={['center', 'left']}>
            <Box w={['100%', '170px']} align="center">
              商品説明
            </Box>
            <VStack w="320px">
              <Textarea
                {...register('description', { required: '必須項目です' })}
                type="number"
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </VStack>
          </Stack>
        </FormControl>

        <HStack>
          <Box w="270px">画像をアップロード</Box>
          <Box>ドラッグアンドドロップ</Box>
        </HStack>

        <Button
          onClick={handleSubmit(outputLog)}
          colorScheme="blue"
          disabled={!isValid}
          isLoading={isSubmitting}
        >
          登録
        </Button>
      </Stack>
      <Spacer />
    </HStack>
  );
};

export default Register;
