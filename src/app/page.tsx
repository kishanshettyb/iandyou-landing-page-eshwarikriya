import Modal from '@/components/modal';
import { RegisterForm } from '@/components/registerForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Modal
        description="Enter below details to register"
        triggerVariant="default"
        triggerLabel="Register"
        title="Register Now"
      >
        <RegisterForm />
      </Modal>
    </main>
  );
}
