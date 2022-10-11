import Image from "next/image"

const Home = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center mb-64">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-5">Web3 Boilerplate</h1>
            <Image src="/logo_circle.png" width={120} height={120} className="rounded" />

            <p className="py-6">
              A collection of scripts and templates to kickoff a web3 project
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
