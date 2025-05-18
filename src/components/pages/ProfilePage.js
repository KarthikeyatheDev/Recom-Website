import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { FaEdit } from 'react-icons/fa'; // Import an edit icon
import './Profile.css'; // Make sure you have updated CSS

// Helper function to create cropped image from pixel crop area
async function getCroppedImg(imageSrc, cropPixels, zoom) {
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', (error) => reject(error));
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const diameter = 200;
  canvas.width = diameter;
  canvas.height = diameter;

  const cropCanvas = document.createElement('canvas');
  const cropCtx = cropCanvas.getContext('2d');

  cropCanvas.width = cropPixels.width;
  cropCanvas.height = cropPixels.height;

  cropCtx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height
  );

  ctx.beginPath();
  ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(cropCanvas, 0, 0, diameter, diameter);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      blob.name = 'cropped.png';
      const fileUrl = window.URL.createObjectURL(blob);
      resolve({ blob, fileUrl });
    }, 'image/png');
  });
}

export default function ProfilePage() {
  const defaultPfp = "/assets/nopfp.jpg";
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('profilePic') || defaultPfp;
  });

  useEffect(() => {
    localStorage.setItem('profilePic', profilePic);
  }, [profilePic]);

  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Basic profile fields state
  const [name, setName] = useState('John Doe'); // Example default value
  const [email, setEmail] =useState('john.doe@example.com'); // Example default value
  const [bio, setBio] = useState('A short bio about the user.'); // Example default value
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    bio: false,
  });

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };
  const removeProfilePic = () => {
    setProfilePic(defaultPfp);
    localStorage.removeItem('profilePic');

    // Notify other components like Header.js
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'profilePic',
      newValue: defaultPfp
    }));
  };

  const readFile = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsDataURL(file);
    });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, zoom);
      setProfilePic(croppedImage.fileUrl);
      localStorage.setItem('profilePic', croppedImage.fileUrl);

      // 🔁 Notify other components like Header.js
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'profilePic',
        newValue: croppedImage.fileUrl
      }));

      setShowModal(false);
      setImageSrc(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setCroppedAreaPixels(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, zoom]);

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'bio':
        setBio(value);
        break;
      default:
        break;
    }
  };

  const handleSaveProfile = () => {
    // In a real application, you would send this data to your backend
    console.log('Saving profile data:', { name, email, bio });
    setIsEditing({ name: false, email: false, bio: false });
    // You might want to provide user feedback here (e.g., a success message)
  };

  return (
    <main className="profile-container">
      <h2>User Profile</h2>

      <div className="profile-grid">
        <div className="profile-pic-section">
          <div className="pfp-wrapper">
            <img src={profilePic} alt="Profile" className="profile-pic" onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/nopfp.jpg'; // fallback image
            }} />
            <div className="pfp-controls">
              <button onClick={() => setShowModal(true)} className="edit-pfp-btn">
                Edit Profile Picture
              </button>
              <button onClick={removeProfilePic} className="remove-pfp-btn">
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-field">
            <label>Name:</label>
            {isEditing.name ? (
              <input
                type="text"
                value={name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            ) : (
              <span>{name}</span>
            )}
            {!isEditing.name && (
              <button className="edit-icon-btn" onClick={() => handleEditClick('name')}>
                <FaEdit />
              </button>
            )}
          </div>

          <div className="profile-field">
            <label>Email:</label>
            {isEditing.email ? (
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
            ) : (
              <span>{email}</span>
            )}
            {!isEditing.email && (
              <button className="edit-icon-btn" onClick={() => handleEditClick('email')}>
                <FaEdit />
              </button>
            )}
          </div>

          <div className="profile-field bio-field">
            <label>Bio:</label>
            {isEditing.bio ? (
              <textarea
                value={bio}
                onChange={(e) => handleInputChange(e, 'bio')}
              />
            ) : (
              <span>{bio}</span>
            )}
            {!isEditing.bio && (
              <button className="edit-icon-btn" onClick={() => handleEditClick('bio')}>
                <FaEdit />
              </button>
            )}
          </div>

          <button className="save-profile-btn" onClick={handleSaveProfile}>
            Save Profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Crop Your Profile Picture</h3>
            {!imageSrc ? (
              <>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <button className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="cropper-container">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    zoomSpeed={0.1}
                  />
                </div>

                <div className="controls">
                  <label>Zoom:</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                  />
                </div>

                <div className="modal-buttons">
                  <button className="save-btn" onClick={saveCroppedImage}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}