import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UploadFile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

const handleProcess = async () => {
  console.log("🚀 ~ handleProcess ~ selectedFile:", selectedFile)
  if (!selectedFile) return;

  setProcessing(true);
  
  try {
    // สร้าง FormData สำหรับส่งไฟล์แบบ multipart/form-data
    const formData = new FormData();
    formData.append('file', selectedFile); // ชื่อ parameter ต้องเป็น 'file' ตามที่ API ต้องการ
    formData.append('language', 'tha+eng'); // เพิ่ม parameter language ตามที่ API ต้องการ
    
    // ส่งข้อมูลไปยัง API โดยใช้ multipart/form-data
    const response = await axios.post('http://localhost:5000/api/Ocr/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Handle the response
    console.log("API response:", response.data);
    setResult(response.data.extractedText || 'No text extracted');
  } catch (error) {
    console.error("Error processing document:", error);
    setResult(`Error processing document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  } finally {
    setProcessing(false);
  }
};

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setResult('');
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Upload Document</h1>
          <button
            onClick={handleBackToDashboard}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {!result ? (
            <div className="space-y-6">
              {/* Upload Area */}
              <div className="card p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Select Document for OCR Processing</h2>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-600 hover:border-primary-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    
                    {selectedFile ? (
                      <div className="space-y-2">
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-white font-medium">
                          Drop your file here, or{' '}
                          <button
                            onClick={handleUploadClick}
                            className="text-primary-500 underline hover:text-primary-400"
                          >
                            browse
                          </button>
                        </p>
                        <p className="text-gray-400 text-sm">
                          Supports: JPG, PNG, PDF (Max size: 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />

                {selectedFile && (
                  <div className="flex justify-center space-x-4 mt-6">
                    <button
                      onClick={resetUpload}
                      className="btn-secondary"
                    >
                      Remove File
                    </button>
                    <button
                      onClick={handleProcess}
                      disabled={processing}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processing ? 'Processing...' : 'Start OCR Processing'}
                    </button>
                  </div>
                )}
              </div>

              {/* Processing Status */}
              {processing && (
                <div className="card p-6">
                  <div className="flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <div>
                      <p className="text-white font-medium">Processing your document...</p>
                      <p className="text-gray-400 text-sm">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-white mb-4">OCR Results</h2>
                <div className="bg-dark-700 rounded-lg p-4">
                  <pre className="text-gray-300 whitespace-pre-wrap text-sm">{result}</pre>
                </div>
                <div className="flex justify-center space-x-4 mt-6">
                  <button
                    onClick={resetUpload}
                    className="btn-secondary"
                  >
                    Upload Another File
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(result)}
                    className="btn-primary"
                  >
                    Copy Text
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadFile;