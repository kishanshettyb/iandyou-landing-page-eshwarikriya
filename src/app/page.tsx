import Modal from '@/components/modal';
import Test from '@/components/registerForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Modal triggerVariant="default" triggerLabel="Register" title="Register Now">
        <Test />
      </Modal>
    </main>
  );
}
