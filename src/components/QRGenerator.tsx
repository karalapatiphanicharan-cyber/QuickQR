import React, { useState, useEffect, useRef } from 'react';
import { generateQRCode } from '../lib/qr';
import { validateUrl } from '../utils/fileHelpers';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';
import { Tabs } from './ui/Tabs';
import { QrCode, Link as LinkIcon, Download, Maximize, X } from 'lucide-react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';

const QR_SIZES = [256, 512, 768, 1024];

export const QRGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const [qrColor, setQrColor] = useState('#adc6ff');
  const [bgColor, setBgColor] = useState('#0c1324');
  const [size, setSize] = useState(512);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    if (val && !validateUrl(val)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
    } else {
      setUrlError('');
    }
  };

  useEffect(() => {
    const updateQR = async () => {
      let content = '';
      if (activeTab === 'text') content = text;
      else if (activeTab === 'url') content = url;

      if (content && (activeTab !== 'url' || !urlError)) {
        try {
          const dataUrl = await generateQRCode({
            text: content,
            color: qrColor,
            backgroundColor: bgColor,
            size: size
          });
          setQrDataUrl(dataUrl);
        } catch (err) {
          console.error(err);
        }
      } else {
        setQrDataUrl('');
      }
    };

    updateQR();
  }, [activeTab, text, url, urlError, qrColor, bgColor, size]);

  const handleDownload = async () => {
    if (!qrRef.current || !qrDataUrl) return;
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true, width: size, height: size });
      const link = document.createElement('a');
      link.download = `quickqr-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-6 mb-24"
    >
      <div className="glass-card rounded-[32px] overflow-hidden grid lg:grid-cols-[1fr_400px]">
        {/* Left Panel: Controls */}
        <div className="p-8 lg:p-12 border-r border-white/10">
          <div className="mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">QR Configuration</h2>
            <Tabs
              tabs={[
                { id: 'text', label: 'Text', icon: <QrCode size={18} /> },
                { id: 'url', label: 'URL', icon: <LinkIcon size={18} /> },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'text' ? (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <label className="block text-xs font-mono text-primary uppercase tracking-widest">Input Text</label>
                  <Textarea
                    placeholder="Enter the text message here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="url"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-4"
                >
                  <label className="block text-xs font-mono text-primary uppercase tracking-widest">Website URL</label>
                  <Input
                    placeholder="https://example.com"
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                  />
                  {urlError && <p className="text-red-400 text-sm">{urlError}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-mono text-foreground/50 uppercase">QR Color</label>
                <div className="flex items-center gap-3 bg-surface-container-highest p-2 rounded-lg border border-white/10">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 bg-transparent cursor-pointer rounded border-none"
                  />
                  <span className="text-sm font-mono">{qrColor}</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-mono text-foreground/50 uppercase">Background</label>
                <div className="flex items-center gap-3 bg-surface-container-highest p-2 rounded-lg border border-white/10">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 bg-transparent cursor-pointer rounded border-none"
                  />
                  <span className="text-sm font-mono">{bgColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-xs font-mono text-foreground/50 uppercase">Resolution (PX)</label>
              <div className="grid grid-cols-4 gap-2">
                {QR_SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 rounded-lg text-sm font-mono transition-all ${
                      size === s
                        ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.4)]'
                        : 'bg-white/5 text-foreground/40 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div className="bg-surface-container/30 p-8 lg:p-12 flex flex-col items-center justify-center gap-10">
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">Live Preview</h3>
            <p className="text-sm text-foreground/40">Updates automatically</p>
          </div>

          <motion.div
            className="relative group"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div
              ref={qrRef}
              className="relative w-64 h-64 lg:w-80 lg:h-80 glass-card rounded-[24px] p-6 flex items-center justify-center bg-white shadow-2xl qr-glow"
              style={{ backgroundColor: bgColor }}
            >
              {qrDataUrl ? (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={qrDataUrl}
                  alt="QR Code"
                  className="w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-foreground/20">
                  <QrCode size={64} strokeWidth={1} />
                  <p className="text-xs font-mono uppercase tracking-tighter">Waiting for input...</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="w-full space-y-4">
            <Button
              className="w-full gap-2 hover:scale-[1.02] active:scale-[0.98]"
              disabled={!qrDataUrl}
              onClick={handleDownload}
            >
              <Download size={20} />
              Download PNG
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2 hover:scale-[1.02] active:scale-[0.98]"
              disabled={!qrDataUrl}
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize size={20} />
              View Fullscreen
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full aspect-square glass-card p-8 rounded-[32px] flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
              <img src={qrDataUrl} alt="QR Code Fullscreen" className="w-full h-full qr-glow" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
