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
  FormLabel,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export type ProductForm = {
  name: string;
  category: string;
  description: string;
  price: number;
  picture: FileList;
};

type Props = {
  submitProduct: (product: ProductForm) => void;
};

const Register: VFC<Props> = ({ submitProduct }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<ProductForm>({
    mode: 'all',
  });

  return (
    // login required
    <HStack p={4}>
      <Spacer />
      {isSubmitted ? (
        <Stack>
          <Box>商品登録完了しました。</Box>
        </Stack>
      ) : (
        <Stack>
          <FormControl id="name" isRequired isInvalid>
            <Stack direction={['column', 'row']} align={['center', 'left']}>
              <Box w={['100%', '170px']} textAlign={['center', 'left']}>
                商品名
              </Box>
              <VStack w="320px">
                <Input
                  {...register('name', { required: '必須項目です' })}
                  textAlign={['center', 'left']}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </VStack>
            </Stack>
          </FormControl>

          <FormControl id="category" isRequired isInvalid>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'center', md: 'left' }}
            >
              <Box w={['100%', '170px']} textAlign={['center', 'left']}>
                カテゴリーを選択
              </Box>
              <VStack w="320px">
                <Select
                  {...register('category', { required: '必須項目です' })}
                  textAlign={['center', 'left']}
                >
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
              <Box w={['100%', '170px']} textAlign={['center', 'left']}>
                希望価格
              </Box>
              <VStack w="320px">
                <Input
                  {...register('price', { required: '必須項目です' })}
                  type="number"
                  textAlign={['center', 'left']}
                />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </VStack>
            </Stack>
          </FormControl>

          <FormControl id="description" isRequired isInvalid>
            <Stack
              direction={['column', 'row']}
              align={{ base: 'center', md: 'left' }}
            >
              <Box w={['100%', '170px']} textAlign={['center', 'left']}>
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

          <FormControl id="picture" isRequired isInvalid>
            <Stack direction={['column', 'row']} align={['center', 'left']}>
              <FormLabel
                w={['100%']}
                textAlign={['center']}
                htmlFor="fileImage"
              >
                画像をアップロード
              </FormLabel>
              <VStack>
                <Input
                  id="fileImage"
                  display="none"
                  accept="image/*,.png,.jpg"
                  type="file"
                  {...register('picture', { required: '必須項目です' })}
                  // ref={inputRef}
                  // onChange={handleChange}
                />
              </VStack>
            </Stack>
          </FormControl>

          <Stack align="center">
            <Button
              w={['100%', '50%']}
              onClick={handleSubmit(submitProduct)}
              colorScheme="blue"
              disabled={!isValid}
              isLoading={isSubmitting}
            >
              登録
            </Button>
          </Stack>
        </Stack>
      )}

      <Spacer />
    </HStack>
  );
};

export default Register;
