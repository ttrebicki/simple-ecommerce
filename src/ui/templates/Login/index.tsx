'use client';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validators/login';
import { TextField } from '@/ui/reusable/TextField';
import { firebaseToastError } from '@/lib/helpers/toastError';
import { Button } from '@/ui/reusable/Button';
import { Box } from '@/ui/reusable/Box';
import { app } from '@/lib/api/firebase_client';
import { fetcher } from '@/lib/api/fetcher';
import { uri } from '@/lib/constants/uri';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Loader from '@/ui/reusable/Loader';

export default function Login() {
  const auth = getAuth(app);
  const [isRegister, toggleRegister] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const email = watch('email');
  const password = watch('password');

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      await fetcher.post({
        uri: uri.getFirebaseSession,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      router.replace('/');
      toast.success(
        res.user.displayName
          ? `Logged in! Hello, ${res.user.displayName}!`
          : 'Logged in!',
      );
    } catch (error) {
      firebaseToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      await fetcher.post({
        uri: uri.getFirebaseSession,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      router.replace('/');
      toast.success(
        res.user.displayName
          ? `Logged in! Hello, ${res.user.displayName}!`
          : 'Logged in!',
      );
    } catch (error) {
      firebaseToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(isRegister ? handleRegister : handleLogin);

  return (
    <Box>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        <div>
          <TextField
            error={errors.email?.message}
            label={'Email'}
            {...register('email')}
          />
          <TextField
            error={errors.password?.message}
            type='password'
            label={'Password'}
            {...register('password')}
          />
        </div>
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <Loader /> : isRegister ? 'Register' : 'Log In'}
        </Button>
      </form>
      <Button
        onClick={() => {
          toggleRegister((state) => !state);
        }}
        variant='outlined'
        padding={1}
        className={'mt-4 '}
      >
        {isRegister
          ? 'Return to login'
          : 'No account? Click here to register. 😎'}
      </Button>
    </Box>
  );
}
