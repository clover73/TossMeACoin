import Head from 'next/head';

const custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - This page doesn&apos;t exist</title>
      </Head>
      <main className="flex items-center justify-center min-h-[80vh] m-4">
        <h1 className="text-5xl md:text-7xl text-center font-extrabold leading-tighter tracking-tighter mb-4">
          404
        </h1>
      </main>
    </>
  );
};

export default custom404;
