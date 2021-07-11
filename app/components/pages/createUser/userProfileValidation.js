import { object, mixed, string, ref } from 'yup';
import { MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS } from '../../../utils/constants';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const userProfileValidation = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test('checkEmptyFile', 'Empty File', (value) => value && value.size)
      .test(
        'fileSize',
        'File too large',
        (value) =>
          value &&
          value.size &&
          value.size / 1024 / 1024 <= MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),

  password: string()
    .matches(/^(?!\s+$)/, '* This field cannot contain only blankspaces')
    .min(4, 'Too Short')
    .max(15, 'Exceeded Maximum Characters Limit'),
  confirmPassword: string().oneOf(
    [ref('password'), null],
    'Passwords must match'
  ),
});
