
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, UploadCloud, File, X, Loader2, CheckCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

type FileUpload = {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
};

type Step3Props = {
  onNext: (data: { attachments: File[] }) => void;
  onBack: () => void;
  formData: any;
};

export function Step3Attachments({ onNext, onBack, formData }: Step3Props) {
  const [attachments, setAttachments] = useState<FileUpload[]>(formData.attachments || []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newUploads: FileUpload[] = files.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      progress: 0,
      status: 'uploading',
    }));

    setAttachments(prev => [...prev, ...newUploads]);
    
    // Simulate upload progress
    newUploads.forEach(upload => {
      const interval = setInterval(() => {
        setAttachments(prev => prev.map(u => 
          u.id === upload.id 
            ? { ...u, progress: Math.min(u.progress + 10, 100) } 
            : u
        ));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setAttachments(prev => prev.map(u => 
          u.id === upload.id 
            ? { ...u, status: 'completed', progress: 100 } 
            : u
        ));
      }, 2100);
    });
  };

  const removeFile = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };
  
  const handleNext = () => {
    onNext({ attachments: attachments.filter(a => a.status === 'completed').map(a => a.file) });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6 p-1">
        <div>
          <h3 className="text-lg font-medium">Supporting Documents</h3>
          <p className="text-sm text-muted-foreground">
            Upload any relevant documents, such as proposals, budgets, or official memos.
          </p>
        </div>

        <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-base text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, or PNG (MAX. 5MB each)</p>
                </div>
                <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
            </label>
        </div> 

        {attachments.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Uploaded Files</h4>
            <AnimatePresence>
              {attachments.map(attachment => (
                <motion.div
                  key={attachment.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-4 rounded-lg border p-3"
                >
                  <File className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold truncate max-w-xs">{attachment.file.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${attachment.progress}%` }}></div>
                      </div>
                      {attachment.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin" />}
                      {attachment.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(attachment.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <CardFooter className="flex justify-between p-0">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <Button type="button" variant="gradient" onClick={handleNext}>
          Next: Review <ArrowRight className="ml-2" />
        </Button>
      </CardFooter>
    </div>
  );
}
