import React, { useState } from 'react';

interface FeaturesInputProps {
  features: string[];
  onChange: (features: string[]) => void;
}

const FeaturesInput: React.FC<FeaturesInputProps> = ({ features, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const addFeature = () => {
    if (inputValue.trim() && !features.includes(inputValue.trim())) {
      onChange([...features, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma característica e pressione Enter"
          style={{
            flex: 1,
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '6px'
          }}
        />
        <button
          type="button"
          onClick={addFeature}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Adicionar
        </button>
      </div>

      {features.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {features.map((feature, index) => (
            <span
              key={index}
              style={{
                background: '#e3f2fd',
                color: '#1976d2',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {feature}
              <button
                type="button"
                onClick={() => removeFeature(index)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  cursor: 'pointer',
                  padding: '0',
                  fontSize: '16px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturesInput;