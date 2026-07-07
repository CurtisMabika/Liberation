import { useState } from 'react';

export default function YouTubeLivePlayer() {
  const [hasError, setHasError] = useState(false);
  const channelId = 'UCi_kcAc-miEhxujzXaxk1pA';

  return (
    <div style={{ width: '100%' }}>
      {/* Bandeau supérieur aux couleurs du drapeau */}
      <div style={{
        display: 'flex',
        height: '6px',
        borderRadius: '12px 12px 0 0',
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1, backgroundColor: '#009E60' }} /> {/* Vert */}
        <div style={{ flex: 1, backgroundColor: '#FCD116' }} /> {/* Jaune */}
        <div style={{ flex: 1, backgroundColor: '#3A75C4' }} /> {/* Bleu */}
      </div>

      {/* Cadre du player avec bordure dégradée */}
      <div style={{
        padding: '4px',
        background: 'linear-gradient(135deg, #009E60 0%, #FCD116 50%, #3A75C4 100%)',
        borderRadius: '0 0 12px 12px'
      }}>
        <div style={{ 
          position: 'relative', 
          paddingBottom: '56.25%',
          height: 0, 
          overflow: 'hidden',
          borderRadius: '8px',
          backgroundColor: '#000'
        }}>
          {!hasError ? (
            <iframe
              src={`https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`}
              title="Live YouTube - Fête de la Libération"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setHasError(true)}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%'
              }}
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              gap: '12px',
              padding: '20px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '32px' }}>🇬🇦</span>
              <p style={{ margin: 0, fontWeight: 600 }}>Le live n'a pas encore commencé</p>
              <a 
                href={`https://www.youtube.com/channel/${channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  color: '#FCD116', 
                  textDecoration: 'underline',
                  fontWeight: 600
                }}
              >
                Voir la chaîne YouTube
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Label sous le player */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '10px',
        padding: '0 4px'
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#009E60',
          animation: 'pulse 2s infinite'
        }} />
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>
          Fête de la Libération — En direct
        </span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
