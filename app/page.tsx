import { Passport } from "@/components/Passport"
import { PassportProvider } from "@/context/PassportContext"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">My Virtual Passport</h1>
      <PassportProvider>
        <Passport />
      </PassportProvider>
    </main>
  );
}
