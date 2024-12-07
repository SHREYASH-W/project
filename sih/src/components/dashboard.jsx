import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Image, 
  Clock, 
  Building 
} from 'lucide-react';
import { X } from 'lucide-react';  // or other relevant packages
import { FaFlask } from 'react-icons/fa';  // Flask icon from react-icons
import "./dashboard.css"
const MultiModelDashboard = () => {
  // State for each model's specific uploads and results
  const [staticDataModel, setStaticDataModel] = useState({
    uploadedFiles: [],
    results: null
  });

  const [infrastructureAgeModel, setInfrastructureAgeModel] = useState({
    uploadedFiles: [],
    predictedAge: null,
    remainingLifespan: null
  });

  const [infrastructureImageModel, setInfrastructureImageModel] = useState({
    uploadedImage: null,
    infraCondition: null
  });

  const [labFacilitiesModel, setLabFacilitiesModel] = useState({
    uploadedFiles: [],
    results: null
  });

  // Ref for file inputs
  const staticDataFileRef = useRef(null);
  const infrastructureAgeFileRef = useRef(null);
  const infrastructureImageFileRef = useRef(null);
  const labFacilitiesFileRef = useRef(null);

  // Generic file upload handler
  const handleFileUpload = (modelSetter, event) => {
    const files = Array.from(event.target.files);
    modelSetter(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }));
  };

  // Image upload handler for image-based model
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setInfrastructureImageModel(prev => ({
      ...prev,
      uploadedImage: file
    }));
  };

  // Remove file handler
  const removeFile = (modelSetter, index) => {
    modelSetter(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  // Simulate model prediction (replace with actual model calls)
  const runStaticDataModel = () => {
    setStaticDataModel(prev => ({
      ...prev,
      results: {
        complexity: 'Medium',
        recommendation: 'Further investigation needed'
      }
    }));
  };

  const runInfrastructureAgeModel = () => {
    setInfrastructureAgeModel(prev => ({
      ...prev,
      predictedAge: 25,
      remainingLifespan: 15
    }));
  };

  const runInfrastructureImageModel = () => {
    setInfrastructureImageModel(prev => ({
      ...prev,
      infraCondition: infrastructureImageModel.uploadedImage 
        ? 'Good Condition' 
        : 'No image uploaded'
    }));
  };

  const runLabFacilitiesModel = () => {
    setLabFacilitiesModel(prev => ({
      ...prev,
      results: {
        safetyRating: 'High',
        equipmentStatus: 'Well-maintained'
      }
    }));
  };

  // Render file upload section
  const FileUploadSection = ({ 
    files, 
    fileRef, 
    onUpload, 
    onRemove, 
    title, 
    icon: Icon 
  }) => (
    <div className="model-section">
      <h3>{title}</h3>
      <input 
        type="file" 
        ref={fileRef}
        onChange={onUpload} 
        className="hidden-file-input"
        multiple
      />
      <button 
        onClick={() => fileRef.current.click()}
        className="upload-button"
      >
        <Icon className="mr-2" /> Upload Documents
      </button>

      {files.length > 0 && (
        <div className="uploaded-files">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <FileText className="file-icon" />
              <span>{file.name}</span>
              <button 
                onClick={() => onRemove(index)}
                className="remove-file"
              >
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
      <h1 className="dashboard-title">
        University Infrastructure Multi-Model Analysis
      </h1>

      {/* Static Data Model */}
      <div className="model-container">
        <h2>
          <Building className="model-icon" /> 
          Static Data Infrastructure Model
        </h2>
        <FileUploadSection 
          files={staticDataModel.uploadedFiles}
          fileRef={staticDataFileRef}
          onUpload={(e) => handleFileUpload(setStaticDataModel, e)}
          onRemove={(index) => removeFile(setStaticDataModel, index)}
          title="Static Data Upload"
          icon={FileText}
        />
        <button 
          onClick={runStaticDataModel}
          className="analyze-button"
        >
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
          className="hidden-file-input"
        />
        <button 
          onClick={() => infrastructureImageFileRef.current.click()}
          className="upload-button"
        >
          <Image className="mr-2" /> Upload Infrastructure Image
        </button>
        {infrastructureImageModel.uploadedImage && (
          <div className="uploaded-image">
            <img 
              src={URL.createObjectURL(infrastructureImageModel.uploadedImage)}
              alt="Uploaded Infrastructure"
              className="preview-image"
            />
          </div>
        )}
        <button 
          onClick={runInfrastructureImageModel}
          className="analyze-button"
        >
          Analyze Image Condition
        </button>
        {infrastructureImageModel.infraCondition && (
          <div className="model-results">
            <p>Infrastructure Condition: {infrastructureImageModel.infraCondition}</p>
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
