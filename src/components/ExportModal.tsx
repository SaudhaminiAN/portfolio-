import React, { useState } from 'react';
import { PortfolioConfig } from '../types/portfolio';
import { X, Copy, Check, Download, Code, FileJson } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'html' | 'json'>('html');
  const [copied, setCopied] = useState(false);

  const generateHTML = (): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.siteTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    h1, h2, h3, .font-display { font-family: 'Outfit', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
  <!-- Top Navigation (Zone 1: Wordmark, Zone 2: Links, Zone 3: Action) -->
  <header class="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
      <a href="#" class="text-lg font-bold tracking-tight font-display text-neutral-900 whitespace-nowrap">${config.siteTitle}</a>
      <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
        <a href="#projects" class="hover:text-neutral-900 transition-colors whitespace-nowrap">Works</a>
        <a href="#about" class="hover:text-neutral-900 transition-colors whitespace-nowrap">About</a>
        <a href="#contact" class="hover:text-neutral-900 transition-colors whitespace-nowrap">Contact</a>
      </nav>
      <a href="#contact" class="px-4 py-2 text-xs font-medium text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap">Get in Touch</a>
    </div>
  </header>

  <main class="max-w-6xl mx-auto px-6 py-12">
    <!-- Built with Portfolio Studio -->
    ${config.sections.map((sec) => `<!-- Section: ${sec.type} -->\n    <div class="py-12 border-b border-neutral-100">\n      <!-- ${sec.type} content -->\n    </div>`).join('\n\n    ')}
  </main>
</body>
</html>`;
  };

  const getExportContent = () => {
    if (activeTab === 'html') {
      return generateHTML();
    }
    return JSON.stringify(config, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const blob = new Blob([content], {
      type: activeTab === 'html' ? 'text/html' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab === 'html' ? 'portfolio.html' : 'portfolio-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Export Portfolio
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Copy production-ready HTML code or download your portfolio data
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-4 flex items-center justify-between">
          <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'html'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Standalone HTML</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'json'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Portfolio JSON Backup</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Preview */}
        <div className="p-6 overflow-hidden flex-1 flex flex-col">
          <pre className="w-full flex-1 p-4 rounded-xl bg-neutral-900 text-neutral-200 text-xs font-mono overflow-auto leading-relaxed border border-neutral-800 select-all">
            {getExportContent()}
          </pre>
        </div>
      </div>
    </div>
  );
};
