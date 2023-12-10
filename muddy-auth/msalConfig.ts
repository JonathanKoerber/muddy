import { Platform } from 'react-native';
import type { B2CConfiguration } from './b2cClient';

export const b2cConfig: B2CConfiguration = {
  auth: {
    clientId: 'a8e597a9-a869-45bf-a2b7-feec9e52bfed',
    authorityBase: 'https://mathbuddycityu.b2clogin.com/mathbuddycityu.onmicrosoft.com',
    policies: {
      signInSignUp: 'B2C_1_SignUp_In',
      passwordReset: 'B2C_1_PasswordReset',
    },
    redirectUri: Platform.select({android: "msauth://com.chithirai.sam.testAuth/xpt2Ew8eChiJ19YcDORClSBxtJA%3D" , default: undefined }),
  },
  // web only:
  cache: { cacheLocation: 'localStorage' },
};

export const b2cScopes = ["profile"];

export interface b2cUser {
  name: string,
  family_name?: string,
  given_name?: string,
  emails?: string[]
}
