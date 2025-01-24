"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const videoUrls = [
    "",
    "",
    ""
]

const StepperDialog = () => {

    const router = useRouter();

    const [tutorial, setTutorial] = useState(false);
    const [step, setStep] = useState(0);

    const finishTutorial = () => {
        setTutorial(true);
    }

    const getStarted = () => {
        router.push("https://github.com/algosphere-ai");
    }

    return (
        <dialog className="modal" id='tut-modal'>
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-5 text-white">✕</button>
                </form>
                <h3 className="font-bold text-lg text-white">{tutorial ? "Let's start building your agent using AlgoSphere!" : "Welcome to AlgoSphere Framework."}</h3>
                {
                    tutorial ? <div className="flex flex-col items-center justify-center">
                        <button className="bg-lime-400 text-black/80 font-semibold text-base px-3 py-1.5 rounded-lg mt-4" onClick={() => getStarted()}>
                            Get Started
                        </button>
                    </div> :

                        <div className="flex flex-col items-center justify-center mt-4">
                            <ul className='steps' data-theme="dim">
                                <li className={`step ${step >= 0 ? 'step-primary' : ''}`}>
                                    Initial Configuration
                                </li>
                                <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
                                    OnChain Deployment
                                </li>
                                <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
                                    Interacting With Agent
                                </li>
                            </ul>
                            <iframe width={"100%"} className={`aspect-video mt-6 ${step == 0 ? "block" : "hidden"}`} src={videoUrls[0]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <iframe width={"100%"} className={`aspect-video mt-6 ${step == 1 ? "block" : "hidden"}`} src={videoUrls[1]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            <iframe width={"100%"} className={`aspect-video mt-6 ${step == 2 ? "block" : "hidden"}`} src={videoUrls[2]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            {
                                step === 0 ?
                                    <div className="flex pt-4 justify-end w-full">
                                        <button onClick={() => setStep(1)} className='btn btn-primary'>
                                            Next
                                        </button>
                                    </div>
                                    : step === 1 ?
                                        <div className="flex pt-4 justify-between w-full">
                                            <button onClick={() => setStep(0)} className='btn btn-accent'>
                                                Prev
                                            </button>
                                            <button onClick={() => setStep(2)} className='btn btn-primary'>
                                                Next
                                            </button>
                                        </div>
                                        : step === 2 ?
                                            <div className="flex pt-4 justify-between w-full">
                                                <button onClick={() => setStep(1)} className='btn btn-accent'>
                                                    Prev
                                                </button>
                                                <button onClick={() => finishTutorial()} className='btn btn-success'>
                                                    Finish
                                                </button>
                                            </div>
                                            : null
                            }
                        </div>
                }
            </div>
        </dialog>
    );
}

export default StepperDialog;