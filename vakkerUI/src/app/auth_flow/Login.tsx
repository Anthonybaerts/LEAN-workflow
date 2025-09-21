import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Firebase } from '@/services/firebase';
import { LoginScreen } from '@/ui/screens';

export default function LoginRoute() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );

  const handleLogin = React.useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(undefined);
    try {
      await signInWithEmailAndPassword(
        Firebase.auth(),
        email.trim(),
        password
      );
      router.replace('/(tabs)/calendar');
    } catch (err: any) {
      if (err?.code === 'auth/invalid-credential') {
        setErrorMessage('Ongeldige inloggegevens');
      } else {
        setErrorMessage('Er is een fout opgetreden. Probeer het opnieuw.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, isSubmitting, router]);

  return (
    <LoginScreen
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      onForgotPassword={() => {}}
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
    />
  );
}


