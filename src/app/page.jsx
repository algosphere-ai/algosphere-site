
"use client";

import CodeRunner from "@/components/code-runner";
import StepperDialog from "@/components/stepper";
import { TypeWriter } from "@/components/type-writer";
import { useEffect } from "react";

const Page = () => {

  useEffect(() => {
    const tutModal = document.getElementById('tut-modal');
    tutModal.showModal();
  }, []);

  return (
    <main className="min-h-screen w-screen bg-darkgrey flex flex-col items-center">
      <StepperDialog />
      <nav className="w-[90vw] flex items-center md:gap-12 justify-between py-3 px-5 rounded-lg bg-lightgrey border border-gray-300/10 my-6 drop-shadow-xl">
        <div className="flex items-center gap-4">
          <img src="/algosphere.png" alt="Algosphere" className="w-8 h-8 rounded-full" />
          <h1 className="text-xl font-bold text-white/80">AlgoSphere</h1>
        </div>
        <div className="flex items-center md:gap-8 gap-4">
          <a href="https://algosphere.gitbook.io/algosphere-framework" className="text-white/80 hover:text-white font-medium md:text-lg text-base">Docs</a>
          <a href="https://github.com/algosphere-ai" className="text-white/80 hover:text-white font-medium md:text-lg text-base">Github</a>
          <a href="#" className="text-white/80 hover:text-white font-medium md:text-lg text-base">Twitter</a>
        </div>
        <a href="https://algosphere.gitbook.io/algosphere-framework">
          <button className="bg-lime-400 text-black/80 font-semibold text-base px-3 py-1.5 rounded-full">
            Build
          </button>
        </a>
      </nav>

      <section className="flex flex-col items-center gap-4 w-full py-32">
        <h1 className="lg:text-6xl md:text-5xl text-4xl font-bold text-white md:max-w-4xl max-w-[80vw] text-center">Your AI-driven <span className="text-lime-400">CLI companion</span> on Solana.</h1>
        <p className="md:text-lg text-base text-white/60 md:max-w-2xl max-w-[80vw] text-center mt-4">
          Empower your development with an open-source CLI tool that lets you design, build, and interact with AI agents on Solana. The AlgoSphere Framework serves as your collaborative assistant, while the API streamlines communication with your custom-built agents.
        </p>
        <code className="md:text-lg text-base text-white/60 bg-lightgrey rounded-lg py-2 px-4 mt-8 drop-shadow-lg">
          <TypeWriter text={"Build with Algo Sphere..."} />
        </code>
      </section>

      <section className="w-full py-16 flex flex-col items-center gap-4">
        <h2 className="text-xl text-white/80 font-semibold">
          Test Out The AlgoSphere API
        </h2>
        <CodeRunner />
      </section>

      <footer className="bg-lightgrey w-full flex flex-col justify-center items-center mt-24">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 w-full lg:max-w-6xl md:max-w-4xl mx-auto py-12 px-8 gap-16">
          <div className="flex flex-col gap-4 w-full lg:col-span-1 md:col-span-2">
            <h2 className="text-lg text-white/80 font-medium">AlgoSphere Framework</h2>
            <p className="text-sm text-white/60">
              Empower your development with an open-source CLI tool that lets you design, build, and interact with AI agents on Solana. The AlgoSphere Framework serves as your collaborative assistant, while the API streamlines communication with your custom-built agents.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg text-white/80 font-medium">Products</h2>
            <a href="https://algosphere.gitbook.io/algosphere-framework">
              <p className="text-sm text-white/60">Docs</p>
            </a>
            <a href="#">
              <p className="text-sm text-white/60">API</p>
            </a>
            <a href="https://github.com/algosphere-ai">
              <p className="text-sm text-white/60">Framework</p>
            </a>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-lg text-white/80 font-medium">Socials</h2>
            <a href="https://github.com/algosphere-ai">
              <p className="text-sm text-white/60">Github</p>
            </a>
            <a href="#">
              <p className="text-sm text-white/60">Twitter</p>
            </a>
            <a href="#">
              <p className="text-sm text-white/60">Telegram</p>
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 w-full py-4 text-center">
          <p className="text-sm text-white/60">© 2025 Algo Sphere. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default Page;