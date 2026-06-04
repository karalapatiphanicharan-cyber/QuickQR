import React, { useState, useEffect, useRef } from 'react';
import { generateQRCode } from '../lib/qr';
import { validateUrl, formatFileSize } from '../utils/fileHelpers';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';
import { Tabs } from './ui/Tabs';
import { QrCode, Link as LinkIcon, FileText, Image as ImageIcon, Download, Maximize, Upload, RefreshCw, X } from 'lucide-react';
import { toPng } from 'html-to-image';

const QR_SIZES = [256, 512, 768, 1024];

export const QRGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [qrColor, setQrColor] = useState('#adc6ff');
  const [bgColor, setBgColor] = useState('#0c1324');
  const [size, setSize] = useState(512);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const qrRef = useRef<HTMLDivElement>(null);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    if (val && !validateUrl(val)) {
      setUrlError('Please enter a valid URL (e.g., https://example.com)');
    } else {
      setUrlError('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'pdf') {
      setPdfFile(file);
    } else {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const updateQR = async () => {
      let content = '';
      if (activeTab === 'text') content = text;
      else if (activeTab === 'url') content = url;
      else if (activeTab === 'pdf') content = pdfFile ? `PDF: ${pdfFile.name}` : '';
      else if (activeTab === 'image') content = imageFile ? `Image: ${imageFile.name}` : '';

      if (content) {
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
  }, [activeTab, text, url, pdfFile, imageFile, qrColor, bgColor, size]);

  const handleDownload = async () => {
    if (!qrRef.current) return;
    try {
      const dataUrl = await toPng(qrRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `quickqr-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="glass-card rounded-[32px] overflow-hidden grid lg:grid-cols-[1fr_400px]">
        {/* Left Panel: Controls */}
        <div className="p-8 lg:p-12 border-r border-white/10">
          <div className="mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">QR Configuration</h2>
            <Tabs
              tabs={[
                { id: 'text', label: 'Text', icon: <QrCode size={18} /> },
                { id: 'url', label: 'URL', icon: <LinkIcon size={18} /> },
                { id: 'pdf', label: 'PDF', icon: <FileText size={18} /> },
                { id: 'image', label: 'Image', icon: <ImageIcon size={18} /> },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>

          <div className="space-y-8">
            {/* Input Content */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-primary uppercase tracking-widest">Input Text</label>
                <Textarea
                  placeholder="Enter the text message here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-primary uppercase tracking-widest">Website URL</label>
                <Input
                  placeholder="https://example.com"
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                />
                {urlError && <p className="text-red-400 text-sm">{urlError}</p>}
              </div>
            )}

            {activeTab === 'pdf' && (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-primary uppercase tracking-widest">PDF Document</label>
                {!pdfFile ? (
                  <label className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5 flex flex-col items-center gap-2">
                    <Upload className="text-foreground/40" size={32} />
                    <p className="text-foreground/60">Click to upload or drag and drop PDF</p>
                    <input type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFileChange(e, 'pdf')} />
                  </label>
                ) : (
                  <div className="bg-surface-container p-4 rounded-xl border border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">{pdfFile.name}</p>
                        <p className="text-xs text-foreground/50">{formatFileSize(pdfFile.size)}</p>
                      </div>
                    </div>
                    <button onClick={() => setPdfFile(null)} className="text-foreground/40 hover:text-red-400">
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'image' && (
              <div className="space-y-4">
                <label className="block text-xs font-mono text-primary uppercase tracking-widest">Visual Asset</label>
                {!imageFile ? (
                  <label className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5 flex flex-col items-center gap-2">
                    <ImageIcon className="text-foreground/40" size={32} />
                    <p className="text-foreground/60">Upload image (PNG, JPG, SVG)</p>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'image')} />
                  </label>
                ) : (
                  <div className="space-y-4">
                    {imagePreview && (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-black/20" />
                        <button
                          onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-red-500/50 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm text-foreground/60 px-2">
                      <span>{imageFile.name}</span>
                      <span>{formatFileSize(imageFile.size)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Customization */}
            <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-xs font-mono text-foreground/50 uppercase">QR Color</label>
                <div className="flex items-center gap-3 bg-surface-container-highest p-2 rounded-lg border border-white/10">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-10 h-10 bg-transparent cursor-pointer rounded"
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
                    className="w-10 h-10 bg-transparent cursor-pointer rounded"
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
                        ? 'bg-primary/20 text-primary border border-primary/50'
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

          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div
              ref={qrRef}
              className="relative w-64 h-64 lg:w-80 lg:h-80 glass-card rounded-[24px] p-6 flex items-center justify-center shadow-2xl"
              style={{ backgroundColor: bgColor }}
            >
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code" className="w-full h-full qr-pulse" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-foreground/20">
                  <QrCode size={64} strokeWidth={1} />
                  <p className="text-xs font-mono uppercase tracking-tighter">Waiting for input...</p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full space-y-4">
            <Button
              className="w-full gap-2"
              disabled={!qrDataUrl}
              onClick={handleDownload}
            >
              <Download size={20} />
              Download PNG
            </Button>
            <Button variant="secondary" className="w-full gap-2" disabled={!qrDataUrl}>
              <Maximize size={20} />
              View Fullscreen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
