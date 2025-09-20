import AuthFlow from '../AuthFlow';

export default function AuthFlowExample() {
  return (
    <AuthFlow 
      onComplete={() => console.log('Auth flow completed')}
      onBack={() => console.log('Back to welcome')}
    />
  );
}