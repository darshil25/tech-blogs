import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { SignInInput, SignUpInput } from '@incognito_dev/blog-zod';
import { useUserSignInMutation, useUserSignUpMutation } from '../../API/blogApi';
import { useNavigate } from 'react-router-dom';

type AuthProps = {
  type: string;
};

// type QuoteProps = {
//   quote: string;
//   author: string;
//   position: string;
// };

type formErrorType = {
  firstName?: string;
  email?: string;
  password?: string;
};

const Quote = () => {
  return (
    <div className="bg-[#F2F5F7] flex flex-col gap-4 justify-center px-24">
      <h1 className="font-bold text-2xl">
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolore
        ex vel corrupti necessitatibus repellendus, laboriosam error
        voluptatibus nesciunt eius."
      </h1>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-xl">Jules Winnfield</h2>
        <p className="text-gray-500">CEO, Acme Inc</p>
      </div>
    </div>
  );
};

const Authentication = ({ type }: AuthProps) => {
  const [mode, setMode] = useState(type);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<formErrorType>({});

  const navigate = useNavigate();

  const [userSignUp, {isLoading: signUpLoading}] = useUserSignUpMutation();
  const [userSignIn, {isLoading: signInLoading}] = useUserSignInMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = (formData.get('lastName') as string) || undefined;

    if (mode === 'signup') {
      try {
        // This will throw an exception if validation fails
        const validatedData = SignUpInput.parse({
          email,
          password,
          firstName,
          lastName,
        });
        
        const response = await userSignUp(validatedData).unwrap();
        localStorage.setItem('token', response.token);
        navigate('/');
        // Success logic
      } catch (error: any) {
        console.log('🚀 ~ handleSubmit ~ error:', error);
        if (error.errors) {
          const newErrors: formErrorType = {};
          error.errors.forEach((err: any) => {
            const path = err.path[0];
            newErrors[path as keyof formErrorType] = err.message;
          });
          setFormErrors(newErrors);
        }
      }
    } else {
      try {
        const validatedData = SignInInput.parse({ email, password });
        console.log('🚀 ~ handleSubmit ~ validateData:', validatedData);

        const response = await userSignIn(validatedData).unwrap();
        localStorage.setItem('token', response.token);
        navigate('/');
      } catch (error: any) {
        console.log('🚀 ~ handleSubmit ~ error:', error);
        if (error.errors) {
          const newErrors: formErrorType = {};
          error.errors.forEach((err: any) => {
            const path = err.path[0];
            newErrors[path as keyof formErrorType] = err.message;
          });
          setFormErrors(newErrors);
        }
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setFormErrors({});
  };

  const renderError = (errorKey: keyof formErrorType) =>
    formErrors[errorKey] && (
      <p className="text-red-500 text-xs">{formErrors[errorKey]}</p>
    );

  useEffect(() => {
    setFormErrors({});
    setShowPassword(false);
  }, [mode]);

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col justify-center items-center w-3/4 m-auto">
        {/* Mode Toggle */}
        <div className="flex border-b w-full">
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`cursor-pointer flex-1 py-4 text-center font-medium transition-colors ${
              mode === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`cursor-pointer flex-1 py-4 text-center font-medium transition-colors ${
              mode === 'signin'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Container */}
        <div className="p-6 w-full">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">
              {mode === 'signup' ? 'Sign Up' : 'Sign In'}
            </h1>
            <p className="text-gray-500">
              {mode === 'signup'
                ? 'Enter your information to create an account'
                : 'Enter your credentials to access your account'}
            </p>
          </div>
          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Signup-only Fields */}
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className={`w-full px-3 py-2 border rounded-md ${
                      formErrors.firstName
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {renderError('firstName')}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                className={`w-full px-3 py-2 border rounded-md ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {renderError('email')}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 border rounded-md pr-10 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {renderError('password')}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // disabled={isSignUpLoading || isSignInLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {signUpLoading || signInLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === 'signup' ? 'Signing up...' : 'Signing in...'}
                </div>
              ) : mode === 'signup' ? (
                'Sign Up'
              ) : (
                'Sign In'
              )}
            </button>

            {/* Mode Toggle Footer */}
            <div className="text-center mt-4">
              {mode === 'signup' ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <Quote />
    </div>
  );
};

export default Authentication;
