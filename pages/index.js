import Image from "next/image";
export default function Home({ title, description }) {
  return (
    <div className="bg-laborers bg-cover">
      <div className="relative h-screen w-screen">
        <Image
          priority={true}
          src="/crowd.png"
          alt=""
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute top-0 flex h-screen w-full flex-col items-center justify-center space-y-6 bg-black bg-opacity-90 p-10 text-center text-white">
          <Image
            alt="DC Music Live logo"
            src="/logo.png"
            width={100}
            height={100}
            quality={100}
            layout="fixed"
            className=""
          />
          <h1 className="mt-0 max-w-4xl self-center font-sans text-6xl font-extrabold antialiased">
            {title}
          </h1>
          <h2 className="mt-6 max-w-4xl self-center text-2xl font-bold antialiased">
            {description}
          </h2>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      title: query.title || "dcmusic.live",
      description: query.description || "",
    },
  };
}
