import React, { useState } from 'react';
import { Upload, Link as LinkIcon, Video, Music, File, X, ExternalLink } from 'lucide-react';
import '../styles/ResourcesPage.css';

interface Resource {
  id: number;
  type: 'document' | 'link' | 'video' | 'audio';
  name: string;
  url?: string;
  file?: File;
  date: Date;
}

const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newResource: Resource = {
        id: Date.now(),
        type: getResourceType(file.type),
        name: file.name,
        file: file,
        date: new Date()
      };
      setResources(prev => [...prev, newResource]);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    const name = formData.get('name') as string;

    if (url && name) {
      const newResource: Resource = {
        id: Date.now(),
        type: 'link',
        name: name,
        url: url,
        date: new Date()
      };
      setResources(prev => [...prev, newResource]);
      e.currentTarget.reset();
    }
  };

  const removeResource = (id: number) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
  };

  const getResourceType = (mimeType: string): Resource['type'] => {
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType.startsWith('audio/')) return 'audio';
    return 'document';
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'document': return <File size={24} />;
      case 'link': return <LinkIcon size={24} />;
      case 'video': return <Video size={24} />;
      case 'audio': return <Music size={24} />;
    }
  };

  return (
    <div className="resources-page">
      <section className="header-section">
        <h1>Le Mie Risorse</h1>
        <p>Carica e organizza le tue fonti di studio che verranno utilizzate come base di conoscenza</p>
      </section>

      <section className="upload-section">
        <div className="upload-container">
          <div 
            className={`drop-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} />
            <h3>Trascina qui i tuoi file</h3>
            <p>oppure</p>
            <label className="file-input-label">
              Seleziona file
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.mp3,.wav,.mp4,.avi,.mov"
                className="hidden"
              />
            </label>
            <p className="supported-formats">
              Formati supportati: PDF, DOC, XLS, PPT, JPG, PNG, MP3, MP4
            </p>
          </div>
        </div>

        <div className="link-form-container">
          <h3>Aggiungi un link</h3>
          <form onSubmit={handleLinkSubmit} className="link-form">
            <input
              type="text"
              name="name"
              placeholder="Nome del link"
              required
            />
            <input
              type="url"
              name="url"
              placeholder="https://..."
              required
            />
            <button type="submit">Aggiungi link</button>
          </form>
        </div>
      </section>

      <section className="resources-list">
        <h2>Risorse caricate</h2>
        {resources.length === 0 ? (
          <div className="empty-state">
            <Upload size={48} />
            <p>Nessuna risorsa caricata. Inizia caricando i tuoi file o aggiungendo link.</p>
          </div>
        ) : (
          <div className="resources-grid">
            {resources.map(resource => (
              <div key={resource.id} className={`resource-card type-${resource.type}`}>
                <div className="resource-icon">
                  {getResourceIcon(resource.type)}
                </div>
                <div className="resource-info">
                  <h3>{resource.name}</h3>
                  <p className="resource-date">
                    {resource.date.toLocaleDateString()}
                  </p>
                </div>
                <div className="resource-actions">
                  {resource.url && (
                    <a 
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-link"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button 
                    onClick={() => removeResource(resource.id)}
                    className="delete-button"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ResourcesPage;