import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Image as ImageIcon, Play, Download, Loader2 } from 'lucide-react';
import { useVideoGeneration } from '../hooks/useVideoGeneration';
import { toast } from 'react-hot-toast';

export const VideoGenerationModal = ({
  isOpen,
  onClose,
  selectedEffect,
  effectName,
}) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState(5);
  const [inputType, setInputType] = useState('text');

  const {
    generateVideo,
    isGenerating,
    status,
    credits,
    fetchCredits,
    resetGeneration,
  } = useVideoGeneration();

  useEffect(() => {
    if (isOpen) {
      fetchCredits();
    }
  }, [isOpen, fetchCredits]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !image) {
      toast.error('Please provide either text or an image');
      return;
    }
    if (credits < 40) {
      toast.error('Insufficient credits');
      return;
    }
    try {
      await generateVideo({
        prompt: inputType === 'text' ? prompt : undefined,
        image: inputType === 'image' ? image || undefined : undefined,
        effect: selectedEffect,
        aspectRatio,
        duration,
      });
    } catch (error) {
      console.error('Generation failed:', error);
    }
  };

  const handleClose = () => {
    resetGeneration();
    setPrompt('');
    setImage(null);
    setImagePreview(null);
    onClose();
  };

  const getProgressText = () => {
    if (!status) return '';
    switch (status.status) {
      case 'pending':
        return 'Queuing your video...';
      case 'processing':
        return `Processing... ${status.progress || 0}%`;
      case 'completed':
        return 'Video ready!';
      case 'failed':
        return 'Generation failed';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white">Generate Video</h2>
                <p className="text-gray-400">Using {effectName} effect</p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Credits Info */}
            <div className="mb-6 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Available Credits</span>
                <span className="text-white font-semibold">{credits}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-gray-400 text-sm">This generation will cost</span>
                <span className="text-orange-400 font-semibold">40 credits</span>
              </div>
            </div>

            {/* Input Type Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => setInputType('text')}
                className={`flex-1 py-2 px-4 rounded-l-lg transition-colors ${
                  inputType === 'text'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Text Prompt
              </button>
              <button
                onClick={() => setInputType('image')}
                className={`flex-1 py-2 px-4 rounded-r-lg transition-colors ${
                  inputType === 'image'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Image Upload
              </button>
            </div>

            {/* Input Area */}
            <div className="mb-6">
              {inputType === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Describe your video
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to see in your video..."
                    className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload an image
                  </label>
                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-400 mb-4">Upload an image or drag and drop</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <Upload size={16} className="mr-2" />
                          Choose Image
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={e => setAspectRatio(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="1:1">1:1 (Square)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={e => setDuration(parseInt(e.target.value))}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value={3}>3 seconds</option>
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                </select>
              </div>
            </div>

            {/* Generation Status */}
            {status && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Status</span>
                  <span className="text-white font-semibold">{getProgressText()}</span>
                </div>
                {status.status === 'processing' && status.progress && (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${status.progress}%` }}
                    />
                  </div>
                )}
                {status.status === 'completed' && status.video_url && (
                  <div className="mt-4">
                    <video
                      src={status.video_url}
                      controls
                      className="w-full rounded-lg"
                    />
                    <div className="flex gap-2 mt-3">
                      <a
                        href={status.video_url}
                        download
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </a>
                      <button
                        onClick={() => {
                          // Add to projects logic here
                          toast.success('Video saved to projects');
                        }}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save to Projects
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!prompt && !image) || credits < 40}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-2" />
                    Generate Video
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
