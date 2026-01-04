import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ZoomIn, ZoomOut, RotateCcw, Check, X } from 'lucide-react';

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleDone = async () => {
        try {
            const croppedImage = await getCroppedImg(image, croppedAreaPixels);
            onCropComplete(croppedImage);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl aspect-square relative rounded-2xl overflow-hidden border-2 border-emerald-500/30">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={onCropChange}
                    onCropComplete={onCropCompleteCallback}
                    onZoomChange={onZoomChange}
                />
            </div>

            <div className="mt-8 bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md space-y-6">
                <div className="flex items-center gap-4">
                    <ZoomOut className="text-white w-5 h-5" />
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby="Zoom"
                        onChange={(e) => setZoom(e.target.value)}
                        className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <ZoomIn className="text-white w-5 h-5" />
                </div>

                <div className="flex justify-between gap-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" /> Cancel
                    </button>
                    <button
                        onClick={handleDone}
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 font-bold shadow-lg shadow-emerald-600/20"
                    >
                        <Check className="w-4 h-4" /> Scan Selection
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper function to create the cropped image
async function getCroppedImg(imageSrc, pixelCrop) {
    const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (error) => reject(error));
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = imageSrc;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg');
}

export default ImageCropper;
