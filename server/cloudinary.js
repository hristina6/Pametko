import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dqoagqbsr', // Replace with your Cloudinary cloud name
  api_key: '471881198362383',       // Replace with your API key
  api_secret: '-TC8LKzMGdYiLATKHWkXO8lWVio', // Replace with your API secret
  secure: true
});

/**
 * Uploads a base64 image to Cloudinary
 * @param {string} base64Image - The base64 encoded image (with or without data URL prefix)
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<Object>} - Cloudinary upload response
 */
export async function uploadImage(base64Image, folder = 'uiktp-answers') {
  try {
    // Make sure we have a clean base64 string without data:image/xyz prefix
    let imageToUpload = base64Image;
    
    // If the image data is already a complete data URL (starts with data:image)
    if (base64Image.startsWith('data:image')) {
      // Pass it directly to Cloudinary
      imageToUpload = base64Image;
    } else if (base64Image.includes('base64,')) {
      // If it has the base64 marker but doesn't start with data:image
      imageToUpload = base64Image.split('base64,')[1];
      imageToUpload = `data:image/png;base64,${imageToUpload}`;
    } else {
      // Plain base64 string without prefix
      imageToUpload = `data:image/png;base64,${base64Image}`;
    }
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      imageToUpload,
      {
        folder: folder,
        resource_type: 'image'
      }
    );
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

export default cloudinary;
