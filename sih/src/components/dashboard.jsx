import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Clock, Building, X } from 'lucide-react';
import { FaFlask } from 'react-icons/fa'; // Flask icon from react-icons
import "./dashboard.css";

const MultiModelDashboard = () => {
  // State for each model's specific uploads and results
  const [staticDataModel, setStaticDataModel] = useState({
    uploadedFiles: [],
    results: null,
  });

  const [infrastructureAgeModel, setInfrastructureAgeModel] = useState({
    uploadedFiles: [],
    predictedAge: null,
    remainingLifespan: null,
  });

  const [infrastructureImageModel, setInfrastructureImageModel] = useState({
    uploadedImages: [], // Changed to match multiple images
    infraConditions: [],
  });

  const [labFacilitiesModel, setLabFacilitiesModel] = useState({
    uploadedFiles: [],
    results: null,
  });

  // Ref for file inputs
  const staticDataFileRef = useRef(null);
  const infrastructureAgeFileRef = useRef(null);
  const infrastructureImageFileRef = useRef(null);
  const labFacilitiesFileRef = useRef(null);

  // Generic file upload handler
  const handleFileUpload = (modelSetter, event) => {
    const files = Array.from(event.target.files);
    modelSetter((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }));
  };

  // Image upload handler for image-based model
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setInfrastructureImageModel((prev) => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, ...files],
    }));
  };

  // Remove file handler
  const removeFile = (modelSetter, index) => {
    modelSetter((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  const removeImage = (index) => {
    setInfrastructureImageModel((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
    }));
  };

  // Simulation of API calls for each model
  const runStaticDataModel = async () => {
    if (staticDataModel.uploadedFiles.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', staticDataModel.uploadedFiles[0]);

    try {
      const response = await fetch('http://localhost:3000/api/static-data-model', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze static data');
      }

      const result = await response.json();
      setStaticDataModel((prev) => ({
        ...prev,
        results: result,
      }));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const runInfrastructureAgeModel = async () => {
    if (infrastructureAgeModel.uploadedFiles.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', infrastructureAgeModel.uploadedFiles[0]);

    try {
      const response = await fetch('http://localhost:3000/api/infrastructure-age-model', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to predict infrastructure age');
      }

      const result = await response.json();
      setInfrastructureAgeModel((prev) => ({
        ...prev,
        predictedAge: result.predictedAge,
        remainingLifespan: result.remainingLifespan,
      }));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const runInfrastructureImageModel = async () => {
    if (infrastructureImageModel.uploadedImages.length === 0) {
      alert('Please upload an image first.');
      return;
    }

    const formData = new FormData();
    infrastructureImageModel.uploadedImages.forEach((image) =>
      formData.append('images', image)
    );

    try {
      const response = await fetch('http://localhost:3000/api/infrastructure-image-model', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze infrastructure images');
      }

      const result = await response.json();
      setInfrastructureImageModel((prev) => ({
        ...prev,
        infraConditions: result.results.map((res) => res.condition),
      }));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const runLabFacilitiesModel = async () => {
    if (labFacilitiesModel.uploadedFiles.length === 0) {
      alert('Please upload a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', labFacilitiesModel.uploadedFiles[0]);

    try {
      const response = await fetch('http://localhost:3000/api/lab-facilities-model', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze lab facilities');
      }

      const result = await response.json();
      setLabFacilitiesModel((prev) => ({
        ...prev,
        results: result,
      }));
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  // File upload section component
  const FileUploadSection = ({ files, fileRef, onUpload, onRemove, title, icon: Icon }) => (
    <div className="model-section">
      <h3>{title}</h3>
      <input
        type="file"
        ref={fileRef}
        onChange={onUpload}
        className="hidden-file-input"
        multiple
      />
      <button onClick={() => fileRef.current.click()} className="upload-button">
        <Icon className="mr-2" /> Upload Documents
      </button>
      {files.length > 0 && (
        <div className="uploaded-files">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <FileText className="file-icon" />
              <span>{file.name}</span>
              <button onClick={() => onRemove(index)} className="remove-file">
                <X />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">University Infrastructure Multi-Model Analysis</h1>
      {/* Static Data Model */}
      <div className="model-container">
        <h2>
          <Building className="model-icon" /> Static Data Infrastructure Model
        </h2>
        <FileUploadSection
          files={staticDataModel.uploadedFiles}
          fileRef={staticDataFileRef}
          onUpload={(e) => handleFileUpload(setStaticDataModel, e)}
          onRemove={(index) => removeFile(setStaticDataModel, index)}
          title="Static Data Upload"
          icon={FileText}
        />
        <button onClick={runStaticDataModel} className="analyze-button">
          Analyze Static Data
        </button>
        {staticDataModel.results && (
          <div className="model-results">
            <p>Complexity: {staticDataModel.results.complexity}</p>
            <p>Recommendation: {staticDataModel.results.recommendation}</p>
          </div>
        )}
      </div>

       {/* Infrastructure Age Model */}
       <div className="model-container">
        <h2>
          <Clock className="model-icon" /> 
          Infrastructure Age Prediction Model
        </h2>
        <FileUploadSection 
          files={infrastructureAgeModel.uploadedFiles}
          fileRef={infrastructureAgeFileRef}
          onUpload={(e) => handleFileUpload(setInfrastructureAgeModel, e)}
          onRemove={(index) => removeFile(setInfrastructureAgeModel, index)}
          title="Age Prediction Data Upload"
          icon={FileText}
        />
        <button 
          onClick={runInfrastructureAgeModel}
          className="analyze-button"
        >
          Predict Infrastructure Age
        </button>
        {infrastructureAgeModel.predictedAge && (
          <div className="model-results">
            <p>Predicted Age: {infrastructureAgeModel.predictedAge} years</p>
            <p>Remaining Lifespan: {infrastructureAgeModel.remainingLifespan} years</p>
          </div>
        )}
      </div>

      {/* Infrastructure Image Model */}
      <div className="model-container">
  <h2>
    <Image className="model-icon" />
    Infrastructure Image Condition Model
  </h2>
  <input
    type="file"
    ref={infrastructureImageFileRef}
    onChange={handleImageUpload}
    accept="image/*"
    multiple
    className="hidden-file-input"
  />
  <button
    onClick={() => infrastructureImageFileRef.current.click()}
    className="upload-button"
  >
    <Image className="mr-2" /> Upload Infrastructure Images
  </button>
  {infrastructureImageModel.uploadedImages.length > 0 && (
    <div className="uploaded-images">
      {infrastructureImageModel.uploadedImages.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt={`Uploaded Infrastructure ${index + 1}`}
          className="preview-image"
        />
      ))}
    </div>
  )}
  <button
    onClick={runInfrastructureImageModel}
    className="analyze-button"
    disabled={infrastructureImageModel.uploadedImages.length === 0}
  >
    Analyze Images Condition
  </button>
  {infrastructureImageModel.infraConditions && (
    <div className="model-results">
      {infrastructureImageModel.infraConditions.map((condition, index) => (
        <p key={index}>
          Infrastructure Condition {index + 1}: {condition}
        </p>
      ))}
    </div>
  )}
</div>

      {/* Lab Facilities Model */}
      <div className="model-container">
        <h2>
          <FaFlask className="model-icon" /> 
          Lab Facilities Assessment Model
        </h2>
        <FileUploadSection 
          files={labFacilitiesModel.uploadedFiles}
          fileRef={labFacilitiesFileRef}
          onUpload={(e) => handleFileUpload(setLabFacilitiesModel, e)}
          onRemove={(index) => removeFile(setLabFacilitiesModel, index)}
          title="Lab Facilities Upload"
          icon={FileText}
        />
        <button 
          onClick={runLabFacilitiesModel}
          className="analyze-button"
        >
          Analyze Lab Facilities
        </button>
        {labFacilitiesModel.results && (
          <div className="model-results">
            <p>Safety Rating: {labFacilitiesModel.results.safetyRating}</p>
            <p>Equipment Status: {labFacilitiesModel.results.equipmentStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiModelDashboard;
