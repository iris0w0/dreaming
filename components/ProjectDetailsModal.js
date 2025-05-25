import React, { useState, useEffect, useRef } from 'react';

const ProjectDetailsModal = ({ project, onClose, initialPosition, backgroundColor }) => { // <-- ADD backgroundColor here
    const [isExpanded, setIsExpanded] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        if (project && initialPosition) {
            setTimeout(() => setIsExpanded(true), 50);
        } else {
            setIsExpanded(false);
        }
    }, [project, initialPosition]);

    const modalStyle = {
        position: 'fixed',
        left: initialPosition?.left || 0,
        top: initialPosition?.top || 0,
        width: initialPosition?.width || 0,
        height: initialPosition?.height || 0,
        backgroundColor: backgroundColor || 'white', // Now backgroundColor is correctly referenced
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 50,
        overflow: 'hidden',
        transition: 'left 0.3s ease-in-out, top 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out, border-radius 0.3s ease-in-out, background-color 0.3s ease-in-out',
        opacity: isExpanded ? 1 : 0,
    };

    const expandedStyle = {
        left: '50%',
        top: '50%',
        width: 'min(90vw, 600px)',
        maxHeight: '90vh',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.5rem',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
    };

    const contentStyle = {
        opacity: isExpanded ? 1 : 0,
        padding: '2rem',
        transition: 'opacity 0.3s ease-in-out 0.1s',
        overflowY: 'auto',
        flex: '1 1 auto',
        minHeight: 0,
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: 'gray',
        opacity: isExpanded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out 0.1s',
    };

    if (!project) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 flex items-center justify-center">
            <div ref={modalRef} style={{ ...modalStyle, ...(isExpanded && expandedStyle) }}>
                <div style={closeButtonStyle} onClick={onClose}>
                    &times;
                </div>
                <div style={contentStyle}>
                    <h2 className="text-3xl font-k2d-bold mb-4" style={{ color: '#000' }}>{project.name}</h2>
                    <div
  className="flex flex-nowrap gap-4 mb-4 overflow-x-auto"
  style={{
    maxWidth: '100%',
    paddingBottom: 8,
  }}
>
  {project.detailedImageSrcs && project.detailedImageSrcs.map((src, idx) => (
    <img
      key={idx}
      src={src}
      alt={`${project.name} detail ${idx + 1}`}
      className="h-40 w-auto rounded-md object-cover flex-shrink-0"
      style={{
                                height: 180,
                                width: 'auto',
                                maxWidth: 320,
                                flex: '0 0 auto',
                            }}
                        />
  ))}
</div>
                    <p className="text-gray-800">{project.detailedDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsModal;