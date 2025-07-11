import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  // ✨ Use IsStrongPassword decorator
  @IsStrongPassword(
    {
      minLength: 8, // Minimum length of the password
      minLowercase: 1, // Minimum number of lowercase letters
      minUppercase: 1, // Minimum number of uppercase letters
      minNumbers: 1, // Minimum number of numbers
      minSymbols: 1, // Minimum number of symbols (e.g., !, @, #, $)
    },
    {
      message:
        'Password is too weak. It must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
    },
  )
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
