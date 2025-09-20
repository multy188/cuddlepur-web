import WelcomeScreen from '../WelcomeScreen';

export default function WelcomeScreenExample() {
  return (
    <WelcomeScreen 
      onGetStarted={() => console.log('Get Started clicked')}
      onSignIn={() => console.log('Sign In clicked')}
    />
  );
}