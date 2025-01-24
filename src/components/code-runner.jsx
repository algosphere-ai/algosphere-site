"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Terminal } from 'lucide-react';
import { Copy, Check, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const codeExamples = [
    {
      method: 'GET',
      url: 'https://api.algosphereai.xyz/api/get-agent/',
      code: 'curl https://api.algosphereai.xyz/api/get-agent/Algo',
      description: 'Fetch details about an agent'
    },
    {
      method: 'POST',
      url: 'https://api.algosphereai.xyz/api/interact/',
      code: `curl -X POST "https://api.algosphereai.xyz/api/interact/Algo" \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Hello!"}'`,
      description: 'Interact with an agent'
    }
  ]

const CodeRunner = () => {
    const [activeTab, setActiveTab] = useState('get')
    const [output, setOutput] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [getAgentName, setGetAgentName] = useState('Algo')
    const [postAgentName, setPostAgentName] = useState('Algo')
    const [message, setMessage] = useState('Hello!')

    const handleRun = async (method, baseUrl) => {
        setIsLoading(true)
        setOutput('Fetching response...')
        try {
            let response;
            const agentName = method === 'GET' ? getAgentName : postAgentName
            const url = `${baseUrl}${agentName}`

            if (method === 'GET') {
                response = await fetch(url)
            } else if (method === 'POST') {
                response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                })
            }

            if (response.status === 404) {
                setOutput("Agent doesn't exist in database")
                return
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setOutput(JSON.stringify(data, null, 2))
        } catch (error) {
            console.error('Error:', error)
            setOutput(`Error: ${error.message}`)
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
      }

    const getUpdatedCode = (method) => {
        if (method === 'GET') {
            return `curl https://api.algosphereai.xyz/api/get-agent/${getAgentName}`
        } else {
            return `curl -X POST "https://api.algosphereai.xyz/api/interact/${postAgentName}" \\
    -H "Content-Type: application/json" \\
    -d '{"message": "${message}"}'`
        }
    }

    return (
        <div className="w-full md:w-1/2 bg-darkgrey rounded-lg shadow-lg border border-lightgrey p-2">
            <Tabs defaultValue="get" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                <TabsList className="grid w-full grid-cols-2 bg-lightgrey">
                    <TabsTrigger
                        value="get"
                        className="data-[state=active]:bg-darkgrey data-[state=active]:shadow-sm text-sm py-1.5 text-white data-[state=active]:text-white"
                    >
                        GET Example
                    </TabsTrigger>
                    <TabsTrigger
                        value="post"
                        className="data-[state=active]:bg-darkgrey data-[state=active]:shadow-sm text-sm py-1.5 text-white data-[state=active]:text-white"
                    >
                        POST Example
                    </TabsTrigger>
                </TabsList>
                {codeExamples.map((example) => (
                    <TabsContent key={example.method.toLowerCase()} value={example.method.toLowerCase()} className="p-2">
                        <div className="flex flex-col gap-1.5">
                            <div className="w-full">
                                <h3 className="text-sm font-medium mb-1.5 flex items-center text-gray-200">
                                    <Terminal className="mr-1.5 h-4 w-4 text-gray-200" />
                                    {example.description}
                                </h3>
                                <div className="space-y-2">
                                    <div>
                                        <label className="block text-[11px] font-medium text-gray-400 mb-1" htmlFor={`${example.method.toLowerCase()}-agent-name`}>
                                            Agent Name
                                        </label>
                                        <Input
                                            id={`${example.method.toLowerCase()}-agent-name`}
                                            type="text"
                                            value={example.method === 'GET' ? getAgentName : postAgentName}
                                            onChange={(e) => example.method === 'GET' ? setGetAgentName(e.target.value) : setPostAgentName(e.target.value)}
                                            placeholder="Enter agent name"
                                            className="w-full h-8 text-xs bg-lightgrey rounded-md text-white border-none"
                                        />
                                    </div>
                                    {example.method === 'POST' && (
                                        <div>
                                            <label className="block text-[11px] font-medium text-gray-300 mb-1" htmlFor="post-message">
                                                Message
                                            </label>
                                            <Input
                                                id="post-message"
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Enter message"
                                                className="w-full h-8 text-xs bg-lightgrey rounded-md text-white border-none"
                                            />
                                        </div>
                                    )}
                                    <div className="bg-lightgrey p-1.5 rounded-md relative">
                                        <SyntaxHighlighter
                                            language="bash"
                                            style={a11yDark}
                                            customStyle={{
                                                backgroundColor: 'transparent',
                                                padding: '0',
                                                margin: '0',
                                                fontSize: '14px',
                                                background: 'transparent',
                                            }}
                                        >
                                            {getUpdatedCode(example.method)}
                                        </SyntaxHighlighter>
                                        <button
                                            onClick={() => copyToClipboard(getUpdatedCode(example.method))}
                                            className="absolute top-1 right-1 p-1 rounded-md bg-darkgrey shadow-sm text-gray-200 hover:text-gray-300 transition-colors"
                                            aria-label="Copy to clipboard"
                                        >
                                            {isCopied ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    <Button
                                        onClick={() => handleRun(example.method, example.url)}
                                        className="w-full h-8 text-sm bg-primarylime rounded-md text-white border-none"
                                        style={{
                                            color: 'black',
                                        }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Running...' : `Run ${example.method}`}
                                        {!isLoading && (example.method === 'GET' ? <ArrowRight className="ml-1.5 h-3 w-3" /> : <Send className="ml-1.5 h-3 w-3" />)}
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="text-sm font-medium mb-1.5 flex items-center text-gray-200">
                                    <Terminal className="mr-1.5 h-4 w-4 text-gray-200" />
                                    Output
                                </h3>
                                <div className="bg-lightgrey p-1.5 rounded-md overflow-y-auto " style={{ height: '80px' }}>
                                    <SyntaxHighlighter
                                        language="json"
                                        style={a11yDark}
                                        customStyle={{
                                            backgroundColor: 'transparent',
                                            padding: '0',
                                            margin: '0',
                                            fontSize: '14px',
                                            background: 'transparent',
                                        }}
                                    >
                                        {output || 'Output will appear here after running the request.'}
                                    </SyntaxHighlighter>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default CodeRunner;