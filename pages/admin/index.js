import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const handleNavigation = (action) => {
    router.push(`${action}`);
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className}`}
    >
      Admin
    </div>
  );
}
