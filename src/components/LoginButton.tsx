import { initiateLogin } from '@/lib/auth';

export default function LoginButton() {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={initiateLogin}
    >
      Login
    </button>
  );
}
