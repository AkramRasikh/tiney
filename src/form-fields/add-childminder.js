import TextInput from '../components/form/text-input';
import { isAbove18 } from './validation-helpers';

export default [
  {
    name: 'firstName',
    label: 'First Name',
    required: true,
    rules: {
      minLength: {
        value: 2,
        message: 'Has to be at least 2 character long',
      },
    },
    type: 'text',
    InputComponent: TextInput,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    required: true,
    rules: {
      minLength: {
        value: 2,
        message: 'Has to be at least 2 character long',
      },
    },
    type: 'text',
    InputComponent: TextInput,
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Entered value does not match an email format',
    },
    type: 'email',
    InputComponent: TextInput,
  },
  {
    name: 'dob',
    label: 'Date of Birth',
    required: true,
    rules: {
      validate: isAbove18,
    },
    type: 'date',
    InputComponent: TextInput,
  },
];
