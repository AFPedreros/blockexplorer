<h1>Ethereum Block Explorer</h1>
<p>This is a simple Ethereum block explorer built with React that allows users to navigate through blocks and view the transactions within them.</p>
<h2>Getting Started</h2>
<pre><div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg></button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre-wrap hljs language-bash">git <span class="hljs-built_in">clone</span> https://github.com/&lt;your-username&gt;/ethereum-block-explorer.git
<span class="hljs-built_in">cd</span> ethereum-block-explorer
yarn
</code></div></div></pre>
<p>Then, start the development server:</p>
<div class="bg-black mb-4 rounded-md"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans"><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre-wrap hljs language-bash">yarn start
</code></div></div>
<p>The block explorer should now be running at <a href="http://localhost:3000/" target="_new">http://localhost:3000/</a>.</p>
<h2>Features</h2>
<ul><li>View block information (block number, number of transactions, gas used)</li><li>Navigate through blocks using the "Previous" and "Next" buttons</li><li>View the transactions within a block by clicking the "Show Transactions" button</li><li>Hide the transactions by clicking the button again</li></ul>
<h2>Dependencies</h2>
<ul><li>React</li><li>Alchemy API (<a href="https://alchemyapi.io/" target="_new">https://alchemyapi.io/</a>)</li><li>ethers (<a href="https://github.com/ethers-io/ethers.js/" target="_new">https://github.com/ethers-io/ethers.js/</a>)</li></ul>
